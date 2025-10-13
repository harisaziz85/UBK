import React from "react";
import { NavLink } from "react-router-dom";

const Doctopbar = () => {
  return (
    <nav className="   w-full">
      <div className=" mb-[20px]">
        <div className="flex items-center justify-start h-16">
          <div className="flex space-x-6">
            <NavLink
              to="/admin/doc"
              className={({ isActive }) =>
                `px-3 py-2 robotomedium tetx-[16px] transition-all duration-200
                 ${
                   isActive
                     ? "text-[#043677] border-b-2 border-[#043677] pb-2"
                     : "text-[#333333CC] hover:text-[#043677]"
                 }`
              }
            >
              All Documents
            </NavLink>

            <NavLink
              to="/admin/ubktowing"
              className={({ isActive }) =>
                `px-3 py-2 robotomedium tetx-[16px] transition-all duration-200
                 ${
                   isActive
                     ? "text-[#043677] border-b-2 border-[#043677] pb-2"
                     : "text-[#333333CC] hover:text-[#043677]"
                 }`
              }
            >
              UBK Towing
            </NavLink>

            <NavLink
              to="/admin/CAADocuments"
              className={({ isActive }) =>
                `px-3 py-2 rounded-m robotomedium tetx-[16px] transition-all duration-200
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
