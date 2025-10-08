import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Shimmer = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="grid grid-cols-5 items-center py-3 px-4 border-b border-gray-200"
        >
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      ))}
    </>
  );
};

const AdminForms = () => {
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [formsData, setFormsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://ubktowingbackend-production.up.railway.app/api/driver/consentForm?page=1&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFormsData(response.data.forms || []);
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedForms(formsData.map((_, index) => index));
      setSelectAll(true);
    } else {
      setSelectedForms([]);
      setSelectAll(false);
    }
  };

  const handleSelectRow = (index) => {
    const newSelectedForms = [...selectedForms];
    const selectedIndex = newSelectedForms.indexOf(index);
    if (selectedIndex === -1) {
      newSelectedForms.push(index);
    } else {
      newSelectedForms.splice(selectedIndex, 1);
    }
    setSelectedForms(newSelectedForms);
    setSelectAll(newSelectedForms.length === formsData.length);
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex justify-between items-center mb-4">
       <p className="robotosemibold text-[24px]">Forms</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Table Header */}
        <div className="bg-[#04367714] text-black robotomedium text-[14px] robotomedium grid grid-cols-5 items-center py-3 px-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-blue-600"
            />
            <span>Forms Numbers</span>
          </div>
          <span>Type</span>
          <span>Date</span>
          <span>Driver</span>
          <span>Vehicle</span>
        </div>

        {/* Table Rows */}
        <div>
          {loading ? (
            <Shimmer />
          ) : formsData.length > 0 ? (
            formsData.map((form, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50 ${
                  selectedForms.includes(index) ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedForms.includes(index)}
                    onChange={() => handleSelectRow(index)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  <span className="font-medium">
                    {form._id ? form._id.slice(-6).toUpperCase() : "—"}
                  </span>
                </div>

                <span>{form.type || "—"}</span>
                <span>
                  {form.consentDateTime
                    ? new Date(form.consentDateTime).toLocaleDateString()
                    : "—"}
                </span>
                <span>{form.towDriver?.name || "—"}</span>

                <div>
                  <img
                    src="https://via.placeholder.com/30"
                    alt="Vehicle"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500 text-[14px]">
              No forms found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminForms;