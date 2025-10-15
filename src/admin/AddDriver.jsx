import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const AddDriver = () => {
  const location = useLocation();
  const params = useParams();
  const id = params.id;
  const isEdit = !!id;
  const [file, setFile] = useState(null);
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    homePhone: "",
    address: {
      street: "",  // Added for completeAddress mapping
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    dob: "",
    employeeNumber: "",
    startDate: "",
    leaveDate: "",  // ✅ Added
    jobTitle: "",   // ✅ Added
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
  const [accessPermissions, setAccessPermissions] = useState({  // ✅ Added for accessType
    view: false,
    upload: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch driver data if editing
  useEffect(() => {
    const fetchDriver = async () => {
      if (isEdit && id) {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("You are not logged in. Please log in.", {
            position: "top-right",
            autoClose: 3000,
          });
          setTimeout(() => navigate("/login"), 3000);
          return;
        }

        try {
          const response = await fetch(
            `https://ubktowingbackend-production.up.railway.app/api/admin/driver/get-by/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch driver: ${response.status}`);
          }

          const data = await response.json();
          if (!data.driver) {
            throw new Error("No driver data returned");
          }

          setDriverData(data.driver);

          const nameParts = data.driver.name ? data.driver.name.split(' ') : ['', ''];
          const weekdaysState = {
            Monday: data.driver.weekdays?.Monday || "",
            Tuesday: data.driver.weekdays?.Tuesday || "",
            Wednesday: data.driver.weekdays?.Wednesday || "",
            Thursday: data.driver.weekdays?.Thursday || "",
            Friday: data.driver.weekdays?.Friday || "",
            Saturday: data.driver.weekdays?.Saturday || "",
            Sunday: data.driver.weekdays?.Sunday || "",
          };
          setFormData({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(' ') || "",
            email: data.driver.email || "",
            username: data.driver.username || "",
            password: "", // Don't prefill password
            phone: data.driver.phone || "",
            homePhone: data.driver.homePhone || "",
            address: {
              street: data.driver.address?.completeAddress || "",
              city: data.driver.address?.city || "",
              state: data.driver.address?.state || "",
              zipcode: data.driver.address?.zipcode || "",
              country: data.driver.address?.country || "",
            },
            dob: data.driver.dob ? new Date(data.driver.dob).toISOString().split('T')[0] : "",
            employeeNumber: data.driver.employeeNumber || "",
            startDate: data.driver.startDate ? new Date(data.driver.startDate).toISOString().split('T')[0] : "",
            leaveDate: data.driver.leaveDate ? new Date(data.driver.leaveDate).toISOString().split('T')[0] : "",
            jobTitle: data.driver.jobTitle || "",
            licenseNo: data.driver.licenseNo || "",
            weekdays: weekdaysState,
          });

          // Set access permissions
          let view = false;
          let upload = false;
          switch (data.driver.accessType) {
            case "both":
              view = true;
              upload = true;
              break;
            case "view":
              view = true;
              break;
            case "upload":
              upload = true;
              break;
            default:
              break;
          }
          setAccessPermissions({ view, upload });
        } catch (err) {
          console.error("Error fetching driver:", err);
          toast.error(err.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDriver();
  }, [isEdit, id, navigate]);

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

  // ✅ Added handler for access permissions checkboxes
  const handleAccessChange = (e) => {
    const { name, checked } = e.target;
    setAccessPermissions({
      ...accessPermissions,
      [name]: checked,
    });
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

    // ✅ Derive accessType from checkboxes
    let accessType = "none";
    if (accessPermissions.view && accessPermissions.upload) {
      accessType = "both";
    } else if (accessPermissions.view) {
      accessType = "view";
    } else if (accessPermissions.upload) {
      accessType = "upload";
    }

    const apiData = new FormData();
    if (file) {
      apiData.append("profileImage", file);
    }
    apiData.append("name", `${formData.firstName} ${formData.lastName}`.trim());
    apiData.append("username", formData.username);
    apiData.append("email", formData.email);
    apiData.append("phone", formData.phone);
    apiData.append("homePhone", formData.homePhone);
    // ✅ Address: Map street to completeAddress, others as-is
    apiData.append("address[completeAddress]", formData.address.street || "");
    apiData.append("address[city]", formData.address.city);
    apiData.append("address[state]", formData.address.state);
    apiData.append("address[zipcode]", formData.address.zipcode);
    apiData.append("address[country]", formData.address.country);
    apiData.append("dob", formData.dob);
    apiData.append("employeeNumber", formData.employeeNumber);
    apiData.append("startDate", formData.startDate);
    apiData.append("leaveDate", formData.leaveDate || "");  // ✅ Added
    apiData.append("licenseNo", formData.licenseNo);
    apiData.append("jobTitle", formData.jobTitle || "");    // ✅ Added
    apiData.append("accessType", accessType);               // ✅ Added

    // Handle password
    if (formData.password) {
      apiData.append("password", formData.password);
    }

    // Weekdays
    Object.keys(formData.weekdays).forEach((day) => {
      if (formData.weekdays[day].trim()) {
        apiData.append(`weekdays[${day}]`, formData.weekdays[day]);
      }
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      let response;
      if (isEdit) {
        if (!id) {
          throw new Error("Driver ID not provided for update");
        }
        const url = `https://ubktowingbackend-production.up.railway.app/api/admin/driver/update/${id}`;
        response = await axios.put(url, apiData, config);
        toast.success("Driver updated successfully! Redirecting...", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => navigate(`/admin/dashboard`), 2000); // or to driver list/details
      } else {
        // Validate password for new driver
        if (!formData.password) {
          throw new Error("Password is required for new drivers");
        }
        const url = "https://ubktowingbackend-production.up.railway.app/api/admin/driver/create";
        response = await axios.post(url, apiData, config);

        // Generate QR for the new driver
        const qrData = {
          driverId: response.data._id,
          expiresInSeconds: 120
        };
        await axios.post(
          "https://ubktowingbackend-production.up.railway.app/api/common/qr/generate",
          qrData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        toast.success("Driver added and QR generated successfully! Redirecting...", {
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
            street: "",  // ✅ Added
            city: "",
            state: "",
            zipcode: "",
            country: "",
          },
          dob: "",
          employeeNumber: "",
          startDate: "",
          leaveDate: "",  // ✅ Added
          jobTitle: "",   // ✅ Added
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
        setAccessPermissions({ view: false, upload: false });  // ✅ Added
        setFile(null);

        // Redirect to AllDrivers page
        setTimeout(() => navigate("/admin/dashboard"), 2000);
      }
    } catch (err) {
      console.error("Driver operation error:", err);
      toast.error(err.response?.data?.message || (isEdit ? "Failed to update driver." : "Failed to add driver."), {
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

  if (loading) {
    return <div className="p-6 min-h-screen flex items-center justify-center">Loading driver data...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="rounded-lg p-6 space-y-8">
        <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Driver' : 'Add Driver'}</h1>
        <form onSubmit={handleSubmit}>
          {/* Basic Details */}
          <div className="bg-white p-[28px] rounded-[10px] mb-[28px]">
            <h2 className="text-[22px] robotosemibold mb-4">Basic details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[14px] robotomedium">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
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
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
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
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                  required
                />
              </div>
             <div className="md:col-span-2">
  <label className="text-[14px] robotomedium">Profile Photo</label>

  <div
    className="flex flex-col items-center justify-center border border-dashed border-[#CCCCCC] rounded-md p-4 h-[150px] text-center cursor-pointer relative overflow-hidden"
    onClick={() => document.getElementById("profileUpload").click()}
  >
    {/* Show uploaded or existing image inside the box */}
    {file || (isEdit && driverData?.profileImage) ? (
      <img
        src={file ? URL.createObjectURL(file) : driverData.profileImage}
        alt="Profile Preview"
        className="w-24 h-24 rounded-full object-cover border border-gray-300"
      />
    ) : (
      <>
        <Upload className="w-6 h-6 text-gray-500 mb-2" />
        <span className="bg-gray-100 px-3 py-1 rounded-md text-sm mb-1">
          Pick file
        </span>
        <span className="text-gray-500 text-sm">Drag file here</span>
      </>
    )}

    {/* Hidden input */}
    <input
      id="profileUpload"
      type="file"
      className="hidden"
      onChange={handleFileChange}
      accept="image/*"
    />
  </div>

  {/* Show filename */}
  {file && (
    <p className="text-sm text-gray-600 mt-1">{file.name}</p>
  )}
</div>

            </div>
          </div>

          {/* Login Information */}
          <div className="bg-white p-[28px] rounded-[10px] mb-[28px]">
            <h2 className="text-[22px] robotosemibold mb-4">Login Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-[14px] robotomedium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                  required={!isEdit}
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder={isEdit ? "Leave blank to keep current password" : "Enter password"}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                  required={!isEdit}
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white p-[28px] rounded-[10px] mb-[28px]">
            <h2 className="text-[22px] robotosemibold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[14px] robotomedium">Mobile Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Home Phone Number</label>
                <input
                  type="tel"
                  name="homePhone"
                  value={formData.homePhone}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-[14px] robotomedium">Address</label>
                <input
                  type="text"
                  name="address.street"  // Maps to completeAddress in append
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">State/Province</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Zip Code</label>
                <input
                  type="text"
                  name="address.zipcode"
                  value={formData.address.zipcode}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium">Country</label>
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Personal Details */}
          <div className="bg-white p-[28px] rounded-[10px] mb-[28px]">
            <h2 className="text-[22px] robotosemibold mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[14px] robotomedium">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium block">DOB</label>
                <label className="relative block w-full border border-[#CCCCCC] rounded-md h-[42px] cursor-pointer">
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full h-full px-3 bg-transparent focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                    required={!isEdit}
                  />
                </label>
              </div>
              <div>
                <label className="text-[14px] robotomedium">Employee Number</label>
                <input
                  type="text"
                  name="employeeNumber"
                  value={formData.employeeNumber}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                  required={!isEdit}
                />
              </div>
              <div>
                <label className="text-[14px] robotomedium block">Start Date</label>
                <label className="relative block w-full border border-[#CCCCCC] rounded-md h-[42px] cursor-pointer">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full h-full px-3 bg-transparent focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                    required={!isEdit}
                  />
                </label>
              </div>
              <div>
                <label className="text-[14px] robotomedium block">Leave Date</label>
                <label className="relative block w-full border border-[#CCCCCC] rounded-md h-[42px] cursor-pointer">
                  <input
                    type="date"
                    name="leaveDate"
                    value={formData.leaveDate}
                    onChange={handleInputChange}
                    className="w-full h-full px-3 bg-transparent focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                  />
                </label>
              </div>
              <div>
                <label className="text-[14px] robotomedium">License Number</label>
                <input
                  type="text"
                  name="licenseNo"
                  value={formData.licenseNo}
                  onChange={handleInputChange}
                  className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 focus:outline-none focus:ring-0"
                  required={!isEdit}
                />
              </div>
            </div>
          </div>

          {/* Document Access Permissions */}
          <div className="bg-white p-[28px] rounded-[10px] mb-[28px]">
            <h2 className="text-[22px] robotosemibold mb-4">Document Access Permissions</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  name="view"  // ✅ Added
                  checked={accessPermissions.view}  // ✅ Added
                  onChange={handleAccessChange}  // ✅ Added
                  className="w-4 h-4" 
                />
                <span className="text-[14px] robotomedium">
                  Allow driver to view vehicle documents
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  name="upload"  // ✅ Added
                  checked={accessPermissions.upload}  // ✅ Added
                  onChange={handleAccessChange}  // ✅ Added
                  className="w-4 h-4" 
                />
                <span className="text-[14px] robotomedium">
                  Allow driver to upload vehicle documents
                </span>
              </label>
            </div>
          </div>

          {/* Custom Fields */}
          <div className="bg-white p-[28px] rounded-[10px] mb-[28px]">
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
                    className="w-full border border-[#CCCCCC] rounded-md h-[42px] px-3 bg-white focus:outline-none focus:ring-0 appearance-none cursor-pointer"
                  >
                    <option value="Off">Off</option>
                    <option value="Custom">On</option>
                  </select>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={isSubmitting || loading}
              className="bg-[#043677] text-white px-6 py-2 rounded-md text-sm robotomedium hover:bg-[#032c5a] transition disabled:opacity-50"
            >
              {isSubmitting ? (isEdit ? "Updating Driver..." : "Adding Driver...") : (isEdit ? "Update Driver" : "Add Driver")}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddDriver;