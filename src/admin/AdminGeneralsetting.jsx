import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

const AdminGeneralsetting = () => {
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);

  const handlePickFile = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setLogo(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="p-6 flex flex-col gap-6 bg-[#F6F6F6] min-h-screen">
      {/* Account Owner + Usage */}
      <p className="robotosemibold text-[24px]">General Settings</p>
      <div className="grid grid-cols-2 gap-6">
        {/* Account Owner */}
        <div className="bg-white shadow p-[13px] rounded-[12px]">
            <div className="flex justify-between mb-[14px]">
                <p className="robotomedium text-[20px]">Account Owner</p>
   <button className="text-sm bg-[#f5f5f5] border border-[#CCCCCC] text-[#000000] px-3 py-2 rounded-md">
            Change Owner
          </button>
            </div>
          
          <div className="flex items-center gap-4">
            <FaUserCircle className="w-16 h-16 text-gray-400" />
            <div>
              <h3 className="text-[16px] robotomedium">
               Hwllo
              </h3>
              <p className="text-[14px] robotomedium text-[#043677]">info@ubktowing.ca</p>
            </div>
          </div>
         
        </div>

        {/* Account Usage */}
        <div className="bg-white shadow rounded-lg p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[20px] robotomedium">Account Usage</h3>
            <button className="text-sm border px-3 py-1 rounded-md bg-[#f5f5f5] bordr border-[#CCCCCC] ">
              Explore plans
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-1">Vehicles</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#043677] h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">60 of 40</p>
        </div>
      </div>

      {/* General Section */}
      <div className="bg-white shadow rounded-lg p-5">
        <h3 className="text-[16px] font-semibold mb-4">General</h3>

        {/* Logo Upload */}
        <div className="mb-6">
          <label className="block text-[14px] text-[#333333CC] mb-2">Logo</label>
          <div className="flex items-start gap-6">
            {logo ? (
              <img
                src={logo}
                alt="logo"
                className="w-[160px] h-[80px] object-cover rounded border"
              />
            ) : (
              <FaUserCircle className="w-[80px] h-[80px] text-gray-400" />
            )}

            <div>
              <div className="flex gap-3 mb-2">
                <button
                  onClick={handlePickFile}
                  className="bg-[#043677] text-white px-4 py-2 rounded-md text-sm"
                >
                  Pick Files
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="border px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200"
                >
                  Remove
                </button>
              </div>
              <p className="text-xs text-gray-500">
                Only PNG, GIF, JPEG, and TIFF files are accepted.
              </p>
              <input
                type="file"
                accept="image/png, image/jpeg, image/gif, image/tiff"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[14px] text-[#333333CC]">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              defaultValue="UBK Towing"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC]">Address</label>
            <input
              type="text"
              defaultValue="35 king St"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-[14px] text-[#333333CC]">City</label>
            <input
              type="text"
              defaultValue="Toronto"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC]">
              State/province/Region
            </label>
            <input
              type="text"
              defaultValue="Ontario"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC]">
              Zip/postal Code
            </label>
            <input
              type="text"
              defaultValue="M9N 3R8"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC]">Country</label>
            <input
              type="text"
              defaultValue="Pakistan"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[14px] text-[#333333CC]">
              Phone Number
            </label>
            <input
              type="text"
              defaultValue="12345678987"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC]">Industry</label>
            <input
              type="text"
              defaultValue="Transportation"
              className="mt-1 p-2 w-full border border-[#CCCCCC] rounded focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-[#043677] text-white px-6 py-2 rounded-md text-sm">
          Save Account
        </button>
      </div>
    </div>
  );
};

export default AdminGeneralsetting;
