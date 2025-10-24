import React, { useEffect, useState } from 'react';
import Vehicletopbar from './components/Vehicletopbar';
import { FaRegClock, FaRegCommentDots } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          toast.error("No token found — please log in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          setLoading(false);
          return;
        }

        const response = await axios.get(
          'https://ubktowingbackend-production.up.railway.app/api/admin/vehicle?page=1&limit=10',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success && response.data.vehicles) {
          setVehicles(response.data.vehicles);
        } else {
          console.warn("Unexpected API response:", response.data);
          toast.warn("Unexpected API response.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error(error.response?.data?.message || "Failed to fetch vehicles.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleVehicleClick = (vehicleId) => {
    navigate(`/admin/vehicleprofile/${vehicleId}`);
  };

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
      {/* Top Bar */}
      <Vehicletopbar />

      {/* Table */}
      <div className="mt-4 sm:mt-6 bg-white w-full overflow-x-auto">
        {/* Table Header */}
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

        {/* Shimmer Loader */}
        {loading && <div className="min-w-[1132px]"><Shimmer /></div>}

        {/* Table Rows */}
        {!loading && (
          <div className="min-w-[1132px]">
            {vehicles.length > 0 ? (
              vehicles.map((v) => (
                <div
                  key={v._id}
                  className="grid grid-cols-[200px_120px_80px_100px_120px_120px_80px_120px_80px_80px] items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleVehicleClick(v._id)}
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
                  <span className="whitespace-nowrap truncate">
                    {v.currentMilage
                      ? `${v.currentMilage} Km`
                      : v.currentMeter
                      ? `${v.currentMeter} Km`
                      : "—"}
                  </span>
                  <span className="whitespace-nowrap truncate">{v.color || "—"}</span>
                  <div className="flex items-center space-x-2 min-w-0">
                    {v.driverId || (v.assignment && v.assignment.driverId) ? (
                      <span className="flex items-center space-x-1 truncate whitespace-nowrap">
                        <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                        <span className="text-gray-700 truncate whitespace-nowrap">Assigned</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 truncate whitespace-nowrap">
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                        <span className="text-gray-700 truncate whitespace-nowrap">Unassigned</span>
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-center space-x-4 text-gray-600 min-w-0">
                    <FaRegCommentDots className="cursor-pointer hover:text-blue-500 flex-shrink-0" size={20} />
                  </div>
                </div>
              ))
            ) : (
              <div className="min-w-[1132px] text-center py-6 text-gray-500 text-[14px]">
                No vehicles found.
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Vehicles;