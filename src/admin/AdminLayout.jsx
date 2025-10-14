import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaCar, FaUsers, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdKeyboardArrowDown } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { LiaUserCircleSolid } from "react-icons/lia";
import { LuUserRound } from "react-icons/lu";
import { LuKeyRound } from "react-icons/lu";
import axios from 'axios';

// Admin-specific dropdown for vehicle management
const AdminVehicleDropdown = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "vehiclelist", label: "Vehicle List", path: "/admin/vehicles" },
    { value: "vehicleassignment", label: "Vehicle Assignment", path: "/admin/vehicle-assignment" },
  ];

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 text-[14px] robotomedium px-6 py-2 cursor-pointer text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaCar className="w-5 h-5" />
        <span>Vehicles</span>
        <MdKeyboardArrowDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      {isOpen && (
        <div className="mt-2 bg-white text-black rounded-md shadow-lg z-10">
          {options.map((option) => (
            <NavLink
              key={option.value}
              to={option.path}
              className={({ isActive }) =>
                `block px-12 py-2 text-sm ${isActive ? "bg-gray-200 text-black" : "hover:bg-gray-100"}`
              }
              onClick={() => {
                setIsOpen(false);
                setSidebarOpen(false);
              }}
            >
              {option.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState({ profileImage: null, name: "Super Admin" });
  const navigate = useNavigate();

  // Fetch user profile data on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://ubktowingbackend-production.up.railway.app/api/common/profile/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile({
          profileImage: response.data.user.profileImage || null,
          name: response.data.user.name || "Super Admin",
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
    setIsLogoutModalOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 md:w-[280px] bg-[#043677] h-[100vh] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-[14px] robotomedium mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-5 flex-1">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
                isActive ? "bg-white text-black rounded" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <MdOutlineDashboardCustomize className="w-5 h-5" /> Dashboard
          </NavLink>
          <NavLink
            to="/admin/doc"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
                isActive ? "bg-white text-black rounded" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt className="w-5 h-5" /> Documents
          </NavLink>
          <AdminVehicleDropdown setSidebarOpen={setIsOpen} />
          <NavLink
            to="/admin/drivers"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
                isActive ? "bg-white text-black rounded" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaUsers className="w-5 h-5" /> Drivers
          </NavLink>
          <NavLink
            to="/admin/inspectionhistory"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
                isActive ? "bg-white text-black rounded" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt className="w-5 h-5" /> Pre-Trip Inspection
          </NavLink>
          <NavLink
            to="/admin/forms"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
                isActive ? "bg-white text-black rounded" : ""
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt className="w-5 h-5" /> Forms
          </NavLink>
          <div className="mt-auto">
            <NavLink
              to="/admin/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
                  isActive ? "bg-white text-black rounded" : ""
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="w-5 h-5" /> Settings
            </NavLink>
            <div
              className="flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium cursor-pointer"
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <FaSignOutAlt className="w-5 h-5" /> Logout
            </div>
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-[280px]">
        {/* Topbar */}
        <header className="bg-white h-[72px] flex gap-4 justify-between items-center px-4 shadow border-b border-[#E5E7EB]">
          <button
            className="md:hidden text-[#043677] text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
          <h1 className="text-lg font-semibold text-[#043677]"></h1>

          <div className="flex items-center gap-4">
            <VscBell className="text-gray-500 text-xl cursor-pointer hover:text-[#043677] text-[24px]" />
            <div className="relative">
              {userProfile.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="User Profile"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                />
              ) : (
                <LiaUserCircleSolid
                  className="text-gray-500 text-xl cursor-pointer hover:text-[#043677] text-[34px]"
                  onClick={() => setIsProfileModalOpen(!isProfileModalOpen)}
                />
              )}
              {isProfileModalOpen && (
                <div className="absolute top-full right-0 mt-2 w-[259px] bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2">
                  <div className="flex items-center gap-3 p-2">
                    {userProfile.profileImage ? (
                      <img
                        src={userProfile.profileImage}
                        alt="User Profile"
                        className="w-[40px] h-[40px] rounded-full object-cover"
                      />
                    ) : (
                      <LiaUserCircleSolid className="text-gray-500 text-2xl" />
                    )}
                    <span className="robotoregular text-[16px]">{userProfile.name}</span>
                  </div>
                  <NavLink
                    to="/admin/profile"
                    className="flex items-center justify-between robotoregular text-[16px] gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsProfileModalOpen(false)}
                  >
                    User Profile
                    <LuUserRound className="text-[20px]" />
                  </NavLink>
                 
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Logout Confirmation Modal */}
        {isLogoutModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-md p-6 w-80">
              <h2 className="text-lg font-semibold text-[#043677] mb-4">Confirm Logout</h2>
              <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-end gap-4">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#043677] text-white rounded hover:bg-[#032f5e]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="p-6 flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;