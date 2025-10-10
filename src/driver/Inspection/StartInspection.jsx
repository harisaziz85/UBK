// src/components/VehicleInspectionSystem.jsx
import React, { useEffect, useState, useRef } from 'react';
import { X, Camera, ChevronDown } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import inspectionCategories from './InspectionPopupData';
import InspectionModal from './InspectionModal';
import CameraModal from './CameraModel';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import SignatureCanvas from 'react-signature-canvas';


const VehicleInspectionSystem = () => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoContext, setPhotoContext] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInspectionItem, setSelectedInspectionItem] = useState(null);
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();
  const driverSignatureRef = useRef();


  const Baseurl = 'https://ubktowingbackend-production.up.railway.app/api';

  const [inspectionData, setInspectionData] = useState({
    date: '',
    currentMileage: '',
    inspectedBy: 'Ali Janna'
  });

  const [inspections, setInspections] = useState(
    inspectionCategories.map(cat => ({
      ...cat,
      minorChecked: new Set(),
      majorChecked: new Set(),
      otherChecked: new Set(),
    }))
  );

  const [vehicleImages, setVehicleImages] = useState({
    front: null,
    driverSide: null,
    rear: null,
    passengerSide: null
  });

  const [checklistImages, setChecklistImages] = useState({});

  const [remarks, setRemarks] = useState('');

  const [declarationConfirmed, setDeclarationConfirmed] = useState(false);

  const [declarationSignature, setDeclarationSignature] = useState('');

  const [loading, setLoading] = useState(false);

  const mapKebabToCamel = {
    'air-brake': 'airBrakeSystem',
    'cab': 'cab',
    'cargo-securement': 'cargoSecurement',
    'coupling-devices': 'couplingDevices',
    'dangerous-goods': 'dangerousGoods',
    'driver-controls': 'driverControls',
    'driver-seat': 'driverSeat',
    'electric-brake': 'electricBrakeSystem',
    'emergency-equipment': 'emergencyEquipment',
    'exhaust-system': 'exhaustSystem',
    'frame-cargo-body': 'frameCargoBody',
    'fuel-system': 'fuelSystem',
    'general': 'general',
    'glass-mirrors': 'glassMirrors',
    'heater-defroster': 'heaterDefroster',
    'horn': 'horn',
    'hydraulic-brake': 'hydraulicBrakeSystem',
    'lamps-reflectors': 'lampsReflectors',
    'steering': 'steering',
    'suspension': 'suspensionSystem',
    'tires': 'tires',
    'wheels-hubs': 'wheelsHubsFasteners',
    'windshield-wiper': 'windshieldWipers',
  };



useEffect(() => {
  const fetchVehicles = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.get(`${Baseurl}/driver/vechile/my`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (res.data.vehicles) {
        setVehicleList(res.data.vehicles); // ✅ match your API response
        console.log("Vehicles fetched:", res.data.vehicles);
      }
    } catch (err) {
      console.error("Error fetching vehicles", err);
    }
  };

  fetchVehicles();
}, []);


