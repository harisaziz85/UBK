import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";

const Vehicletopbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query); // Pass search query to parent component
    }
  };

  const handleAddVehicle = () => {
    navigate('/admin/createvehicles');
  };

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Section */}
      <div className="flex flex-col">
        <p className="robotosemibold text-[24px] text-[#333333] mb-[10px]">Vehicles</p>
        
        {/* Tabs */}
        <nav className="flex items-center space-x-8 mb-[16px]">
          <NavLink
            to="/admin/vehicles"
            className={({ isActive }) =>
              `text-[14px] robotomedium ${
                isActive
                  ? 'text-[#0046A5] border-b-2 border-[#0046A5] pb-[4px]'
                  : 'text-[#7A7A7A]'
              }`
            }
          >
            All
          </NavLink>

          <NavLink
            to="/admin/assigned-vehicles"
            className={({ isActive }) =>
              `text-[14px] robotomedium ${
                isActive
                  ? 'text-[#0046A5] border-b-2 border-[#0046A5] pb-[4px]'
                  : 'text-[#7A7A7A]'
              }`
            }
          >
            Assigned
          </NavLink>

          <NavLink
            to="/admin/unassigned-vehicles"
            className={({ isActive }) =>
              `text-[14px] robotomedium ${
                isActive
                  ? 'text-[#0046A5] border-b-2 border-[#0046A5] pb-[4px]'
                  : 'text-[#7A7A7A]'
              }`
            }
          >
            Unassigned
          </NavLink>
        </nav>

      
      </div>

      {/* Right Section */}
      <div>
        <button 
          onClick={handleAddVehicle}
          className="bg-[#0046A5] robotomedium hover:bg-[#003B8A] text-white text-[14px] px-5 py-2 rounded-md flex items-center space-x-1 shadow-sm"
        >
          <span className="text-[18px]">+</span>
          <span>Add Vehicle</span>
        </button>
      </div>
    </div>
  );
};

export default Vehicletopbar;