import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"; // Assuming toast is from react-toastify

const VehicleAttachmentPopup = ({ isOpen, onClose, documentId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Authentication required. Please log in.");
          return;
        }

        const Baseurl = 'https://ubktowingbackend-production.up.railway.app/api'; // Replace with actual Baseurl from env or define it

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
        // Optionally set to empty array or handle error state
        setVehicles([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      setSelectedVehicleId(null);
      fetchVehicles();
    }
  }, [isOpen]);

  const filteredVehicles = vehicles.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vehicle.model?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleVehicleSelection = (vehicleId) => {
    setSelectedVehicleId(prev => prev === vehicleId ? null : vehicleId);
  };

  const handleAttach = async () => {
    console.log('handleAttach clicked');
    console.log('selectedVehicleId:', selectedVehicleId);
    console.log('documentId:', documentId);

    if (selectedVehicleId && documentId) {
      try {
        const token = localStorage.getItem("authToken");
        console.log('token:', token ? 'present' : 'missing');
        if (!token) {
          toast.error("Authentication required. Please log in.");
          return;
        }

        const Baseurl = 'https://ubktowingbackend-production.up.railway.app/api';

        const formData = new FormData();
        formData.append('vehicleId', selectedVehicleId);

        console.log('Sending request to:', `${Baseurl}/common/document/update/${documentId}`);
        console.log('formData vehicleId:', selectedVehicleId);

        const response = await fetch(`${Baseurl}/common/document/update/${documentId}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error('Failed to attach vehicle to document');
        }

        toast.success('Vehicle attached successfully');
        setSelectedVehicleId(null);
        onClose();
      } catch (error) {
        console.error('Error attaching vehicle:', error);
        toast.error('Failed to attach vehicle');
      }
    } else {
      console.log('Condition failed: selectedVehicleId && documentId');
      toast.error('No vehicle selected or document ID missing');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-md sm:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-blue-100 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Attach document to Vehicle</h2>
            <button
              onClick={onClose}
              className="text-gray-500 cursor-pointer hover:text-gray-700 text-2xl sm:text-3xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Drag and drop files to upload</p>
          {/* Mobile Sidebar Info */}
          <div className="lg:hidden flex items-center justify-between mt-2 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <svg
                width="11"
                height="20"
                viewBox="0 0 11 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 20C3.96667 20 2.66667 19.4667 1.6 18.4C0.533333 17.3333 0 16.0333 0 14.5V4C0 2.9 0.391667 1.95833 1.175 1.175C1.95833 0.391667 2.9 0 4 0C5.1 0 6.04167 0.391667 6.825 1.175C7.60833 1.95833 8 2.9 8 4V13.5C8 14.2 7.75833 14.7917 7.275 15.275C6.79167 15.7583 6.2 16 5.5 16C4.8 16 4.20833 15.7583 3.725 15.275C3.24167 14.7917 3 14.2 3 13.5V4H4.5V13.5C4.5 13.7833 4.59583 14.0208 4.7875 14.2125C4.97917 14.4042 5.21667 14.5 5.5 14.5C5.78333 14.5 6.02083 14.4042 6.2125 14.2125C6.40417 14.0208 6.5 13.7833 6.5 13.5V4C6.5 3.3 6.25833 2.70833 5.775 2.225C5.29167 1.74167 4.7 1.5 4 1.5C3.3 1.5 2.70833 1.74167 2.225 2.225C1.74167 2.70833 1.5 3.3 1.5 4V14.5C1.5 15.6 1.89167 16.5417 2.675 17.325C3.45833 18.1083 4.4 18.5 5.5 18.5C6.6 18.5 7.54167 18.1083 8.325 17.325C9.10833 16.5417 9.5 15.6 9.5 14.5V4H11V14.5C11 16.0333 10.4667 17.3333 9.4 18.4C8.33333 19.4667 7.03333 20 5.5 20Z"
                  fill="#043677"
                />
              </svg>
              <span className="text-xs font-medium text-gray-700">All Vehicles</span>
            </div>
            <div className="flex items-center justify-center bg-[#043677] text-white text-xs font-semibold rounded-full w-5 h-5">
              {vehicles.length}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-gray-200 bg-white">
          <div className="relative">
            <input
              type="text"
              placeholder="Find Vehicles, types, group"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 sm:pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <svg className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          {/* Left Sidebar - Hidden on mobile */}
          <div className="hidden lg:block w-64 border-r border-blue-200 p-6 flex flex-col space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <svg
                  width="11"
                  height="20"
                  viewBox="0 0 11 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.5 20C3.96667 20 2.66667 19.4667 1.6 18.4C0.533333 17.3333 0 16.0333 0 14.5V4C0 2.9 0.391667 1.95833 1.175 1.175C1.95833 0.391667 2.9 0 4 0C5.1 0 6.04167 0.391667 6.825 1.175C7.60833 1.95833 8 2.9 8 4V13.5C8 14.2 7.75833 14.7917 7.275 15.275C6.79167 15.7583 6.2 16 5.5 16C4.8 16 4.20833 15.7583 3.725 15.275C3.24167 14.7917 3 14.2 3 13.5V4H4.5V13.5C4.5 13.7833 4.59583 14.0208 4.7875 14.2125C4.97917 14.4042 5.21667 14.5 5.5 14.5C5.78333 14.5 6.02083 14.4042 6.2125 14.2125C6.40417 14.0208 6.5 13.7833 6.5 13.5V4C6.5 3.3 6.25833 2.70833 5.775 2.225C5.29167 1.74167 4.7 1.5 4 1.5C3.3 1.5 2.70833 1.74167 2.225 2.225C1.74167 2.70833 1.5 3.3 1.5 4V14.5C1.5 15.6 1.89167 16.5417 2.675 17.325C3.45833 18.1083 4.4 18.5 5.5 18.5C6.6 18.5 7.54167 18.1083 8.325 17.325C9.10833 16.5417 9.5 15.6 9.5 14.5V4H11V14.5C11 16.0333 10.4667 17.3333 9.4 18.4C8.33333 19.4667 7.03333 20 5.5 20Z"
                    fill="#043677"
                  />
                </svg>

                <div>
                  <span className="text-sm font-medium text-gray-700">All Vehicles</span>
                </div>
              </div>

              {/* ✅ Perfect circular badge */}
              <div className="flex items-center justify-center bg-[#043677] text-white text-xs font-semibold rounded-full w-6 h-6">
                {vehicles.length}
              </div>
            </div>
            <div className="flex-1"></div>
            <div className="text-xs text-gray-500">
              <p>Vehicles</p>
            </div>
          </div>

          {/* Right Content - Vehicles List */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p className="text-gray-500">Loading vehicles...</p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {filteredVehicles.length > 0 ? (
                  filteredVehicles.map((vehicle) => {
                    const isSelected = selectedVehicleId === vehicle._id;
                    return (
                      <div
                        key={vehicle._id}
                        className={`relative rounded-xl sm:rounded-2xl overflow-hidden hover:bg-[#3333330F] hover:shadow-lg transition-all cursor-pointer flex ${
                          isSelected ? "ring-2 ring-blue-500 ring-opacity-50" : ""
                        }`}
                        onClick={() => toggleVehicleSelection(vehicle._id)}
                      >
                        {/* Vehicle Image */}
                        <div className="relative flex-shrink-0 w-12 h-12 sm:w-[50px] sm:h-[50px]">
                          <img
                            src={vehicle.photo || "https://via.placeholder.com/50x50?text=No+Image"}
                            alt={vehicle.name}
                            className="w-full h-full object-cover rounded-l-xl sm:rounded-l-2xl"
                          />
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>

                        {/* Vehicle Info and Button */}
                        <div className="flex-1 flex items-center justify-between p-3 sm:p-4">
                          <div className="flex flex-col">
                            <h3 className="text-sm sm:text-[14px] text-[#043677] font-medium">{vehicle.name}</h3>
                            <p className="text-xs text-gray-500">{vehicle.make} {vehicle.model} ({vehicle.type})</p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleVehicleSelection(vehicle._id);
                            }}
                            className={`cursor-pointer px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors min-w-[70px] sm:min-w-[80px]`
                              + (isSelected
                                ? " bg-green-500 text-white hover:bg-green-600"
                                : " bg-[#043677]/90 text-white hover:bg-[#043677]")}
                          >
                            {isSelected ? "Selected" : "Select"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="flex justify-center items-center h-32">
                    <p className="text-gray-500">No vehicles found.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer - Attach Button */}
        {selectedVehicleId && (
          <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleAttach}
              className="w-full bg-[#043677] text-white py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold hover:bg-[#043677]/90 transition-colors text-sm"
            >
              Attach Vehicle
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleAttachmentPopup;