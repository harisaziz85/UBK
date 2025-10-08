import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, ChevronDown } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CustomTimePicker from './CustomTimePicker';
import DatePickerComponent from './CustomDatePicker';
import { toast, ToastContainer } from 'react-toastify'; // New import
import 'react-toastify/dist/ReactToastify.css';

// Main Consent Form Component
const ConsentForm = () => {
  const [formType, setFormType] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [odometerValue, setOdometerValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Shared data for both forms
  const [sharedData, setSharedData] = useState({
    driverName: '',
    truckNumber: '',
    driverCertificate: '',
    towedFrom: '',
    startDate: '',
    startTime: '',
    consentPersonName: '',
    consentAddress: '',
    consentPhone: '',
    consentEmail: '',
    policeDirected: false,
    officerNameBadge: '',
    detachmentDivision: '',
    incidentNumber: '',
    consentDate: '',
    consentTime: '',
    consentMethod: '', // 'Phone', 'Email', or 'In-Person'
    informedOfRights: false,
    rateSheetShown: false,
  });

  // Tow specific data
  const [towSpecific, setTowSpecific] = useState({
    callNumber: '',
    towedTo: '',
    endDate: '',
    endTime: '',
    acknowledgementRevised: false,
    firstSignature: '',
    serviceDescription: '',
    vehicleInspection: false,
    secondSignature: '',
    towTruckPlate: '',
    towTruckVin: '',
  });

  // Storage specific data
  const [storageSpecific, setStorageSpecific] = useState({
    invoicePO: '',
    storageType: '', // 'indoor' or 'outdoor'
    storageAddressConfirmed: false,
  });

  const Baseurl = 'https://ubktowingbackend-production.up.railway.app/api';

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Authentication required. Please log in.");
          return;
        }

        const response = await fetch(`${Baseurl}/driver/vechile/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch vehicles');
        }
        const data = await response.json();
        setVehicles(data.vehicles || []);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
        toast.error('Failed to load vehicles');
      }
    };
    fetchVehicles();
  }, []);

  useEffect(() => {
    const vehicle = vehicles.find(v => v._id === selectedVehicle);
    if (vehicle && vehicle.currentMilage) {
      setOdometerValue(vehicle.currentMilage.toString());
    } else {
      setOdometerValue('');
    }
  }, [selectedVehicle, vehicles]);

  const getVehicleDetails = () => {
    return vehicles.find(v => v._id === selectedVehicle) || {};
  };

  const handleSharedInputChange = (field, value) => {
    setSharedData(prev => ({ ...prev, [field]: value }));
  };

  const handleTowSpecificInputChange = (field, value) => {
    setTowSpecific(prev => ({ ...prev, [field]: value }));
  };

  const handleStorageSpecificInputChange = (field, value) => {
    setStorageSpecific(prev => ({ ...prev, [field]: value }));
  };

  const handleSharedCheckboxChange = (field) => {
    setSharedData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleTowSpecificCheckboxChange = (field) => {
    setTowSpecific(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleStorageSpecificCheckboxChange = (field) => {
    setStorageSpecific(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleConsentMethodChange = (method) => {
    setSharedData(prev => ({ ...prev, consentMethod: method }));
  };

  const handleStorageTypeChange = (type) => {
    setStorageSpecific(prev => ({ ...prev, storageType: type }));
  };

  const handleOdometerChange = (e) => {
    setOdometerValue(e.target.value);
  };

  const validateForm = (type) => {
    if (!sharedData.driverName.trim()) {
      toast.error("Tow Driver Name is required.");
      return false;
    }
    if (!sharedData.consentPersonName.trim()) {
      toast.error("Consent Person Name is required.");
      return false;
    }
    if (!sharedData.towedFrom.trim()) {
      toast.error("Towed From location is required.");
      return false;
    }
    if (!sharedData.startDate || !sharedData.startTime) {
      toast.error("Start Date and Time are required.");
      return false;
    }
    if (!sharedData.consentDate || !sharedData.consentTime) {
      toast.error("Consent Date and Time are required.");
      return false;
    }
    if (!sharedData.consentMethod) {
      toast.error("Consent Method is required.");
      return false;
    }
    if (!sharedData.informedOfRights || !sharedData.rateSheetShown) {
      toast.error("You must confirm informed of rights and rate sheet shown.");
      return false;
    }
    if (type === 'tow' && !towSpecific.towedTo.trim()) {
      toast.error("Towed To location is required for Tow form.");
      return false;
    }
    if (type === 'storage' && !storageSpecific.storageType) {
      toast.error("You must select Indoor or Outdoor storage.");
      return false;
    }
    if (sharedData.policeDirected && !sharedData.officerNameBadge.trim()) {
      toast.error("Officer Name & Badge is required when directed by police.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (type) => {
    if (!validateForm(type)) {
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Authentication token not found. Please log in.");
        return;
      }

      const isTow = type === 'tow';

      const vehicle = getVehicleDetails();
      const currentMileage = parseInt(odometerValue) || 0;

      const consentDateTime = new Date(`${sharedData.consentDate}T${sharedData.consentTime}:00`).toISOString();
      const startDateTime = new Date(`${sharedData.startDate}T${sharedData.startTime}:00`).toISOString();

      const officerName = sharedData.officerNameBadge.split(' & ')[0] || sharedData.officerNameBadge;
      const badgeNumber = sharedData.officerNameBadge.split(' & ')[1] || '';

      const payload = {
        type: isTow ? "Consent to Tow" : "Consent to Storage",
        towOperator: {
          legalName: "1878272 Ontario Inc O/A UBK Towing",
          address: "3D–35 King St. Toronto, Ontario M9N 3R8",
          email: "ubktowing@gmail.com",
          phone: "(647) 716-3362",
          operatorCertificate: "TO-189-380-467",
          storageCertificate: "VS-189-380-467"
        },
        towDriver: {
          name: sharedData.driverName,
          truckNumber: sharedData.truckNumber,
          driverCertificate: sharedData.driverCertificate,
          invoiceOrPO: isTow ? towSpecific.callNumber : storageSpecific.invoicePO
        },
        vehicle: selectedVehicle ? {
          vehicleId: selectedVehicle,
          make: vehicle.make || '',
          model: vehicle.model || '',
          year: vehicle.year || '',
          color: vehicle.color || '',
          plate: vehicle.licensePlate || '',
          vin: vehicle.vin || '',
          currentMileage
        } : {
          make: '',
          model: '',
          year: '',
          color: '',
          plate: '',
          vin: '',
          currentMileage
        },
        consentBy: {
          name: sharedData.consentPersonName,
          address: sharedData.consentAddress,
          phone: sharedData.consentPhone,
          email: sharedData.consentEmail
        },
        policeDirected: {
          isDirected: sharedData.policeDirected,
          officerName: officerName,
          badgeNumber: badgeNumber,
          detachmentDivision: sharedData.detachmentDivision,
          incidentNumber: sharedData.incidentNumber
        },
        consentDateTime,
        consentMethod: sharedData.consentMethod,
        informedOfRights: sharedData.informedOfRights,
        rateSheetShown: sharedData.rateSheetShown,
      };

      if (isTow) {
        payload.towDetails = {
          fromLocation: sharedData.towedFrom,
          toLocation: towSpecific.towedTo,
          towDateTime: startDateTime,
          acknowledgementRevisedDestination: towSpecific.acknowledgementRevised,
          digitalSignature: towSpecific.secondSignature,
          descriptionOfServices: towSpecific.serviceDescription
        };
      } else {
        const storageType = storageSpecific.storageType.toUpperCase();
        const storageLocation = `7 Belvia Road Etobicoke Ontario M8W9R2${storageSpecific.storageAddressConfirmed ? ` - ${storageType}` : ''}`;
        payload.storageDetails = {
          pickupLocation: sharedData.towedFrom,
          startDateTime,
          storageLocation
        };
      }

      console.log('Submitting payload:', payload); // For debugging

      const response = await fetch(`${Baseurl}/driver/consentForm/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast.success(`${type} form submitted successfully!`);
      
      // Reset form
      setSharedData({
        driverName: '',
        truckNumber: '',
        driverCertificate: '',
        towedFrom: '',
        startDate: '',
        startTime: '',
        consentPersonName: '',
        consentAddress: '',
        consentPhone: '',
        consentEmail: '',
        policeDirected: false,
        officerNameBadge: '',
        detachmentDivision: '',
        incidentNumber: '',
        consentDate: '',
        consentTime: '',
        consentMethod: '',
        informedOfRights: false,
        rateSheetShown: false,
      });
      setTowSpecific({
        callNumber: '',
        towedTo: '',
        endDate: '',
        endTime: '',
        acknowledgementRevised: false,
        firstSignature: '',
        serviceDescription: '',
        vehicleInspection: false,
        secondSignature: '',
        towTruckPlate: '',
        towTruckVin: '',
      });
      setStorageSpecific({
        invoicePO: '',
        storageType: '',
        storageAddressConfirmed: false,
      });
      setSelectedVehicle('');
      setOdometerValue('');
      setFormType('');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(`Error submitting form: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-0 md:p-0">
      <ToastContainer/>
      <h1 className="text-2xl md:text-3xl roboto-semi-bold text-[#333333] mb-6 p-4 sm:p-6">New Consent Form</h1>
      <div className="max-w-full p-1 sm:p-6 md:p-8">
        <div className="mb-8">
          <label className="block text-sm roboto-medium text-[#333333E5]/90 mb-2">Form Type <span className="text-red-500">*</span></label>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="cursor-pointer w-full px-4 py-3 text-left border border-gray-300 rounded-lg hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#043677] flex items-center justify-between"
            >
              <span className={formType ? 'text-gray-900' : 'text-blue-600'}>
                {formType === 'storage' ? 'Consent to Storage' : formType === 'tow' ? 'Consent to Tow' : 'Select form type'}
              </span>
              <ChevronDown size={20} className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button 
                  onClick={() => { setFormType('storage'); setShowDropdown(false); }} 
                  className="w-full px-4 py-3 roboto-medium text-left text-[#000000B2] hover:bg-gray-50 rounded-t-lg"
                >
                  Consent to Storage
                </button>
                <button 
                  onClick={() => { setFormType('tow'); setShowDropdown(false); }} 
                  className="w-full px-4 py-3 roboto-medium text-left text-[#000000B2] hover:bg-gray-50 rounded-b-lg"
                >
                  Consent to Tow
                </button>
              </div>
            )}
          </div>
        </div>

        {formType && (
          <div className="space-y-8">
            <div>
              <h2 className={`text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-2`}>
                {formType === 'tow' ? 'Consent to Tow' : 'Consent to Storage'}
              </h2>
              <p className="text-[#333333CC] roboto-medium mb-6">
                Fill the form to submit a {formType === 'tow' ? 'consent to tow' : 'consent to storage'}.
              </p>

              {/* Tow Operator Information - Common */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Operator Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-16 mb-6">
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Legal Name: </span>
                    1878272 Ontario Inc O/A UBK Towing
                  </p>
                </div>
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Address: </span>
                    3D–35 King St. Toronto, Ontario M9N 3R8
                  </p>
                </div>
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Phone: </span>
                    (647) 716-3362
                  </p>
                </div>
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Email: </span>
                    ubktowing@gmail.com
                  </p>
                </div>
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Tow Operator Certificate: </span>
                    TO-189-380-467
                  </p>
                </div>
                <div>
                  <p className="text-[14px] roboto-regular text-[#333333E5]">
                    <span className="font-semibold mr-2">Vehicle Storage Certificate: </span>
                    VS-189-380-467
                  </p>
                </div>
              </div>

              {/* Tow Driver Information - Common */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Driver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
                    Tow Driver Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={sharedData.driverName} 
                    onChange={(e) => handleSharedInputChange('driverName', e.target.value)} 
                    placeholder="e.g., ALI ABBASI" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Truck Number</label>
                  <input 
                    type="text" 
                    value={sharedData.truckNumber} 
                    onChange={(e) => handleSharedInputChange('truckNumber', e.target.value)} 
                    placeholder="e.g., BEO 4652" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Tow Driver Certificate #</label>
                  <input 
                    type="text" 
                    value={sharedData.driverCertificate} 
                    onChange={(e) => handleSharedInputChange('driverCertificate', e.target.value)} 
                    placeholder="e.g., Certificate Number" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                  />
                </div>
                {formType === 'tow' ? (
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Call #</label>
                    <input 
                      type="text" 
                      value={towSpecific.callNumber} 
                      onChange={(e) => handleTowSpecificInputChange('callNumber', e.target.value)} 
                      placeholder="e.g., Call Number" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Invoice/PO #</label>
                    <input 
                      type="text" 
                      value={storageSpecific.invoicePO} 
                      onChange={(e) => handleStorageSpecificInputChange('invoicePO', e.target.value)} 
                      placeholder="e.g., Invoice/PO Number" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                    />
                  </div>
                )}
                {formType === 'tow' && (
                  <>
                    <div>
                      <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Plate</label>
                      <input 
                        type="text" 
                        value={towSpecific.towTruckPlate} 
                        onChange={(e) => handleTowSpecificInputChange('towTruckPlate', e.target.value)} 
                        placeholder="e.g., Plate Number" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm roboto-medium text-[#333333E5] mb-2">VIN#</label>
                      <input 
                        type="text" 
                        value={towSpecific.towTruckVin} 
                        onChange={(e) => handleTowSpecificInputChange('towTruckVin', e.target.value)} 
                        placeholder="e.g., VIN Number" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Vehicle Selection */}
              <div className="mb-6">
                <label className="block text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-2">Vehicle</label>
                <div className="relative">
                  <select 
                    value={selectedVehicle} 
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677] appearance-none"
                  >
                    <option value="">Select Vehicle (Optional)</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.name} - {vehicle.licensePlate}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div> 

              {/* Vehicle Details */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Vehicle Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Year</label>
                  <input 
                    type="text" 
                    value={getVehicleDetails().year || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Make</label>
                  <input 
                    type="text" 
                    value={getVehicleDetails().make || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Model</label>
                  <input 
                    type="text" 
                    value={getVehicleDetails().model || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Color</label>
                  <input 
                    type="text" 
                    value={getVehicleDetails().color || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Plate</label>
                  <input 
                    type="text" 
                    value={getVehicleDetails().licensePlate || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">VIN#</label>
                  <input 
                    type="text" 
                    value={getVehicleDetails().vin || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Odometer</label>
                  <input 
                    type="number" 
                    value={odometerValue} 
                    onChange={handleOdometerChange} 
                    placeholder="Enter current mileage" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                  />
                </div>
              </div>

              {/* Tow Location Information */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Tow Location Information</h3>
             <div className="space-y-4 mb-6">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
      Towed From <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      value={sharedData.towedFrom}
      onChange={(e) => handleSharedInputChange('towedFrom', e.target.value)}
      placeholder="Enter location"
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
      required
    />
  </div>

  <div>
    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
      Start Date <span className="text-red-500">*</span>
    </label>
    <DatePickerComponent
      value={sharedData.startDate}
      onChange={(value) => handleSharedInputChange('startDate', value)}
    />
  </div>

  <div>
    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
      Start Time <span className="text-red-500">*</span>
    </label>
    <CustomTimePicker
      value={sharedData.startTime}
      onChange={(value) => handleSharedInputChange('startTime', value)}
    />
  </div>
</div>


{formType === 'tow' && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div>
      <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
        Towed To <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={towSpecific.towedTo}
        onChange={(e) => handleTowSpecificInputChange('towedTo', e.target.value)}
        placeholder="Enter location"
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
        required
      />
    </div>

    <div>
      <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
        End Date <span className="text-red-500">*</span>
      </label>
      <DatePickerComponent
        value={towSpecific.endDate}
        onChange={(value) => handleTowSpecificInputChange('endDate', value)}
      />
    </div>

    <div>
      <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
        End Time <span className="text-red-500">*</span>
      </label>
      <CustomTimePicker
        value={towSpecific.endTime}
        onChange={(value) => handleTowSpecificInputChange('endTime', value)}
      />
    </div>
  </div>
)}

</div>


              {formType === 'tow' && (
                <div className="mb-4">
                  <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                    <input
                      type="checkbox"
                      checked={towSpecific.acknowledgementRevised}
                      onChange={() => handleTowSpecificCheckboxChange('acknowledgementRevised')}
                      className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                    />
                    <span>Acknowledgement of client's revised destination address</span>
                  </label>
                </div>
              )}

              {formType === 'tow' && (
                <>
                  <h3 className="text-lg roboto-semi-bold text-[#333333] mb-4">Signature (Pre-Tow)</h3>
                  <div className="mb-6">
                    <input
                      type="text"
                      value={towSpecific.firstSignature}
                      onChange={(e) => handleTowSpecificInputChange('firstSignature', e.target.value)}
                      placeholder="Add a digital signature"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
                    />
                  </div>

                  <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Description of Services</h3>
                  <div className="mb-6">
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Service Description</label>
                    <input
                      type="text"
                      value={towSpecific.serviceDescription}
                      onChange={(e) => handleTowSpecificInputChange('serviceDescription', e.target.value)}
                      placeholder="Enter service description"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
                    />
                  </div>
                </>
              )}

              {/* Storage Locations - Storage Only */}
              {formType === 'storage' && (
                <>
                  <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Storage Locations</h3>
                  <div className="mb-6 space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={storageSpecific.storageAddressConfirmed} 
                        onChange={() => handleStorageSpecificCheckboxChange('storageAddressConfirmed')} 
                        className="rounded w-4 h-4 border-gray-300" 
                      />
                      <span className="text-[14px] text-[#333333CC] roboto-regular">Storage address confirmed at 7 Belvia Road Etobicoke Ontario M8W9R2</span>
                    </label>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                        <input
                          type="radio"
                          name="storageType"
                          value="indoor"
                          checked={storageSpecific.storageType === 'indoor'}
                          onChange={(e) => handleStorageTypeChange(e.target.value)}
                          className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                        />
                        <span>Indoor <span className="text-red-500">*</span></span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                        <input
                          type="radio"
                          name="storageType"
                          value="outdoor"
                          checked={storageSpecific.storageType === 'outdoor'}
                          onChange={(e) => handleStorageTypeChange(e.target.value)}
                          className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                        />
                        <span>Outdoor <span className="text-red-500">*</span></span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              {/* Person Giving Consent Information - Common */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Person Giving Consent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    value={sharedData.consentPersonName} 
                    onChange={(e) => handleSharedInputChange('consentPersonName', e.target.value)} 
                    placeholder="e.g., John Doe" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Address</label>
                  <input 
                    type="text" 
                    value={sharedData.consentAddress} 
                    onChange={(e) => handleSharedInputChange('consentAddress', e.target.value)} 
                    placeholder="e.g., 123 Main St" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Phone no.</label>
                  <input 
                    type="tel" 
                    value={sharedData.consentPhone} 
                    onChange={(e) => handleSharedInputChange('consentPhone', e.target.value)} 
                    placeholder="e.g., +1 647 716 3362" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                  />
                </div>
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Email</label>
                  <input 
                    type="email" 
                    value={sharedData.consentEmail} 
                    onChange={(e) => handleSharedInputChange('consentEmail', e.target.value)} 
                    placeholder="e.g., name@example.com" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                  />
                </div>
              </div>

              {/* Police Directed */}
              <div className="mb-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={sharedData.policeDirected} 
                    onChange={() => handleSharedCheckboxChange('policeDirected')} 
                    className="mt-1 rounded border-gray-300 w-4 h-4" 
                  />
                  <span className="text-sm text-gray-700">Providing Services at the direction of Police Officer</span>
                </label>
              </div>
              {sharedData.policeDirected && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
                      Officer Name & Badge # <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      value={sharedData.officerNameBadge} 
                      onChange={(e) => handleSharedInputChange('officerNameBadge', e.target.value)} 
                      placeholder="e.g., Officer Name & Badge Number" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Detachment / Division</label>
                    <input 
                      type="text" 
                      value={sharedData.detachmentDivision} 
                      onChange={(e) => handleSharedInputChange('detachmentDivision', e.target.value)} 
                      placeholder="e.g., Toronto Division" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                    />
                  </div>
                </div>
              )}
              <div className="mb-6">
                <label className="block text-sm roboto-medium text-[#333333E5] mb-2">Call / Occurrence / Incident #</label>
                <input 
                  type="text" 
                  value={sharedData.incidentNumber} 
                  onChange={(e) => handleSharedInputChange('incidentNumber', e.target.value)} 
                  placeholder="e.g., 643874" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]" 
                />
              </div>

              {/* Date and Time */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Date and Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
                    Consent Date <span className="text-red-500">*</span>
                  </label>
                  <DatePickerComponent
                    value={sharedData.consentDate}
                    onChange={(value) => handleSharedInputChange('consentDate', value)}
                  />
                </div>

                <div>
                  <label className="block text-sm roboto-medium text-[#333333E5] mb-2">
                    Consent Time <span className="text-red-500">*</span>
                  </label>
                  <CustomTimePicker
                    value={sharedData.consentTime}
                    onChange={(value) => handleSharedInputChange('consentTime', value)}
                  />
                </div>
              </div>


              {/* Consent Given - Radio Buttons */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Consent Given</h3>
              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                  <input
                    type="radio"
                    name="consentMethod"
                    value="Phone"
                    checked={sharedData.consentMethod === 'Phone'}
                    onChange={(e) => handleConsentMethodChange(e.target.value)}
                    className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                  />
                  <span>Over the Phone <span className="text-red-500">*</span></span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm roboto-medium text-[#333333E5]">
                  <input
                    type="radio"
                    name="consentMethod"
                    value="Email"
                    checked={sharedData.consentMethod === 'Email'}
                    onChange={(e) => handleConsentMethodChange(e.target.value)}
                    className="rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                  />
                  <span>Over the Email <span className="text-red-500">*</span></span>
                </label>
              </div>


              {formType === 'storage' && (
  <div className="max-w-full mt-8 mb-6">
    <h2 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">
      Storage Rate Schedule
    </h2>
    <p className="text-[14px] text-[#333333CC] roboto-medium text-justify mb-5 leading-relaxed">
      The Maximum Rate Schedule separates charges for indoor storage and outdoor storage, based upon the length of the stored vehicle. It also provides for charging for after-hours access to a vehicle. Vehicle storage rates are based on a daily rate. Charges for the first day of storage are operated on an hourly basis and each subsequent day of storage is charged the full daily rate.
    </p>
    <table className="w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-[#CCCCCC1A]">
          <th className="p-3 text-left text-[#333333E5] roboto-medium text-[14px] border-b border-gray-300">Vehicle Storage</th>
          <th className="p-3 text-left text-[#333333E5] roboto-medium text-[14px] border-b border-gray-300">$</th>
          <th className="p-3 text-left text-[#333333E5] roboto-medium text-[14px] border-b border-gray-300">Rate Structure</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-gray-300">
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">Outdoor storage, vehicle length &le;6.5m</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">85.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">Outdoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">170.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">Outdoor storage, vehicle length &gt;12.5m</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">215.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">Indoor storage, vehicle length &le;6.5m</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">170.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">Indoor storage, vehicle length &gt;6.5m and &le;12.5m</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">310.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
        </tr>
        <tr className="border-b border-gray-300">
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">Indoor storage, vehicle length &gt;12.5m</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">430.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Day</td>
        </tr>
        <tr>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">After-hours access</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">85.00</td>
          <td className="p-3 text-[14px] text-[#333333CC] roboto-medium">/Event</td>
        </tr>
      </tbody>
    </table>
  </div>
)}

              {/* Disclosure Statement - Common */}
              <div className="mt-8 rounded-lg mb-6  p-0 sm:p-4 bg-gray-50">
                <h3 className=" text-[18px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Disclosure Statement / Pursuant to Ontario Regulation 167/23 - Schedule 2</h3>
                <div className="space-y-4 roboto-medium text-[14px] text-[#333333CC]">
                  <p className="font-semibold">
                    1. Tow operators and tow truck drivers must follow the requirements of the Towing and Storage Safety and Enforcement Act, 2021. The Act sets out responsibilities for the operation of a tow truck, conduct toward the public and at the scene of an accident, and the rates that can be charged for towing and vehicle storage services. The Act also sets out rights you have when requesting or receiving towing services.
                  </p>
                  <div>
                    <p className="font-semibold mb-1">2. You have the right to,</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Decide who can tow your vehicle and where your vehicle will be towed to;</li>
                      <li>view and review the consent to Tow form and Maximum Rate Schedule before towing begins; do not sign a blank form;</li>
                      <li>Receive an unaltered copy of the signed Consent to Tow form;</li>
                      <li>choose an alternate referral; or</li>
                      <li>contact the Ministry of Transportation if you have any concerns about the towing services you receive or the conduct of the tow truck driver or tow operator.</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">3. Tow truck drivers and tow operators must,</p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>notify you if your vehicle is taken to a location that is different from the location you identified;</li>
                      <li>not charge higher than the maximum rates published on the Government of Ontario&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021;</li>
                      <li>accept multiple forms of payment;</li>
                      <li>not advertise or consent to other services, including vehicle storage services;</li>
                      <li>not refer you to any medical or legal services and can only refer to other towing, vehicle storage or vehicle repair business if you request it;</li>
                      <li>disclose any interest they have or benefit they may receive from the referral at the time of making the referral.</li>
                    </ul>
                  </div>
                  <p>4. Tow truck drivers and tow operators are identified by name and certificate number on the Consent to Tow form and on the tow truck. Make sure the tow operator&apos;s name and certificate number on the tow truck matches the documentation.</p>
                  <p>5. Tow truck drivers and tow operators are subject to a Code of Conduct. See the Government of Ontario&apos;s website on the Towing and Storage Safety and Enforcement Act, 2021.</p>
                </div>
              </div>

              {/* Disclosure of Interest - Common */}
              <div className="mb-6">
                <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Disclosure of Interest</h3>
                <div className="space-y-2 roboto-medium text-[14px] text-[#333333CC] mb-4">
                  <p>1. UBK Towing Service Ltd. operates vehicle storage facilities{formType === 'storage' ? ' listed above.' : '.'}.</p>
                  <p>2. UBK Towing Service Ltd. DOES NOT have any interest in any other locations to which the motor vehicle may be towed for repair, storage, appraisal or other similar purpose.</p>
                  <p>3. UBK Towing Service Ltd. DOES NOT have any interest in any person or entity to whom the driver or operator refers to you.</p>
                </div>
                {formType === 'tow' && (
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={towSpecific.vehicleInspection} 
                      onChange={() => handleTowSpecificCheckboxChange('vehicleInspection')} 
                      className="mt-1 w-4 h-4 rounded border-gray-300" 
                    />
                    <span className="text-sm text-gray-700">I declare that the vehicle listed has been inspected in accordance with Ontario Schedule 1 Daily inspections of trucks, tractors, and trailers (Reg. 199/07)</span>
                  </label>
                )}
              </div>

              {/* Consent Statement - Common */}
              <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Consent Statement</h3>
              <p className="roboto-medium text-[14px] text-[#333333CC] mb-4">
                You hereby consent to the terms and conditions outlined in this document and authorize UBK
                Towing Service Ltd. to provide towing, recovery, labour and roadside services as requested
                to the above-mentioned vehicle. Towed vehicles will be held until full payment is received
                pursuant to the Repair and Storage Liens Act.
              </p>
              <div className="space-y-3 mb-6">
                <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={sharedData.informedOfRights}
                    onChange={() => handleSharedCheckboxChange('informedOfRights')}
                    className="mt-1 rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                    required
                  />
                  <span className="roboto-medium text-[14px] text-[#333333CC]">
                    I confirm that I have been informed of my rights before signing this Consent form. <span className="text-red-500">*</span>
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={sharedData.rateSheetShown}
                    onChange={() => handleSharedCheckboxChange('rateSheetShown')}
                    className="mt-1 rounded border-gray-300 w-4 h-4 text-[#043677] focus:ring-[#043677]"
                    required
                  />
                  <span className="roboto-medium text-[14px] text-[#333333CC]">
                    Rate sheet shown to the client <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>

              {/* Final Signature - Tow Only */}
              {formType === 'tow' && (
                <>
                  <h3 className="text-[25px] sm:text-[28px] roboto-bold text-[#333333] mb-4">Signature</h3>
                  <div className="mb-6">
                    <input
                      type="text"
                      value={towSpecific.secondSignature}
                      onChange={(e) => handleTowSpecificInputChange('secondSignature', e.target.value)}
                      placeholder="Add a digital signature"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#043677]"
                    />
                  </div>
                </>
              )}

              {/* Rate Schedule - Storage Only */}



              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6">
                <button 
                  type="button"
                  onClick={() => {
                    // Reset form
                    setFormType('');
                    // ... reset other states
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  disabled={isLoading}
                  onClick={() => handleSubmit(formType)}
                  className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
};

export default ConsentForm;