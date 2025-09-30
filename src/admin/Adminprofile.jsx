// src/components/Adminprofile.jsx
import React, { useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

const Adminprofile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handlePickFile = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col justify-between items-end h-[85vh]">
      <div className="w-[100%] bg-white shadow-md rounded-lg p-6">
        <h2 className="text-[24px] robotosemibold mb-[24px]">User Profile</h2>

        {/* Photo Section */}
        <div className="mb-6">
          <h3 className="text-[16px] robotomedium text-[#333333CC] mb-[10px] ">
            Photo
          </h3>
          <div>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-[100px] h-[100px] rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-[100px] h-[100px] text-gray-400" />
            )}
            <div>
              <div className="mt-2 mb-[12px] flex gap-5">
                <button
                  onClick={handlePickFile}
                  className="bg-[#043677] text-white w-[172px] h-[40px] robotomedium rounded"
                >
                  Pick Files
                </button>
                <button
                  onClick={handleRemoveImage}
                  className="text-gray-600 bg-[#F5F5F5] w-[172px] h-[40px] robotomedium border border-gray-300 rounded hover:bg-gray-100"
                >
                  Remove
                </button>
              </div>
              <p className="text-[12px] robotoregular text-gray-500 mt-1">
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

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[14px] robotoregular text-gray-700">
              First Name <span className="text-[red]">*</span>{" "}
            </label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block robotoregular text-gray-700">Last Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="mb-6">
          <label className="block robotoregular text-gray-700">Email</label>
          <input
            type="email"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
      </div>

      <div>
        <button className="robotomedium text-[12px] bg-[#043677] w-[66px] h-[36px] text-[white] rounded-[8px]">
          Save
        </button>
      </div>
    </div>
  );
};

export default Adminprofile;
