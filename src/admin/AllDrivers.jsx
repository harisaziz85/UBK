import React, { useState, useEffect } from "react";
import { Mail, MessageSquare, Phone, Search } from "lucide-react"; // Icons
import { IoMdAdd } from "react-icons/io";
import { CgProfile } from "react-icons/cg"; // Profile icon
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllDrivers = () => {
  const [selected, setSelected] = useState([]);
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch drivers from API
  useEffect(() => {
    const fetchDrivers = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

      if (!token) {
        setError("You are not logged in. Please log in to view drivers.");
        setLoading(false);
        toast.error("Please log in to access this page.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
        return;
      }

      try {
        const response = await fetch(
          "https://ubktowingbackend-production.up.railway.app/api/admin/driver/get?page=1&limit=10",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Invalid or expired token. Please log in again.");
          }
          throw new Error("Failed to fetch drivers");
        }

        const data = await response.json();

        // Map API response to match the component's expected driver structure
        const mappedDrivers = data.drivers.map((driver) => ({
          id: driver._id,
          name: driver.name || "Unknown",
          email: driver.email || "N/A",
          country: driver.address?.country || "N/A",
          createdOn: new Date(driver.createdAt).toLocaleDateString("en-US") || "N/A",
          employeeNumber: driver.employeeNumber || "N/A",
          image: driver.profileImage || "", // Empty string if no profileImage
          schedule: {
            Monday: driver.weekdays?.Monday || "OFF",
            Tuesday: driver.weekdays?.Tuesday || "OFF",
            Wednesday: driver.weekdays?.Wednesday || "OFF",
            Thursday: driver.weekdays?.Thursday || "OFF",
            Friday: driver.weekdays?.Friday || "OFF",
            Saturday: driver.weekdays?.Saturday || "OFF",
            Sunday: driver.weekdays?.Sunday || "OFF",
          },
        }));

        setDrivers(mappedDrivers);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        if (err.message.includes("Unauthorized")) {
          setTimeout(() => navigate("/login"), 3000); // Redirect to login if unauthorized
        }
      }
    };

    fetchDrivers();
  }, [navigate]);

  // Toggle single checkbox
  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const handleSelectAll = () => {
    if (selected.length === drivers.length) {
      setSelected([]);
    } else {
      setSelected(drivers.map((d) => d.id));
    }
  };

  // Navigate to driver details page
  const handleRowClick = (id) => {
    navigate(`/admin/driver/details/${id}`);
  };

  // Filtered drivers by search
  const filteredDrivers = drivers.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.email.toLowerCase().includes(search.toLowerCase()) ||
      d.country.toLowerCase().includes(search.toLowerCase())
  );

  // Shimmer component for loading state
  const ShimmerRow = () => (
    <tr className="border-b border-[#E6E6E6]">
      <td className="px-3 py-2 text-center">
        <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      <td className="flex items-center gap-3 px-3 py-2">
        <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
      </td>
      {[...Array(7)].map((_, i) => (
        <td key={i} className="px-3 py-2 text-center">
          <div className="w-16 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
        </td>
      ))}
      <td className="px-3 py-2 text-center">
        <div className="w-12 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-3 py-2 text-center">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-3 py-2 text-center">
        <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-3 py-2 text-center">
        <div className="w-24 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
      </td>
      <td className="px-3 py-2 text-center">
        <div className="flex gap-3 justify-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-5 h-5 bg-gray-200 animate-pulse rounded-full" />
          ))}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-4 text-[12px] space-y-4">
      {/* Top Bar with Search + Add Button */}
      <div className="flex items-center justify-between">
        <p className="robotosemibold text-[24px]">Drivers</p>
        <button
          onClick={() => navigate("/admin/add-drivers")} // Navigate to /admin/add-drivers
          className="bg-[#043677] h-[40px] px-4 py-2 flex gap-2 items-center justify-center text-white rounded-md text-sm robotomedium hover:bg-[#032c5a] cursor-pointer transition"
        >
          <IoMdAdd className="text-white" /> Add Driver
        </button>
      </div>
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative w-1/4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search drivers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[40px] rounded-[52px] pr-3 py-2 w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        {loading ? (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-[#04367714] text-black text-sm robotomedium">
              <tr>
                <th className="px-3 py-2 text-center">
                  <div className="w-4 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                </th>
                <th className="px-3 py-2 text-left">
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded" />
                </th>
                {[...Array(7)].map((_, i) => (
                  <th key={i} className="px-3 py-2">
                    <div className="w-16 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                  </th>
                ))}
                <th className="px-3 py-2">
                  <div className="w-12 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                </th>
                <th className="px-3 py-2">
                  <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                </th>
                <th className="px-3 py-2">
                  <div className="w-20 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                </th>
                <th className="px-3 py-2">
                  <div className="w-24 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                </th>
                <th className="px-3 py-2">
                  <div className="w-16 h-4 bg-gray-200 animate-pulse rounded mx-auto" />
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <ShimmerRow key={i} />
              ))}
            </tbody>
          </table>
        ) : error ? (
          <p className="text-center py-6 text-red-500">Error: {error}</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            {/* Header */}
            <thead className="bg-[#04367714] text-black text-sm robotomedium">
              <tr>
                <th className="px-3 py-2 text-center">
                  <input
                    type="checkbox"
                    checked={selected.length === filteredDrivers.length && filteredDrivers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2">Monday</th>
                <th className="px-3 py-2">Tuesday</th>
                <th className="px-3 py-2">Wednesday</th>
                <th className="px-3 py-2">Thursday</th>
                <th className="px-3 py-2">Friday</th>
                <th className="px-3 py-2">Saturday</th>
                <th className="px-3 py-2">Sunday</th>
                <th className="px-3 py-2">Country</th>
                <th className="px-3 py-2">Created On</th>
                <th className="px-3 py-2">Employee Number</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>

            {/* Body */}
            <tbody className="text-gray-800 robotoregular">
              {filteredDrivers.map((driver) => (
                <tr
                  key={driver.id}
                  className="border-b last:border-b-0 border-[#E6E6E6] hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => handleRowClick(driver.id)} // Add onClick to navigate to driver details
                >
                  {/* Checkbox */}
                  <td className="px-3 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(driver.id)}
                      onChange={(e) => {
                        e.stopPropagation(); // Prevent row click when clicking checkbox
                        handleCheckboxChange(driver.id);
                      }}
                    />
                  </td>

                  {/* Name with image or icon */}
                <td className="flex items-center gap-3 px-3 py-2">
  <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full overflow-hidden border border-gray-300">
    {driver.image ? (
      <img
        src={driver.image}
        alt={driver.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <CgProfile className="w-8 h-8 text-gray-500" />
      </div>
    )}
  </div>
  <span className="truncate max-w-[150px]">{driver.name}</span>
</td>


                  {/* Schedule */}
                  <td className="px-3 py-2 text-center">{driver.schedule.Monday}</td>
                  <td className="px-3 py-2 text-center">{driver.schedule.Tuesday}</td>
                  <td className="px-3 py-2 text-center">{driver.schedule.Wednesday}</td>
                  <td className="px-3 py-2 text-center">{driver.schedule.Thursday}</td>
                  <td className="px-3 py-2 text-center">{driver.schedule.Friday}</td>
                  <td className="px-3 py-2 text-center">{driver.schedule.Saturday}</td>
                  <td className="px-3 py-2 text-center">{driver.schedule.Sunday}</td>

                  {/* Extra Info */}
                  <td className="px-3 py-2 text-center">{driver.country}</td>
                  <td className="px-3 py-2 text-center">{driver.createdOn}</td>
                  <td className="px-3 py-2 text-center">{driver.employeeNumber}</td>
                  <td className="px-3 py-2 text-[#043677] robotomedium">
                    {driver.email}
                  </td>

                  {/* Actions */}
                  <td
                    className="flex gap-3 justify-center px-3 py-2"
                    onClick={(e) => e.stopPropagation()} // Prevent row click when clicking action icons
                  >
                    <Phone className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
                    <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
                    <Mail className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
                  </td>
                </tr>
              ))}

              {filteredDrivers.length === 0 && (
                <tr>
                  <td
                    colSpan="14"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No drivers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllDrivers;