import React, { useState } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const AddDriver = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    homePhone: "",
    address: {
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    dob: "",
    employeeNumber: "",
    startDate: "",
    licenseNo: "",
    weekdays: {
      Monday: "",
      Tuesday: "",
      Wednesday: "",
      Thursday: "",
      Friday: "",
      Saturday: "",
      Sunday: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [field]: value },
      });
    } else if (name.includes("weekdays.")) {
      const day = name.split(".")[1];
      setFormData({
        ...formData,
        weekdays: { ...formData.weekdays, [day]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("You are not logged in. Please log in to add a driver.", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsSubmitting(false);
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const apiData = new FormData();
    if (file) {
      apiData.append("profileImage", file);
    }
    apiData.append("name", `${formData.firstName} ${formData.lastName}`.trim());
    apiData.append("username", formData.username);
    apiData.append("email", formData.email);
    apiData.append("password", formData.password);
    apiData.append("phone", formData.phone);
    apiData.append("homePhone", formData.homePhone);
    apiData.append("address[city]", formData.address.city);
    apiData.append("address[state]", formData.address.state);
    apiData.append("address[zipcode]", formData.address.zipcode);
    apiData.append("address[country]", formData.address.country);
    apiData.append("dob", formData.dob);
    apiData.append("employeeNumber", formData.employeeNumber);
    apiData.append("startDate", formData.startDate);
    apiData.append("licenseNo", formData.licenseNo);
    Object.keys(formData.weekdays).forEach((day) => {
      if (formData.weekdays[day]) {
        apiData.append(`weekdays[${day}]`, formData.weekdays[day]);
      }
    });

    try {
      const response = await axios.post(
        "https://ubktowingbackend-production.up.railway.app/api/admin/driver/create",
        apiData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Driver added successfully! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        phone: "",
        homePhone: "",
        address: {
          city: "",
          state: "",
          zipcode: "",
          country: "",
        },
        dob: "",
        employeeNumber: "",
        startDate: "",
        licenseNo: "",
        weekdays: {
          Monday: "",
          Tuesday: "",
          Wednesday: "",
          Thursday: "",
          Friday: "",
          Saturday: "",
          Sunday: "",
        },
      });
      setFile(null);

      // Redirect to AllDrivers page
      setTimeout(() => navigate("/admin/dashboard"), 2000);
    } catch (err) {
      console.error("Add driver error:", err);
      toast.error(err.response?.data?.message || "Failed to add driver.", {
        position: "top-right",
        autoClose: 3000,
      });
      if (err.response?.status === 401) {
        setTimeout(() => navigate("/login"), 3000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-[#f9f9f9] min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-8">
        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div>
            <h2 className="text-[22px] robotosemibold mb-4">Basic details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[14px] robotomedium">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[14px] robotomedium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[14px] robotomedium">Profile Photo</label>
                <div className="flex flex-col items-center justify-center border border-dashed border-[#333333] rounded-md p-4 h-[120px] text-center cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-500 mb-2" />
                  <label className="flex flex-col items-center cursor-pointer">
                    <span className="bg-gray-100 px-3 py-1 rounded-md text-sm mb-1">
                      Pick file
                    </span>
                    <span className="text-gray-500 text-sm">Drag file here</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                  </label>
                </div>
                {file && (
                  <p className="text-sm text-gray-600 mt-1">{file.name}</p>
                )}
              </div>
            </div>
          </div>

          {/* Login Information */}
          <div>
            <h2 className="text-[22px] robotosemibold mb-4">Login Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-[14px] robotomedium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-[22px] robotosemibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[14px] robotomedium">Mobile Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Home Phone Number</label>
                <input
                  type="tel"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[14px] robotomedium">Address</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">State/Province</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Zip Code</label>
                <input
                  type="text"
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Country</label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div>
            <h2 className="text-[22px] robotosemibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[14px] robotomedium">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">DOB</label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Employee Number</label>
                <input
                  type="text"
                  name="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Leave Date</label>
                <input
                  type="date"
                  name="leaveDate"
                  value={formData.leaveDate}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">License Number</label>
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleInputChange}
                  className="w-full border border-[#333333] rounded-md h-[42px] px-3 focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Access Permissions */}
          <div>
            <h2 className="text-[22px] robotosemibold mb-4">Document Access Permissions</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-[14px] robotomedium">
                  Allow driver to view vehicle documents
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-[14px] robotomedium">
                  Allow driver to upload vehicle documents
                </span>
              </label>
            </div>
          </div>

          {/* Custom Fields */}
          <div>
            <h2 className="text-[22px] robotosemibold mb-4">Custom Fields</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day}>
                  <label className="text-[14px] robotomedium">{day}</label>
                  <select
                    name={`weekdays.${day}`}
                    value={formData.weekdays[day]}
                    onChange={handleInputChange}
                    className="w-full border border-[#333333] rounded-md h-[42px] px-3 bg-white focus:outline-none"
                  >
                    <option value="">No option selected</option>
                    <option value="09:00 AM – 05:00 PM">09:00 AM – 05:00 PM</option>
                    <option value="10:00 AM – 06:00 PM">10:00 AM – 06:00 PM</option>
                    <option value="Off">Off</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#043677] text-white px-6 py-2 rounded-md text-sm robotomedium hover:bg-[#032c5a] transition disabled:opacity-50"
            >
              {isSubmitting ? "Adding Driver..." : "Add Driver"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddDriver;