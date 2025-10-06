import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

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
        <h2 className="text-lg font-semibold">Forms</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-8 border border-gray-300 rounded"
          />
          <FaSearch className="absolute left-2 top-2 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Table Header */}
        <div className="bg-[#04367714] text-black robotomedium text-[14px] font-medium grid grid-cols-5 items-center py-3 px-4">
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
            <div className="text-center py-6 text-gray-500 text-[14px]">
              Loading forms...
            </div>
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
