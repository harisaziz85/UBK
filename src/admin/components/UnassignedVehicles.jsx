import React, { useEffect, useState } from 'react';
import Vehicletopbar from './Vehicletopbar';
import { FaRegClock, FaRegCommentDots } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UnassignedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleVehicleClick = (vehicleId) => {
  navigate(`/admin/vehicleprofile/${vehicleId}`);
};

  useEffect(() => {
    const fetchUnassignedVehicles = async () => {
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

        // ✅ Filter only Unassigned vehicles
        const allVehicles = response.data.vehicles || [];
        const unassignedOnly = allVehicles.filter(
          (v) => !(v.driverId || (v.assignment && v.assignment.driverId))
        );
        setVehicles(unassignedOnly);
      } catch (error) {
        console.error("Error fetching unassigned vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnassignedVehicles();
  }, []);

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen overflow-x-hidden">
      <Vehicletopbar />
      <div className="mt-6 bg-white w-full overflow-x-auto">
        <div className="bg-[#04367714] text-black robotomedium text-[14px] font-medium grid grid-cols-[200px_120px_80px_100px_120px_120px_80px_120px_80px_80px] items-center py-3 px-4">
          <div className="flex items-center space-x-2 whitespace-nowrap min-w-0">
            <input type="checkbox" className="w-4 h-4 accent-white flex-shrink-0" />
            <span className="truncate">Name</span>
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
          <div className="text-center py-6 text-gray-500">Loading unassigned vehicles...</div>
        ) : vehicles.length > 0 ? (
          vehicles.map((v) => (
            <div
              key={v._id}
              onClick={() => handleVehicleClick(v._id)}
              className=" cursor-pointer grid grid-cols-[200px_120px_80px_100px_120px_120px_80px_120px_80px_80px] items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2 min-w-0">
                <input type="checkbox" className="w-4 h-4 accent-blue-600 flex-shrink-0" />
                <img
                  src={v.photo || "https://via.placeholder.com/40?text=No+Image"}
                  alt="vehicle"
                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                />
                <span className="font-medium truncate">{v.name || "—"}</span>
              </div>

              <span className="whitespace-nowrap truncate">{v.licensePlate || "—"}</span>
              <span className="whitespace-nowrap truncate">{v.year || "—"}</span>
              <span className="whitespace-nowrap truncate">{v.make || "—"}</span>
              <span className="whitespace-nowrap truncate">{v.model || "—"}</span>
              <span className="whitespace-nowrap truncate">{v.currentMilage ? `${v.currentMilage} Km` : "—"}</span>
              <span className="whitespace-nowrap truncate">{v.color || "—"}</span>

              <div className="flex items-center space-x-2 min-w-0">
                <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                <span className="text-gray-700 truncate">Unassigned</span>
              </div>

              <div className="col-span-2 flex justify-center space-x-4 text-gray-600 min-w-0">
                <FaRegCommentDots className=" w-5 h-5 cursor-pointer hover:text-blue-500 flex-shrink-0" size={16} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">No unassigned vehicles found.</div>
        )}
      </div>
    </div>
  );
};

export default UnassignedVehicles;