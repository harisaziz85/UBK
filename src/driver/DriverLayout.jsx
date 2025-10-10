import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaHistory, FaClipboardCheck, FaCar, FaFileAlt, FaCog, FaSignOutAlt, FaUser, FaLock } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { LiaUserCircleSolid } from "react-icons/lia";
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VehicleDropdown = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "vehiclelist", label: "Vehicle List", path: "/vehiclelist" },
    // { value: "meterhistory", label: "Meter History", path: "/meterhistory" },
    // { value: "vehicleassignment", label: "Vehicle Assignment", path: "/vehicleassignment" }
  ];

  return (
    <div className="relative">
            <ToastContainer/>

      <NavLink
        to="/vehiclelist"
        className={({ isActive }) =>
          `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium cursor-pointer ${
            isActive ? 'bg-white text-black rounded' : 'text-white'
          }`
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaCar className="w-5 h-5" />
        <span>Vehicles</span>
        <MdKeyboardArrowDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </NavLink>
      {isOpen && (
        <div className="mt-2 bg-white text-black rounded-md shadow-lg z-10">
          {options.map(option => (
            <NavLink
              key={option.value}
              to={option.path}
              className={({ isActive }) =>
                `block px-12 py-2 text-sm ${isActive ? 'bg-gray-200 text-black' : 'hover:bg-gray-100'}`
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

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayName = user?.name || "Test";
  const profileImage = user?.profileImage;
  const firstInitial = displayName.charAt(0).toUpperCase();

  const renderAvatar = () => {
    if (profileImage) {
      return (
        <img
          src={profileImage}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      );
    }
    return (
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center border border-gray-300">
        <span className="text-sm font-medium text-gray-600">{firstInitial}</span>
      </div>
    );
  };

  return (
    <div className="relative">
      <div
        className={`${
          isMobile
            ? "cursor-pointer hover:opacity-80"
            : "cursor-default"
        }`}
        onClick={isMobile ? () => setIsOpen(!isOpen) : undefined}
        onMouseEnter={!isMobile ? () => setIsOpen(true) : undefined}
        onMouseLeave={!isMobile ? () => setIsOpen(false) : undefined}
      >
        <div className="cursor-pointer hover:opacity-80">
          {renderAvatar()}
        </div>
        {isOpen && (
          <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg z-10 w-48 border border-gray-300">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {renderAvatar()}
                <span className="text-sm font-medium text-gray-800">{displayName}</span>
              </div>
            </div>
            <div>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 border-b border-gray-200 ${
                    isActive ? 'bg-gray-100 text-black' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaUser className="w-4 h-4 text-gray-500" />
                <span>User Profile</span>
              </NavLink>
              <NavLink
                to="/updatepassword"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 ${
                    isActive ? 'bg-gray-100 text-black' : 'text-gray-700'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <FaLock className="w-4 h-4 text-gray-500" />
                <span>Login & Password</span>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const DriverLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const response = await fetch(`${baseUrl}/common/profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [baseUrl]);

  const handleLogout = (e) => {
    e.preventDefault();
    confirmAlert({
      title: 'Confirm to logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            localStorage.removeItem('authToken');
            toast.success('Logged out successfully');
            setIsOpen(false);
           setTimeout(() => {
            navigate('/login');
          }, 3000)
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div className="flex min-h-screen">
              <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 md:w-[280px] bg-[#043677] h-[100vh] text-white p-4 z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <h2 className="text-[14px] robotomedium mb-6">Driver Panel</h2>
        <nav className="flex flex-col gap-5 flex-1">
         <NavLink
  to="/driverdashboard"
  className={({ isActive }) =>
    `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
      isActive ? 'bg-white text-black rounded' : 'text-white'
    }`
  }
  onClick={() => setIsOpen(false)}
>
  {({ isActive }) => (
    <>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.3333 7.39102V4.02435C18.3333 2.69935 17.8 2.16602 16.475 2.16602H13.1083C11.7833 2.16602 11.25 2.69935 11.25 4.02435V7.39102C11.25 8.71602 11.7833 9.24935 13.1083 9.24935H16.475C17.8 9.24935 18.3333 8.71602 18.3333 7.39102Z"
          stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.74984 7.59935V3.81602C8.74984 2.64102 8.2165 2.16602 6.8915 2.16602H3.52484C2.19984 2.16602 1.6665 2.64102 1.6665 3.81602V7.59102C1.6665 8.77435 2.19984 9.24102 3.52484 9.24102H6.8915C8.2165 9.24935 8.74984 8.77435 8.74984 7.59935Z"
          stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.74984 16.975V13.6083C8.74984 12.2833 8.2165 11.75 6.8915 11.75H3.52484C2.19984 11.75 1.6665 12.2833 1.6665 13.6083V16.975C1.6665 18.3 2.19984 18.8333 3.52484 18.8333H6.8915C8.2165 18.8333 8.74984 18.3 8.74984 16.975Z"
          stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.5 13.416H17.5" stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12.5 16.75H17.5" stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      Dashboard
    </>
  )}
</NavLink>
       <NavLink
  to="/tripinspection"
  className={({ isActive }) =>
    `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
      isActive ? 'bg-white text-black rounded' : 'text-white'
    }`
  }
  onClick={() => setIsOpen(false)}
>
  {({ isActive }) => (
    <>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.66797 2.1665V4.6665" stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.332 2.1665V4.6665" stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.91797 8.0752H17.0846" stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18.3346 16.3333C18.3346 16.9583 18.1596 17.55 17.8513 18.05C17.2763 19.0167 16.218 19.6667 15.0013 19.6667C14.1596 19.6667 13.393 19.3583 12.8096 18.8333C12.5513 18.6167 12.3263 18.35 12.1513 18.05C11.843 17.55 11.668 16.9583 11.668 16.3333C11.668 14.4917 13.1596 13 15.0013 13C16.0013 13 16.893 13.4417 17.5013 14.1333C18.018 14.725 18.3346 15.4917 18.3346 16.3333Z"
          stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13.7031 16.3333L14.5281 17.1583L16.3031 15.5166" stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17.5 7.58317V14.1332C16.8917 13.4415 16 12.9998 15 12.9998C13.1583 12.9998 11.6667 14.4915 11.6667 16.3332C11.6667 16.9582 11.8417 17.5498 12.15 18.0498C12.325 18.3498 12.55 18.6165 12.8083 18.8332H6.66667C3.75 18.8332 2.5 17.1665 2.5 14.6665V7.58317C2.5 5.08317 3.75 3.4165 6.66667 3.4165H13.3333C16.25 3.4165 17.5 5.08317 17.5 7.58317Z"
          stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.99803 11.9167H10.0055" stroke={isActive ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.91209 11.9167H6.91957" stroke={isActive ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.91209 14.4167H6.91957" stroke={isActive ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
       Pre Trip Inspection
    </>
  )}
</NavLink>
         <NavLink
  to="/form"
  className={({ isActive }) =>
    `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${
      isActive ? 'bg-white text-black rounded' : 'text-white'
    }`
  }
  onClick={() => setIsOpen(false)}
>
  {({ isActive }) => (
    <>
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.66797 14L1.66797 7C1.66797 5.59987 1.66797 4.8998 1.94045 4.36502C2.18014 3.89462 2.56259 3.51217 3.03299 3.27248C3.56777 3 4.26784 3 5.66797 3L14.3346 3C15.7348 3 16.4348 3 16.9696 3.27248C17.44 3.51217 17.8225 3.89462 18.0622 4.36502C18.3346 4.8998 18.3346 5.59987 18.3346 7V14M1.66797 14C1.66797 15.4001 1.66797 16.1002 1.94045 16.635C2.18014 17.1054 2.56259 17.4878 3.03299 17.7275C3.56777 18 4.26784 18 5.66797 18H14.3346C15.7348 18 16.4348 18 16.9696 17.7275C17.44 17.4878 17.8225 17.1054 18.0622 16.635C18.3346 16.1002 18.3346 15.4001 18.3346 14M1.66797 14L1.66797 8H18.3346V14"
          stroke={isActive ? 'black' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Forms
    </>
  )}
</NavLink>

          {/* <NavLink
            to="/truckdocuments"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt className="w-5 h-5" /> Truck Documents
          </NavLink> */}

          <VehicleDropdown setSidebarOpen={setIsOpen} />
          <div className="mt-auto">
            <NavLink
              to="/updatepassword"
              className={({ isActive }) =>
                `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="w-5 h-5" /> Settings
            </NavLink>

            <div
              className="flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="w-5 h-5" /> Logout
            </div>
            
          </div>
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Content Area */}
      <div className="flex-1 flex flex-col md:ml-[280px]  overflow-hidden">
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
            <ProfileDropdown user={user} />
          </div>
        </header>

        <main className=" p-4 sm:p-6 flex-1 bg-gray-100 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DriverLayout;