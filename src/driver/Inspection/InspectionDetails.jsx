import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChevronRight, ExternalLink } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import logo from '../../assets/image 104.png'

const InspectionDetails = () => {
  const { id } = useParams();
  const [inspectionDetails, setInspectionDetails] = useState({
    vehicle: "",
    inspectionForm: "",
    started: "",
    submitted: "",
    duration: "",
    source: "",
    submittedBy: "",
  });

  const [inspectionItems, setInspectionItems] = useState([]);
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api"; 

  const checklistMapping = {
    airBrakeSystem: "Air Brake System",
    cab: "Cab",
    couplingDevices: "Coupling Devices",
    dangerousGoods: "Dangerous Goods",
    driverControls: "Driver Controls",
    driverSeat: "Driver Seat",
    electricBrakeSystem: "Electric Brake System",
    emergencyEquipment: "Emergency Equipment",
    exhaustSystem: "Exhaust System",
    frameCargoBody: "Frame & Cargo Body",
    fuelSystem: "Fuel System",
    general: "General",
    glassMirrors: "Glass & Mirrors",
    heaterDefroster: "Heater Defroster",
    horn: "Horn",
    hydraulicBrakeSystem: "Hydraulic Brake System",
    lampsReflectors: "Lamps & Reflectors",
    steering: "Steering",
    suspensionSystem: "Suspension System",
    tires: "Tires",
    wheelsHubsFasteners: "Wheels Hubs & Fasteners",
    windshieldWipers: "Windshield Wipers",
    cargoSecurement: "Cargo Securement",
  };

  const relativeTime = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) return "today";
    return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  };

  useEffect(() => {
    const fetchInspection = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseUrl}/common/inspection/get-by/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

       

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.success) {
          const insp = data.inspection;

           console.log(data);

          const dateFormatter = new Intl.DateTimeFormat('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          });
          const timeFormatter = new Intl.DateTimeFormat('en-US', { 
            hour: 'numeric', 
            minute: '2-digit', 
            hour12: true 
          });

          const getFormattedDate = (dateStr) => {
            const date = new Date(dateStr);
            const datePart = dateFormatter.format(date);
            const timePart = timeFormatter.format(date).toLowerCase();
            return `${datePart} ${timePart}`;
          };

          const started = getFormattedDate(insp.inspectedOn);
          const submitted = getFormattedDate(insp.createdAt);

          const diffMs = Math.abs(new Date(insp.createdAt) - new Date(insp.inspectedOn));
          const minutes = Math.floor(diffMs / 60000);
          const seconds = Math.floor((diffMs % 60000) / 1000);
          const duration = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

          setInspectionDetails({
            vehicle: insp.vehicleId.licensePlate,
            inspectionForm: "Pre-trip Inspection",
            started,
            submitted,
            duration,
            source: "",
            submittedBy: insp.inspectedBy.name,
          });

          setInspection(insp);

          const items = Object.entries(insp.checklist).map(([key, obj]) => {
            const value = obj.value;
            return {
              id: key,
              name: checklistMapping[key] || key,
              status: value ? "Pass" : "Fail",
                image: obj.image || null, 
              expandable: false,
            };
          });
          setInspectionItems(items);
        } else {
          setError('Failed to fetch inspection');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchInspection();
    }
  }, [id, baseUrl]);

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-6">Error: {error}</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white px-6 py-4">
          <Skeleton height={24} width={200} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 px-2 sm:p-6">
          {/* Left Panel Skeleton */}
          <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-6">
            <Skeleton height={24} width={150} className="mb-6" />
            <div className="space-y-5">
              {/* Vehicle row skeleton */}
              <div className="flex justify-between pb-2 border-b border-[#33333333]">
                <Skeleton width={60} height={16} />
                <div className="flex items-center gap-3">
                  <Skeleton circle width={40} height={40} />
                  <Skeleton width={80} height={16} />
                </div>
              </div>
              {/* Other rows skeleton */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex justify-between pb-2 border-b border-[#33333333]">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={120} height={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel Skeleton */}
          <div className="w-full lg:flex-1 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <Skeleton height={24} width={150} />
            </div>

            <div className="space-y-0">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-4 ${
                    i !== 10 ? 'border-b border-[#33333333]' : ''
                  }`}
                >
                  <Skeleton width={250} height={16} />
                  <Skeleton width={60} height={20} />
                </div>
              ))}
            </div>

            <Skeleton width={100} height={12} className="mt-6" />
          </div>
        </div>
      </div>
    );
  }

  const createdAgo = inspection ? relativeTime(inspection.createdAt) : '';
  const initials = inspectionDetails.submittedBy.split(/\s+/).map(word => word.charAt(0)).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white  px-6 py-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          
        </div>
        <h1 className="text-[24px] text-[#333333] robotosemibold">Submission #{id.slice(0,7)}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-2 sm:p-6">
        {/* Left Panel - Inspection Details */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-[24px]  robotosemibold text-[#333333] mb-6">Inspection Details</h2>
          <div className="space-y-5 ">
            <div className="flex  justify-between border-b border-[#33333333]">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Vehicle</p>
              <div className="flex items-center  pb-2">
                <img 
                  src={inspection?.vehicleId?.photo || logo} 
                  alt="vehicle" 
                  className="w-10 h-10 rounded mr-3 object-cover"
                />
                <span className="robotomedium text-[14px] text-[#043677]">{inspectionDetails.vehicle}</span>
              </div>

            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Inspection Form</p>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#3CCE14] rounded-full mr-2"></span>
                <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.inspectionForm}</span>
              </div>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Started</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.started}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Submitted</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.submitted}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Duration</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.duration}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Submission Source</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.source}</span>
            </div>

          <div className="border-b flex justify-between border-[#33333333] pb-2">
  <p className="text-[#333333] robotoregular text-[14px] mb-2">Submitted By</p>
  <div className="flex items-center">
    {inspection?.inspectedBy?.profileImage ? (
      <img
        src={inspection.inspectedBy.profileImage}
        alt={inspectionDetails.submittedBy}
        className="w-8 h-8 rounded-full mr-3 object-cover"
      />
    ) : (
      <div className="w-8 h-8 bg-orange-400 rounded-full mr-3 flex items-center justify-center text-white text-sm font-medium">
        {initials}
      </div>
    )}
    <span className="robotoregular text-[14px] text-[#333333E5]">
      {inspectionDetails.submittedBy}
    </span>
  </div>
</div>

          </div>
        </div>

        {/* Right Panel - Inspection Items */}
        <div className="w-full lg:flex-1 bg-white rounded-lg shadow-sm  p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] text-[#333333] robotosemibold">Inspection Items</h2>
        
          </div>

          <div className="space-y-0 ">
            {inspectionItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between py-4 ${
                  index !== inspectionItems.length - 1 ? 'border-b border-[#33333333]' : ''
                }`}
              >
                <div className="flex items-center flex-1">
                  {item.expandable && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  )}
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Inspection"
                      className="w-12 h-12 rounded mr-3 object-cover"
                    />
                  )}
                  <span className="robotomedium text-[14px] text-[#333333CC]">{item.name}</span>
                  {item.expandable && (
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                  )}
                </div>
                <div className="flex items-center">
                  {item.status === "Fail" && (
                    <span className="text-red-500 mr-2">✕</span>
                  )}
                  {item.status === "Pass" && (
                    <span className="text-green-500 mr-2">✓</span>
                  )}
                  <span
                    className={`robotomedium text-[14px] ${
                      item.status === "Pass" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-6">Created {createdAgo} ago</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails;