import React, { useEffect, useState } from 'react';
import Vehicletopbar from '\./Vehicletopbar';
import { FaRegClock, FaRegCommentDots } from "react-icons/fa";
import axios from 'axios';

const AssignedVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <Vehicletopbar />
      <div className="mt-6 bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
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

        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading assigned vehicles...</div>
        ) : vehicles.length > 0 ? (
          vehicles.map((v) => (
            <div
              key={v._id}
              className="grid grid-cols-10 items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50"
            >
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                <img
                  src={v.photo || "https://via.placeholder.com/40?text=No+Image"}
                  alt="vehicle"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="font-medium">{v.name || "—"}</span>
              </div>

              <span>{v.licensePlate || "—"}</span>
              <span>{v.year || "—"}</span>
              <span>{v.make || "—"}</span>
              <span>{v.model || "—"}</span>
              <span>{v.currentMilage ? `${v.currentMilage} Km` : "—"}</span>
              <span>{v.color || "—"}</span>

              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-gray-700">Assigned</span>
              </div>

              <div className="col-span-2 flex justify-center space-x-4 text-gray-600">
                <FaRegClock className="cursor-pointer hover:text-blue-500" size={16} />
                <FaRegCommentDots className="cursor-pointer hover:text-blue-500" size={16} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">No assigned vehicles found.</div>
        )}
      </div>
    </div>
  );
};

export default AssignedVehicles;
