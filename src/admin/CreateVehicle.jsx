import React, { useState } from "react";
import Vehicletopbar from "./components/Vehicletopbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateVehicle = () => {
  const [formData, setFormData] = useState({
    name: "",
    vin: "",
    licensePlate: "",
    type: "",
    fuelType: "",
    year: "",
    make: "",
    model: "",
    color: "",
    ownership: "",
    registrationState: "",
    currentMilage: "",
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Authentication token missing. Please log in again.");
        setLoading(false);
        return;
      }

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (photo) data.append("photo", photo);

      const res = await axios.post(
        "https://ubktowingbackend-production.up.railway.app/api/admin/vehicle/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success("Vehicle created successfully!");
        setFormData({
          name: "",
          vin: "",
          licensePlate: "",
          type: "",
          fuelType: "",
          year: "",
          make: "",
          model: "",
          color: "",
          ownership: "",
          registrationState: "",
          currentMilage: "",
        });
        setPhoto(null);
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
      toast.error(error.response?.data?.message || "Failed to create vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <Vehicletopbar />

      <div className=" mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold mb-6">Identification</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vehicle name */}
          <div>
            <label className="block text-gray-700 mb-2">Vehicle Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              placeholder="Enter vehicle name"
              required
            />
          </div>

          {/* VIN + License */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">VIN/SN</label>
              <input
                type="text"
                name="vin"
                value={formData.vin}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter VIN"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">License Plate</label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                placeholder="Enter license plate"
              />
            </div>
          </div>

          {/* Type + Fuel */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                required
              >
                <option value="">Select type</option>
                <option value="Car">Car</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Truck">Truck</option>
                <option value="Pickup">Pickup</option>
                <option value="Bus">Bus</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Fuel Type</label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                required
              >
                <option value="">Select fuel type</option>
                <option value="Diesel">Diesel</option>
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel/Electric Hybrid">Diesel/Electric Hybrid</option>
                <option value="Flex Fuel">Flex Fuel</option>
                <option value="Plugin Hybrid">Plugin Hybrid</option>
              </select>
            </div>
          </div>

          {/* Year + Make + Model + Color */}
          <div className="grid grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Make</label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Ownership + Registration */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Ownership</label>
              <select
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
                required
              >
                <option value="">Select ownership</option>
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
                <option value="Rented">Rented</option>
                <option value="Customer">Customer</option>
                <option value="Financed">Financed</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Registration State/Province</label>
              <input
                type="text"
                name="registrationState"
                value={formData.registrationState}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Current Mileage */}
          <div>
            <label className="block text-gray-700 mb-2">Current Mileage (Km)</label>
            <input
              type="number"
              name="currentMilage"
              value={formData.currentMilage}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Photo upload */}
          <div>
            <label className="block text-gray-700 mb-2">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none"
            />
            {photo && (
              <p className="text-sm text-gray-600 mt-2">{photo.name}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#043677] text-white px-6 py-2 rounded-lg hover:bg-[#022a5e] disabled:opacity-50"
            >
              {loading ? "Saving..." : "Create Vehicle"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CreateVehicle;
