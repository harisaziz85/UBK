import React from "react";
import { NavLink } from "react-router-dom";

const Doctopbar = () => {
  return (
    <nav className="w-full">
      <div className="mb-[20px]">
        {/* ✅ Scrollable Navbar Container */}
        <div className="flex items-center justify-start h-16 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-6 px-4 min-w-max">
            {/* All Documents */}
            <NavLink
              to="/admin/doc"
              className={({ isActive }) =>
                `px-3 py-2 whitespace-nowrap robotomedium text-[16px] transition-all duration-200
                 ${
                   isActive
                     ? "text-[#043677] border-b-2 border-[#043677] pb-2"
                     : "text-[#333333CC] hover:text-[#043677]"
                 }`
              }
            >
              All Documents
            </NavLink>

            {/* UBK Towing */}
            <NavLink
              to="/admin/ubktowing"
              className={({ isActive }) =>
                `px-3 py-2 whitespace-nowrap robotomedium text-[16px] transition-all duration-200
                 ${
                   isActive
                     ? "text-[#043677] border-b-2 border-[#043677] pb-2"
                     : "text-[#333333CC] hover:text-[#043677]"
                 }`
              }
            >
              UBK Towing
            </NavLink>

            {/* CAA Documents */}
            <NavLink
              to="/admin/CAADocuments"
              className={({ isActive }) =>
                `px-3 py-2 whitespace-nowrap robotomedium text-[16px] transition-all duration-200
                 ${
                   isActive
                     ? "text-[#043677] border-b-2 border-[#043677] pb-2"
                     : "text-[#333333CC] hover:text-[#043677]"
                 }`
              }
            >
              CAA Documents
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Doctopbar;
