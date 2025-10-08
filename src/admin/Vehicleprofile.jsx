import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom"; // To get vehicleId from URL

const Vehicleprofile = () => {
  const { vehicleId } = useParams(); // Get vehicleId from URL
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No authentication token found. Please log in.", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${baseUrl}/admin/vehicle/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { vehicle, inspections } = response.data;
        setVehicleData(vehicle);
        setInspections(inspections);
        toast.success("Vehicle data fetched successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch vehicle data.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleData();
  }, [vehicleId]);

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
        toast.error("Please drop an image file.", {
          position: "top-right",
          autoClose: 3000,
        });
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
        toast.error("Please select an image file.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Handle image click to replace
  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading vehicle data...</p>
      </div>
    );
  }

  if (!vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-red-600">Failed to load vehicle data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {vehicleData.name}
        </h1>
        <p className="text-gray-600">
          {vehicleData.make} • {vehicleData.year} • {vehicleData.licensePlate} •{" "}
          {vehicleData.currentMeter} Km •{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            {inspections[0]?.inspectedBy?.name || "Unassigned"} {inspections[0]?.inspectedBy?.id || ""}
          </span>
        </p>
      </div>

      {/* Overview Tabs */}
    

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Details Card */}
        <div className="bg-white shadow-sm rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Vehicle Details</h2>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
            <p className="font-medium">Name</p>
            <p>{vehicleData.name}</p>

            <p className="font-medium">Status</p>
            <p className="text-green-600">
              ● {vehicleData.assignment ? "Assigned" : "Unassigned"}
            </p>

            <p className="font-medium">Meter</p>
            <p>{vehicleData.currentMeter} Km</p>

            <p className="font-medium">Operator</p>
            <div className="flex items-center space-x-2">
              <img
                src={inspections[0]?.inspectedBy?.profileImage || "https://via.placeholder.com/32"}
                alt="operator"
                className="w-8 h-8 rounded-full"
              />
              <p>{inspections[0]?.inspectedBy?.name || "Unassigned"} {inspections[0]?.inspectedBy?.id || ""}</p>
            </div>

            <p className="font-medium">Type</p>
            <p>{vehicleData.type}</p>

            <p className="font-medium">Fuel Type</p>
            <p>{vehicleData.fuelType}</p>

            <p className="font-medium">VIN/SN</p>
            <div className="flex items-center space-x-2">
              <span>{vehicleData.vin}</span>
              <button className="text-blue-600 hover:underline text-sm">
                Decode VIN
              </button>
            </div>

            <p className="font-medium">License Plate</p>
            <p>{vehicleData.licensePlate}</p>

            <p className="font-medium">Year</p>
            <p>{vehicleData.year}</p>

            <p className="font-medium">Make</p>
            <p>{vehicleData.make}</p>

            <p className="font-medium">Model</p>
            <p>{vehicleData.model}</p>

            <p className="font-medium">Registration State/Province</p>
            <p>{vehicleData.registrationState}</p>

            <p className="font-medium">Color</p>
            <p>{vehicleData.color}</p>

            <p className="font-medium">Ownership</p>
            <p>{vehicleData.ownership}</p>
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

          {/* Dynamic Inspection List */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {inspections.map((inspection) => (
              <div
                key={inspection.inspectionId}
                className="border border-gray-200 rounded-lg flex flex-col items-center justify-center py-6 hover:shadow-sm transition"
              >
                {inspection.vehicleImage ? (
                  <>
                    <img
                      src={inspection.vehicleImage}
                      alt="Inspection"
                      className="w-12 h-12 object-cover mb-2"
                    />
                    <p className="text-sm text-gray-700">
                      Inspection {inspection.inspectionId.slice(-4)} ({inspection.inspectionStatus})
                    </p>
                  </>
                ) : (
                  <>
                    <FaFilePdf className="text-red-500 text-4xl mb-2" />
                    <p className="text-sm text-gray-700">
                      Inspection {inspection.inspectionId.slice(-4)} ({inspection.inspectionStatus})
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg py-8 text-center text-sm ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"
            }`}
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
      <ToastContainer />
    </div>
  );
};

export default Vehicleprofile;