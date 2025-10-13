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
            className="grid grid-cols-10 items-center py-3 px-4 border-b border-gray-200 animate-pulse"
          >
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="w-12 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-200 rounded-full"></div>
              <div className="w-24 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="col-span-2 flex justify-center space-x-4">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      {/* Top Bar */}
      <Vehicletopbar />

      {/* Table */}
      <div className="mt-6 bg-white overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#04367714] text-black robotomedium text-[14px] font-medium grid grid-cols-10 items-center py-3 px-4">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 accent-white" />
            <span>Name</span>
          </div>
          <span>License Plate</span>
          <span>Year</span>
          <span>Make</span>
          <span>Model</span>
          <span>Current Meter</span>
          <span>Color</span>
          <span>Status</span>
          <span className="col-span-2 text-center">Actions</span>
        </div>

        {/* Shimmer Loader */}
        {loading && <Shimmer />}

        {/* Table Rows */}
        {!loading && (
          <div>
            {vehicles.length > 0 ? (
              vehicles.map((v) => (
                <div
                  key={v._id}
                  className="grid grid-cols-10 items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleVehicleClick(v._id)}
                >
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                    <img
                      src={
                        v.photo ||
                        "https://via.placeholder.com/40?text=No+Image"
                      }
                      alt="vehicle"
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <span className="font-medium">{v.name || "—"}</span>
                  </div>
                  <span>{v.licensePlate || "—"}</span>
                  <span>{v.year || "—"}</span>
                  <span>{v.make || "—"}</span>
                  <span>{v.model || "—"}</span>
                  <span>
                    {v.currentMilage
                      ? `${v.currentMilage} Km`
                      : v.currentMeter
                      ? `${v.currentMeter} Km`
                      : "—"}
                  </span>
                  <span>{v.color || "—"}</span>
                  <div className="flex items-center space-x-2">
                    {v.driverId || (v.assignment && v.assignment.driverId) ? (
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span className="text-gray-700">Assigned</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-gray-700">Unassigned</span>
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 flex justify-center space-x-4 text-gray-600">
                    <FaRegClock className="cursor-pointer hover:text-blue-500" size={16} />
                    <FaRegCommentDots className="cursor-pointer hover:text-blue-500" size={16} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 text-[14px]">
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