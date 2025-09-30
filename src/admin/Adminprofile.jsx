// src/components/Adminprofile.jsx
import React from "react";

const Adminprofile = () => {
  return (
    <div className="w-[100%]  bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      
      {/* Photo Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Photo</h3>
        <div className="flex items-center space-x-4">
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Pick Files
            </button>
            <div className="mt-2">
              <button className="text-gray-600 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">
                Drop Files here
              </button>
              <button className="text-gray-600 px-4 py-2 ml-2 border border-gray-300 rounded hover:bg-gray-100">
                Remove
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Only PNG, GIF, JPEG, and TIFF files are accepted.
            </p>
          </div>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name *</label>
          <input
            type="text"
            value="UBK Towing"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value="35 king St"
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value="ali@gmail.com"
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />
      </div>

      {/* Fuel Economy Units */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Select how you want to view fuel economy values throughout Fleetio, and volume units in the Fuel History summary. *
        </label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center text-sm">
            <input
              type="radio"
              name="fuelUnit"
              className="mr-2"
              defaultChecked
            />
            mpg (US) : g/hr (US) : Gallons (US)
          </label>
          <label className="flex items-center text-sm">
            <input type="radio" name="fuelUnit" className="mr-2" />
            mpg (UK) : g/hr (UK) : Gallons (UK)
          </label>
          <label className="flex items-center text-sm">
            <input type="radio" name="fuelUnit" className="mr-2" />
            L/100km : L/100hr : Liters
          </label>
          <label className="flex items-center text-sm">
            <input type="radio" name="fuelUnit" className="mr-2" />
            km/L : L/hr : Liters
          </label>
        </div>
      </div>

      {/* Items per Page */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Items per page</label>
        <select className="mt-1 p-2 w-full border border-gray-300 rounded">
          <option>Please Select</option>
        </select>
      </div>
    </div>
  );
};

export default Adminprofile;