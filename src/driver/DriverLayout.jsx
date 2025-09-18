import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { FaTachometerAlt, FaHistory, FaClipboardCheck, FaCar, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { VscBell } from "react-icons/vsc";
import { LiaUserCircleSolid } from "react-icons/lia";

const CustomSearchDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");

  const options = [
    { value: "all", label: "All" },
    { value: "trips", label: "Trips" },
    { value: "vehicles", label: "Vehicles" },
    { value: "documents", label: "Documents" }
  ];

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOptionLabel = options.find(opt => opt.value === selectedOption)?.label || "All";

  useEffect(() => {
    console.log("Auto-searching for:", searchQuery, "in category:", selectedOption);
  }, [searchQuery, selectedOption]);

  return (
    <div className="relative">
      <div
        className="flex items-center border border-gray-300 rounded-full px-3 py-2 me-2 bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          className="outline-none bg-transparent flex-1 placeholder-gray-500"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="mr-2 text-gray-500">{selectedOptionLabel}</span>
        <MdKeyboardArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.map(option => (
              <div
                key={option.value}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedOption(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const VehicleDropdown = ({ setSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "vehiclelist", label: "Vehicle List", path: "/vehiclelist" },
    { value: "meterhistory", label: "Meter History", path: "/meterhistory" },
    { value: "vehicleassignment", label: "Vehicle Assignment", path: "/vehicleassignment" }
  ];

  return (
    <div className="relative">
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

const DriverLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
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
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            <MdOutlineDashboardCustomize className="w-5 h-5" /> Dashboard
          </NavLink>
          <NavLink
            to="/tripinspection"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaWpforms className="w-5 h-5" /> Trip Inspection
          </NavLink>
          <NavLink
            to="/form"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaWpforms className="w-5 h-5" /> Forms
          </NavLink>
          <NavLink
            to="/truckdocuments"
            className={({ isActive }) =>
              `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            <FaFileAlt className="w-5 h-5" /> Truck Documents
          </NavLink>
          <VehicleDropdown setSidebarOpen={setIsOpen} />
          <div className="mt-auto">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaCog className="w-5 h-5" /> Settings
            </NavLink>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `flex items-center gap-2 text-[14px] robotomedium px-6 py-2 robotomedium ${isActive ? 'bg-white text-black rounded' : ''}`
              }
              onClick={() => setIsOpen(false)}
            >
              <FaSignOutAlt className="w-5 h-5" /> Logout
            </NavLink>
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

          <div className="hidden md:flex items-center gap-4">
            <CustomSearchDropdown />
            <VscBell className="text-gray-500 text-xl cursor-pointer hover:text-[#043677] text-[24px]" />
            <LiaUserCircleSolid className="text-gray-500 text-xl cursor-pointer hover:text-[#043677] text-[34px]" />
          </div>
        </header>

        <main className="p-6 flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DriverLayout;