const handleSelectVehicle = (e) => {
  const vehicleId = e.target.value;
  setSelectedVehicleId(vehicleId);

  const vehicle = vehicleList.find((v) => v._id === vehicleId);

  if (vehicle) {
    setSelectedVehicle(vehicle);
    setInspectionData({
      ...inspectionData,
      inspectedBy: "Ali ", // adjust if backend sends assigned driver
    });
  }
};





  const formatDate = (isoDate) => {
    if (!isoDate) return "N/A";
    return new Date(isoDate).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handlePhotoSave = (dataUrl, context) => {
    if (context.endsWith(' Defect')) {
      const title = context.slice(0, -7);
      const item = inspections.find(i => i.title === title);
      if (item) {
        setChecklistImages(prev => ({ ...prev, [item.id]: dataUrl }));
      }
    } else {
      let side = context;
      if (context === 'driver') side = 'driverSide';
      else if (context === 'passenger') side = 'passengerSide';
      setVehicleImages(prev => ({ ...prev, [side]: dataUrl }));
    }
  };

  const openPhotoModal = (context) => {
    setPhotoContext(context);
    setShowPhotoModal(true);
  };

  // helper to convert base64 → Blob
  const dataURLtoBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // helper to log FormData contents
  const printFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  };


  const handleSaveInspection = async () => {
    if (!selectedVehicleId) {
      toast.error("Please select a vehicle");
      return;
    }

    if (!inspectionData.date) {
      toast.error("Please select the date");
      return;
    }

    if (!inspectionData.currentMileage.trim()) {
      toast.error("Please enter current mileage");
      return;
    }

    if (!remarks.trim()) {
      toast.error("Please enter inspection remarks");
      return;
    }

    if (!declarationConfirmed) {
      toast.error("Please confirm the declaration");
      return;
    }

    if (!declarationSignature) {
      toast.error("Please provide driver's signature");
      return;
    }

    if (!vehicleImages.front || !vehicleImages.driverSide || !vehicleImages.rear || !vehicleImages.passengerSide) {
      toast.error("Please take all vehicle photos");
      return;
    }

    const hasAnyFail = inspections.some(item => getStatus(item)?.toLowerCase() === "fail");
    const incompleteActiveItems = inspections.filter(item => {
      const status = getStatus(item);
      const isDisabled = hasAnyFail && !status;
      return !isDisabled && !status;
    });
    if (incompleteActiveItems.length > 0) {
      toast.error("Please complete all active inspection items");
      return;
    }

    // check fail items must have photo
    const fails = inspections.filter(
      (item) => getStatus(item)?.toLowerCase() === "fail"
    );
    for (const failItem of fails) {
      if (!checklistImages[failItem.id]) {
        toast.error(`Please take photo for ${failItem.title}`);
        return;
      }
    }

    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to continue");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    // ✅ Vehicle + required fields
    formData.append("vehicleId", selectedVehicleId);

   const hasFail = inspections.some(
    (item) => getStatus(item)?.toLowerCase() === "fail"
  );
  const overallStatus = hasFail ? "failed" : "passed";
  formData.append("inspectionStatus", overallStatus);


    // required text fields
    formData.append("remarks", remarks);
    formData.append("declarationConfirmed", declarationConfirmed);
    if (declarationSignature) {
      const blob = dataURLtoBlob(declarationSignature);
      formData.append("declarationSignature", blob, "declarationSignature.png");
    }
    formData.append("currentMilage", Number(inspectionData.currentMileage) || 0);
    formData.append("inspectedOn", inspectionData.date); // backend wants inspectedOn

    // ✅ Vehicle images
    Object.entries(vehicleImages).forEach(([key, dataUrl]) => {
      if (dataUrl) {
        const blob = dataURLtoBlob(dataUrl);
        formData.append(key, blob, `${key}.png`);
      }
    });

    // ✅ Checklist object
    const checklistObj = {};
    inspections.forEach((item) => {
      const camelKey = mapKebabToCamel[item.id] || item.id;
      const status = getStatus(item);
      const value = status === "Pass";

      checklistObj[camelKey] = { value };
    });

    // ✅ Checklist images
    inspections.forEach((item) => {
      const status = getStatus(item);
      if (status === "Fail" && checklistImages[item.id]) {
        const camelKey = mapKebabToCamel[item.id] || item.id;
        const blob = dataURLtoBlob(checklistImages[item.id]);
        formData.append(`${camelKey}Image`, blob, `${camelKey}.png`);
      }
    });

    formData.append("checklist", JSON.stringify(checklistObj));

    // ✅ Debug log
    printFormData(formData);

    // ✅ API call
    try {
      const res = await axios.post(`${Baseurl}/common/inspection/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.inspection) {
        toast.success("Inspection saved successfully!");

          setTimeout(() => {
    navigate("/tripinspection");
  }, 3000);
        // Reset form
        setSelectedVehicleId("");
        setSelectedVehicle(null);
        setInspectionData({
          date: '',
          currentMileage: '',
          inspectedBy: ''
        });
        setInspections(
          inspectionCategories.map(cat => ({
            ...cat,
            minorChecked: new Set(),
            majorChecked: new Set(),
            otherChecked: new Set(),
          }))
        );
        setVehicleImages({
          front: null,
          driverSide: null,
          rear: null,
          passengerSide: null
        });
        setChecklistImages({});
        setRemarks('');
        setDeclarationConfirmed(false);
        setDeclarationSignature('');
      } else {
        toast.error(res.data.message || "Failed to save inspection");
      }
    } catch (err) {
      console.error("Error saving inspection", err);
      toast.error("Something went wrong while saving");
    } finally {
      setLoading(false);
    }
  };



  const instructionCards = [
    { id: 'air-brake', title: 'Air Brake system', color: 'bg-blue-500' },
    { id: 'cab', title: 'Cab', color: 'bg-gray-700' },
    { id: 'cargo-securement', title: 'Cargo Securement', color: 'bg-gray-700' },
    { id: 'coupling-devices', title: 'Coupling Devices', color: 'bg-gray-700' },
    { id: 'dangerous-goods', title: 'Dangerous Goods', color: 'bg-gray-700' },
    { id: 'driver-controls', title: 'Driver Controls', color: 'bg-gray-700' },
    { id: 'electric-brake', title: 'Electric Brake System', color: 'bg-gray-700' }
  ];

  const openInspectionModal = (item) => {
    const inspection = inspections.find(i => i.id === item.id);
    setSelectedInspectionItem(inspection);
    setIsModalOpen(true);
  };

  const closeInspectionModal = () => {
    setSelectedInspectionItem(null);
    setIsModalOpen(false);
  };

  const handleSave = (updatedItem) => {
    setInspections(prev => 
      prev.map(i => 
        i.id === updatedItem.id 
          ? { ...updatedItem } 
          : i
      )
    );
    closeInspectionModal();
  };

  const getStatus = (item) => {
    if (item.majorChecked.size > 0) return 'Fail';
    if (item.minorChecked.size > 0 || item.otherChecked.has('No Defects')) return 'Pass';
    if (item.otherChecked.size > 0) return 'N/A';
    return null;
  };

  const getStatusColor = (status) => {
    if (status === 'Pass') return 'text-green-600';
    if (status === 'Fail') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white  sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Pre-Trip Safety Checklist</h1>
          <p className="text-gray-600 text-sm mt-1">Complete all inspection items before operating the vehicle.</p>
        </div>
      </div>

      {/* Instructions Section */}
      {activeTab === 'instructions' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {instructionCards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${card.color} h-32 flex items-center justify-center`}>
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">i</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">Major Defects</p>
                  <ul className="text-xs text-gray-700 space-y-1 mb-4">
                    {inspectionCategories.find(cat => cat.id === card.id)?.instructions?.slice(0, 2).map((inst, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">□</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700">
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

              {/* Main Content */}
              {activeTab === 'checklist' && (
                <div className="max-w-7xl mx-auto px-0 sm:px-4 py-6">

                          {/* Vehicle Dropdown */}
                  <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Vehicle for Inspection
                    </label>
                    <div className="relative">
                      <select
                        value={selectedVehicleId}
                        onChange={handleSelectVehicle}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Vehicle</option>
                        {vehicleList.map((vehicle) => (
                          <option key={vehicle._id} value={vehicle._id}>
                            {vehicle.name} ({vehicle.licensePlate})
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
                    </div>
                  </div>



          {/* Vehicle Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                  {selectedVehicle?.name}
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Plate</label>
                <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                  {selectedVehicle?.licensePlate}
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Province</label>
              <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                {selectedVehicle?.registrationState || "N/A"}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={inspectionData.date}
                  onChange={(e) => setInspectionData({...inspectionData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   min={new Date().toISOString().split("T")[0]} 
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Current Mileage</label>
                <input
                  type="text"
                  placeholder="Enter current mileage"
                  value={inspectionData.currentMileage}
                  onChange={(e) => setInspectionData({...inspectionData, currentMileage: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

            </div>
          </div>

          {/* Photo Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer group" 
                onClick={() => openPhotoModal('front')}
              >
                {vehicleImages.front ? (
                  <>
                    <img src={vehicleImages.front} alt="Front of the Truck" className="w-full h-32 object-cover rounded" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVehicleImages(prev => ({ ...prev, front: null }));
                      }} 
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm font-medium text-gray-700">Front of the Truck</p>
                    <p className="text-xs text-gray-500 mt-1">Take Photo of the Front of the Truck</p>
                  </>
                )}
              </div>
              <div 
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer group" 
                onClick={() => openPhotoModal('driver')}
              >
                {vehicleImages.driverSide ? (
                  <>
                    <img src={vehicleImages.driverSide} alt="Driver Side of the Truck" className="w-full h-32 object-cover rounded" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVehicleImages(prev => ({ ...prev, driverSide: null }));
                      }} 
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm font-medium text-gray-700">Driver Side the Truck</p>
                    <p className="text-xs text-gray-500 mt-1">Take Photo of the Driver Side of the Truck</p>
                  </>
                )}
              </div>
              <div 
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer group" 
                onClick={() => openPhotoModal('rear')}
              >
                {vehicleImages.rear ? (
                  <>
                    <img src={vehicleImages.rear} alt="Rear of the Truck" className="w-full h-32 object-cover rounded" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVehicleImages(prev => ({ ...prev, rear: null }));
                      }} 
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm font-medium text-gray-700">Rear of the Truck</p>
                    <p className="text-xs text-gray-500 mt-1">Take photo of the Rear of the Truck</p>
                  </>
                )}
              </div>
              <div 
                className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 cursor-pointer group" 
                onClick={() => openPhotoModal('passenger')}
              >
                {vehicleImages.passengerSide ? (
                  <>
                    <img src={vehicleImages.passengerSide} alt="Passenger Side of the Truck" className="w-full h-32 object-cover rounded" />
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setVehicleImages(prev => ({ ...prev, passengerSide: null }));
                      }} 
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="text-sm font-medium text-gray-700">Passenger Side of the Truck</p>
                    <p className="text-xs text-gray-500 mt-1">Take photo of the passenger Side of the Truck</p>
                  </>
                )}
              </div>
            </div>
          </div>



          {/* Items Checklist */}
          <div className="p-0 sm:px-6 mb-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Items Checklist</h2>

            {(() => {
              // ✅ calculate before looping
              const hasAnyFail = inspections.some(item => getStatus(item)?.toLowerCase() === "fail");

              // ✅ TRUE if any explicit fail
              const hasFail = inspections.some(item => getStatus(item)?.toLowerCase() === "fail");

              // ✅ default Pass until a fail exists
              const overallStatus = hasFail ? "Fail" : "Pass";

              return (
                <>
                  <div className="space-y-2">
                    {inspections.map((item, index) => {
                      const status = getStatus(item);
                      const isFail = status?.toLowerCase() === "fail";
                      const isDisabled = hasAnyFail && !status;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-center justify-between py-6 px-4 border border-[#E9E9E9] rounded-[6px] 
                            ${isDisabled ? "bg-gray-100 opacity-60 cursor-not-allowed" : "bg-white hover:bg-gray-50 cursor-pointer"}`}
                          onClick={() => !isDisabled && openInspectionModal(item)}
                        >
                          <span className="text-[#333333CC] roboto-medium text-[14px]">
                            {item.title}
                            {isFail && (
                              <div className="flex flex-col items-center gap-2 pt-2">
                                <span className="text-xs robotomedium text-[#333333CC]">
                                  Photo required
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openPhotoModal(`${item.title} Defect`);
                                  }}
                                  className="cursor-pointer flex robotomedium bg-[#00000014] items-center gap-1 text-[#00000099] py-[8px] px-[16px] rounded-[8px] text-xs hover:underline"
                                >
                                  <Camera size={18} />
                                  Open Camera
                                </button>
                                {checklistImages[item.id] && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <img 
                                      src={checklistImages[item.id]} 
                                      alt={`${item.title} defect`} 
                                      className="w-16 h-16 object-cover rounded" 
                                    />
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setChecklistImages(prev => ({ ...prev, [item.id]: null }));
                                      }}
                                      className="text-xs text-red-500 hover:underline"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </span>

                          <div className="flex flex-col items-center gap-4">
                            <span className={`robotosemibold text-[13px] ${getStatusColor(status)}`}>
                              {status}
                            </span>
                            <button
                              className={`text-sm hover:underline ${
                                isDisabled ? "text-gray-400 cursor-not-allowed" : "text-blue-600"
                              }`}
                              disabled={isDisabled}
                            >
                              View Instructions
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* ✅ Overall Status */}
                  <div className="mt-2 flex justify-end">
                    {overallStatus === "Pass" ? (
                      <span className="text-green-600 font-semibold text-lg">Pass</span>
                    ) : (
                      <span className="text-red-600 font-semibold text-lg">Fail</span>
                    )}
                  </div>
                </>
              );
            })()}
          </div>















          {/* Inspection Remarks */}
          <div className=" px-6 mb-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Inspection Remarks</h2>
            </div>
            
            {/* Input field instead of button */}
            <input
              type="text"
              placeholder="Enter remarks..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full px-4 py-8  bg-[#FBFBFB] rounded-[8px] text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              style={{border:"1px solid #E9E9E9"}}
            />
          </div>

          {/* Initial Inspection By */}
          <div className="p-0 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Initial Inspection by</h2>
            <div className="space-y-4">
              <div>
              <label className="block text-sm text-gray-600 mb-1">Inspected On</label>
              <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                {formatDate(new Date())}
              </div>
            </div>


              {/* <div>
                <label className="block text-sm text-gray-600 mb-1">Inspected By</label>
                <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                  {inspectionData.inspectedBy}
                </div>
              </div> */}

              {/* Driver's Sign Section */}
              <div className="space-y-3">
                <div className="flex items-start">
                  <input 
                    type="checkbox" 
                    checked={declarationConfirmed}
                    onChange={(e) => setDeclarationConfirmed(e.target.checked)}
                    className="mt-1 mr-3" 
                  />
                  <label className="text-sm text-gray-700">
                    I declare that the vehicle(s) listed has been inspected in Accordance with Ontario Schedule 1 Daily Inspections...
                  </label>
                </div>
              </div>
              <div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Driver's Sign</label>

                  <div className="bg-gray-50 px-4 py-3 rounded border border-gray-200 min-h-[60px] text-gray-700">
                    <SignatureCanvas
                      penColor="black"
                      canvasProps={{
                        width: 500,
                        height: 30,
                        className: "w-full border-none bg-transparent resize-none outline-none text-sm"
                      }}
                      ref={driverSignatureRef}
                      onEnd={() => driverSignatureRef.current && setDeclarationSignature(driverSignatureRef.current.toDataURL('image/png'))}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <button
              onClick={() => window.history.back()}
              className="cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button 
              className=" cursor-pointer px-6 py-3 bg-[#043677] text-white rounded-lg font-medium hover:bg-[#043677] disabled:opacity-50"
              disabled={loading}
              onClick={handleSaveInspection}
            >
              {loading ? 'Saving...' : 'Save Inspection'}
            </button>
          </div>

        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />

      {/* Inspection Item Modal */}
      {isModalOpen && selectedInspectionItem && (
        <InspectionModal
          item={selectedInspectionItem}
          onClose={closeInspectionModal}
          onSave={handleSave}
        />
      )}

      {/* Photo Modal */}
      {showPhotoModal && (
        <CameraModal
          context={photoContext}
          onClose={() => setShowPhotoModal(false)}
          onSave={handlePhotoSave}
        />
      )}

    </div>
  );
};

export default VehicleInspectionSystem;