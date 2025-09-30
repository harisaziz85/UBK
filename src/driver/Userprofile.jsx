import React, { useState } from "react";

const Userprofile = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Please Select");
  const [image, setImage] = useState(null); // State for image
  const options = ["10", "25", "50", "100"];

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/gif", "image/jpeg", "image/tiff"];
      if (validTypes.includes(file.type)) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
      } else {
        alert("Please upload a valid image file (PNG, GIF, JPG, or TIFF).");
      }
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setImage(null);
  };

  return (
    <div className="p-6">
      <div className="bg-white px-6 py-8 rounded-2xl shadow-sm">
        {/* Title */}
        <p className="font-semibold text-[24px] mb-6">User Profile</p>

        {/* Photo Section */}
        <p className="font-medium text-[16px] text-[#333333CC] mb-2">Photo</p>
        <div className=" gap-4 mb-6">
          {image ? (
            <img
              src={image}
              alt="profile"
              className="w-[80px] h-[80px] rounded-full border border-[#CCCCCC] object-cover"
            />
          ) : (
            <div className="w-[80px] h-[80px] rounded-full border border-[#CCCCCC] flex items-center justify-center bg-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
          <br />
          <div className="flex items-center gap-2">
            <label className="bg-[#0D47A1] text-white px-4 py-2 rounded-md text-sm cursor-pointer">
              Pick Files
              <input
                type="file"
                accept="image/png,image/gif,image/jpeg,image/tiff"
                className="hidden "
                onChange={handleImageUpload}
              />
            </label>
            <div className="border border-dashed bg-[#F5F5F5] rounded-md px-6 py-2 text-gray-400 text-sm cursor-pointer">
              Drop Files here
            </div>
            <button
              onClick={handleImageRemove}
              className="border border-[#CCCCCC] px-4 py-2 rounded-md text-sm bg-[#F5F5F5]"
              disabled={!image}
            >
              Remove
            </button>
          </div>
        </div>
        <p className="text-[12px] rbotoregular text-[#333333B2] mb-6">
          Only PNG, GIF, JPG, and TIFF files are accepted.
        </p>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[14px] text-[#333333CC] robotoregular  mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="UBK Towing"
              className="w-full border border-[#CCCCCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">Last Name</label>
            <input
              type="text"
              placeholder="35 king St"
              className="w-full border border-[#CCCCCC] focus:outline-none focus:ring-0 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[14px] text-[#333333CC] robotoregular mb-1 ">Email</label>
          <input
            type="email"
            placeholder="ali@gmail.com"
            className="w-full border border-[#CCCCCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0"
          />
        </div>

        {/* Radio Buttons Section */}
        <div className="mb-6">
          <p className="text-[14px] text-[#333333CC] robotoregular mb-2">
            Select how you want to view fuel economy values throughout Fleetio,
            and volume units in the Fuel History summary.{" "}
            <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-[14px] text-[#333333CC] robotoregular">
              <input type="radio" name="units" className="accent-blue-600" />
              mpg (US) · g/hr (US) · Gallons (US)
            </label>
            <label className="flex items-center gap-2 text-[14px] text-[#333333CC] robotoregular">
              <input type="radio" name="units" className="accent-blue-600" />
              mpg (UK) · g/hr (UK) · Gallons (UK)
            </label>
            <label className="flex items-center gap-2 text-[14px] text-[#333333CC] robotoregular">
              <input type="radio" name="units" className="accent-blue-600" />
              L/100km · L/100hr · Liters
            </label>
            <label className="flex items-center gap-2 text-[14px] text-[#333333CC] robotoregular">
              <input type="radio" name="units" className="accent-blue-600" />
              km/L · L/hr · Liters
            </label>
          </div>
        </div>

        {/* Custom Dropdown */}
        <div className="mb-6 relative w-full">
          <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
            Items per page
          </label>
          <div
            onClick={() => setOpen(!open)}
            className="w-full border border-[#CCCCCC] rounded-md px-3 py-2 text-sm cursor-pointer flex justify-between items-center bg-white"
          >
            {selected}
            <span className="ml-2 text-gray-500">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="absolute z-10 mt-1 w-full border border-[#CCCCCC] rounded-md bg-white shadow-lg">
              {options.map((opt, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                    selected === opt ? "bg-gray-50 font-medium" : ""
                  }`}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="bg-[#0D47A1] text-white px-6 py-2 rounded-md text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;