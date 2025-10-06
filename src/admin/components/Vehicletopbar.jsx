import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";

const Vehicletopbar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex justify-between items-center w-full">
      {/* Left Section */}
      <div className="flex flex-col">
        <p className="robotosemibold text-[22px] text-[#333333] mb-[10px]">Vehicles</p>
        
        {/* Tabs */}
        <nav className="flex items-center space-x-8 mb-[16px]">
          <NavLink
            to="/admin/vehicles"
            className={({ isActive }) =>
              `text-[14px] ${
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
              `text-[14px] ${
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
              `text-[14px] ${
                isActive
                  ? 'text-[#0046A5] border-b-2 border-[#0046A5] pb-[4px]'
                  : 'text-[#7A7A7A]'
              }`
            }
          >
            Unassigned
          </NavLink>
        </nav>

        {/* Search Bar */}
        <div className="relative w-[380px]">
          <IoSearchSharp className="absolute left-4 top-[10px] text-gray-400 text-[18px]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search"
            className="w-full bg-white border border-[#E5E7EB] text-[#333333] text-[14px] py-[8px] pl-[36px] pr-[12px] rounded-full focus:outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div>
        <button className="bg-[#0046A5] hover:bg-[#003B8A] text-white text-[14px] px-5 py-2 rounded-md flex items-center space-x-1 shadow-sm">
          <span className="text-[18px]">+</span>
          <span>Add Vehicle</span>
        </button>
      </div>
    </div>
  );
};

export default Vehicletopbar;