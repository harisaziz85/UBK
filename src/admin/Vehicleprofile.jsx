import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";

const Vehicleprofile = () => {
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      } else {
        console.log("Please drop an image file.");
      }
    }
  };

  // Handle drag over
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  // Handle drag leave
  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  // Handle file input change
  const handleFileInput = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      } else {
        console.log("Please select an image file.");
      }
    }
  };

  // Handle image click to replace
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">FD-37481</h1>
        <p className="text-gray-600">
          GMC • 2010 • TY-889 • 13133 Km •{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            John Doe EMP112233
          </span>
        </p>
      </div>

      {/* Overview Tabs */}
      <div className="flex space-x-6 border-b border-gray-200 mb-6">
        <button className="pb-2 border-b-2 border-blue-600 text-blue-600 font-medium">
          Overview
        </button>
        <button className="pb-2 text-gray-500 hover:text-gray-700">
          Inspection History
        </button>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Details Card */}
        <div className="bg-white shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
            <p className="font-medium">Name</p>
            <p>FD-37481</p>

            <p className="font-medium">Status</p>
            <p className="text-green-600">● Assigned</p>

            <p className="font-medium">Meter</p>
            <p>13133 Km</p>

            <p className="font-medium">Operator</p>
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/32"
                alt="operator"
                className="w-8 h-8 rounded-full"
              />
              <p>John Doe EMP112233</p>
            </div>

            <p className="font-medium">Type</p>
            <p>WL</p>

            <p className="font-medium">Fuel Type</p>
            <p>Gasoline</p>

            <p className="font-medium">VIN/SN</p>
            <div className="flex items-center space-x-2">
              <span>2131454545451</span>
              <button className="text-blue-600 hover:underline text-sm">
                Decode VIN
              </button>
            </div>

            <p className="font-medium">License Plate</p>
            <p>254654</p>

            <p className="font-medium">Year</p>
            <p>2010</p>

            <p className="font-medium">Make</p>
            <p>GMC</p>

            <p className="font-medium">Model</p>
            <p>Sierra 64672576</p>

            <p className="font-medium">Registration State/Province</p>
            <p>Ontario</p>

            <p className="font-medium">Color</p>
            <p>White</p>

            <p className="font-medium">Ownership</p>
            <p>Owned</p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Documents</h2>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search files"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Static PDF List */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-lg flex flex-col items-center justify-center py-6 hover:shadow-sm transition"
              >
                <FaFilePdf className="text-red-500 text-4xl mb-2" />
                <p className="text-sm text-gray-700">Inspection{i}.pdf</p>
              </div>
            ))}
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg py-8 text-center text-sm ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {previewImage ? (
              <div className="relative">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg cursor-pointer"
                  onClick={handleImageClick}
                />
              </div>
            ) : (
              <>
                <p>Drag and drop files to upload</p>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInput}
                />
                <button
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Browse Files
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicleprofile;