import React, { useState } from "react";

const Userprofile = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Please Select");
  const options = ["10", "25", "50", "100"];

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div className="bg-white px-6 py-8 rounded-2xl shadow-sm">
        {/* Title */}
        <p className="font-semibold text-[24px] mb-6">User Profile</p>

        {/* Photo Section */}
        <p className="font-medium text-[16px] text-[#333333CC] mb-2">Photo</p>
        <div className=" items-center gap-4 mb-6">
          <img
            src="https://via.placeholder.com/100" // Replace with uploaded image
            alt="profile"
            className="w-[80px] h-[80px] mb-4 rounded-full border"
          />
          <div className="flex items-center gap-2">
            <button className="bg-[#0D47A1] text-white px-4 py-2 rounded-md text-sm">
              Pick Files
            </button>
            <div className="border border-dashed rounded-md px-6 py-2 text-gray-400 text-sm cursor-pointer">
              Drop Files here
            </div>
            <button className="border px-4 py-2 rounded-md text-sm">
              Remove
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Only PNG, GIF, JPG, and Tiff files are accepted.
        </p>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="UBK Towing"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              placeholder="35 king St"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="ali@gmail.com"
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
        </div>

        {/* Radio Buttons Section */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">
            Select how you want to view fuel economy values throughout Fleetio,
            and volume units in the Fuel History summary.{" "}
            <span className="text-red-500">*</span>
          </p>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="units" className="accent-blue-600" />
              mpg (US) · g/hr (US) · Gallons (US)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="units" className="accent-blue-600" />
              mpg (UK) · g/hr (UK) · Gallons (UK)
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="units" className="accent-blue-600" />
              L/100km · L/100hr · Liters
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="units" className="accent-blue-600" />
              km/L · L/hr · Liters
            </label>
          </div>
        </div>

        {/* Custom Dropdown */}
        <div className="mb-6 relative w-[100%]">
          <label className="block text-sm font-medium mb-1">
            Items per page
          </label>
          <div
            onClick={() => setOpen(!open)}
            className="w-full border rounded-md px-3 py-2 text-sm cursor-pointer flex justify-between items-center bg-white"
          >
            {selected}
            <span className="ml-2 text-gray-500">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="absolute z-10 mt-1 w-full border rounded-md bg-white shadow-lg">
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
