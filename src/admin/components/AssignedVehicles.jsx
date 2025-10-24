import React, { useEffect, useState } from 'react';
import Vehicletopbar from './Vehicletopbar';
import { FaRegClock, FaRegCommentDots } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AssignedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleVehicleClick = (vehicleId) => {
  navigate(`/admin/vehicleprofile/${vehicleId}`);
};

  useEffect(() => {
    const fetchAssignedVehicles = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("No token found — please log in again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://ubktowingbackend-production.up.railway.app/api/admin/vehicle?page=1&limit=50',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // ✅ Filter only Assigned vehicles
        const allVehicles = response.data.vehicles || [];
        const assignedOnly = allVehicles.filter(
          (v) => v.driverId || (v.assignment && v.assignment.driverId)
        );
        setVehicles(assignedOnly);
      } catch (error) {
        console.error("Error fetching assigned vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedVehicles();
  }, []);

  // Shimmer effect component for loading state
  const Shimmer = () => {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[200px_120px_80px_100px_120px_120px_80px_120px_80px_80px] items-center py-3 px-4 border-b border-gray-200 animate-pulse"
          >
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-md flex-shrink-0"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-20 h-4 bg-gray-200 rounded min-w-0"></div>
            <div className="w-12 h-4 bg-gray-200 rounded min-w-0"></div>
            <div className="w-16 h-4 bg-gray-200 rounded min-w-0"></div>
            <div className="w-16 h-4 bg-gray-200 rounded min-w-0"></div>
            <div className="w-20 h-4 bg-gray-200 rounded min-w-0"></div>
            <div className="w-16 h-4 bg-gray-200 rounded min-w-0"></div>
            <div className="flex items-center space-x-2 min-w-0">
              <div className="w-2 h-2 bg-gray-200 rounded-full flex-shrink-0"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-2 flex justify-center space-x-4 min-w-0">
              <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0"></div>
              <div className="w-4 h-4 bg-gray-200 rounded flex-shrink-0"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-[#F9FAFB] min-h-screen overflow-x-hidden">
      <Vehicletopbar />
      <div className="mt-4 sm:mt-6 bg-white w-full overflow-x-auto">
        <div className="min-w-[1132px] bg-[#04367714] text-black robotomedium text-[14px] font-medium grid grid-cols-[200px_120px_80px_100px_120px_120px_80px_120px_80px_80px] items-center py-3 px-4">
          <div className="flex items-center space-x-2 whitespace-nowrap min-w-0">
            <input type="checkbox" className="w-4 h-4 accent-white flex-shrink-0" />
            <span className="truncate whitespace-nowrap">Name</span>
          </div>
          <span className="whitespace-nowrap truncate">License Plate</span>
          <span className="whitespace-nowrap truncate">Year</span>
          <span className="whitespace-nowrap truncate">Make</span>
          <span className="whitespace-nowrap truncate">Model</span>
          <span className="whitespace-nowrap truncate">Current Meter</span>
          <span className="whitespace-nowrap truncate">Color</span>
          <span className="whitespace-nowrap truncate">Status</span>
          <span className="col-span-2 text-center whitespace-nowrap">Actions</span>
        </div>

        {loading ? (
          <div className="min-w-[1132px]"><Shimmer /></div>
        ) : vehicles.length > 0 ? (
          <div className="min-w-[1132px]">
            {vehicles.map((v) => (
              <div
                key={v._id}
                onClick={() => handleVehicleClick(v._id)}
                className="cursor-pointer grid grid-cols-[200px_120px_80px_100px_120px_120px_80px_120px_80px_80px] items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <input type="checkbox" className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                  {v.photo ? (
                    <img
                      src={v.photo}
                      alt="vehicle"
                      className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-md bg-gray-300 flex items-center justify-center flex-shrink-0 text-xs font-medium text-gray-600">
                      {v.name ? v.name.substring(0, 2).toUpperCase() : "—"}
                    </div>
                  )}
                  <span className="font-medium truncate whitespace-nowrap">{v.name || "—"}</span>
                </div>

                <span className="whitespace-nowrap truncate">{v.licensePlate || "—"}</span>
                <span className="whitespace-nowrap truncate">{v.year || "—"}</span>
                <span className="whitespace-nowrap truncate">{v.make || "—"}</span>
                <span className="whitespace-nowrap truncate">{v.model || "—"}</span>
                <span className="whitespace-nowrap truncate">{v.currentMilage ? `${v.currentMilage} Km` : "—"}</span>
                <span className="whitespace-nowrap truncate">{v.color || "—"}</span>

                <div className="flex items-center space-x-2 min-w-0">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700 truncate whitespace-nowrap">Assigned</span>
                </div>

                <div className="col-span-2 flex justify-center space-x-4 text-gray-600 min-w-0">
                  <FaRegCommentDots className="w-5 h-5 cursor-pointer hover:text-blue-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="min-w-[1132px] text-center py-6 text-gray-500">No assigned vehicles found.</div>
        )}
      </div>
    </div>
  );
};

export default AssignedVehicles;