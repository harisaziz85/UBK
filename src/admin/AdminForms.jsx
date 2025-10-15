import React, { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DownloadPdf from "./Donwloadpdf/Downloadpdf";

const Shimmer = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-6 items-center py-3 px-4 border-b border-gray-200"
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 w-10 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse"></div>
      </div>
    ))}
  </>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const AdminForms = () => {
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [formsData, setFormsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadForm, setDownloadForm] = useState(null); // ✅ Track selected form for PDF download
  const navigate = useNavigate();

  const fetchForms = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://ubktowingbackend-production.up.railway.app/api/driver/consentForm?page=1&limit=10",
        { headers: { Authorization: `Bearer ${token}` } }
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
    if (selectedIndex === -1) newSelectedForms.push(index);
    else newSelectedForms.splice(selectedIndex, 1);
    setSelectedForms(newSelectedForms);
    setSelectAll(newSelectedForms.length === formsData.length);
  };

  return (
    <div className="p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <p className="robotosemibold text-[24px]">Forms</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-[#04367714] text-black robotomedium text-[14px] grid grid-cols-6 items-center py-3 px-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              className="w-4 h-4 accent-blue-600"
            />
            <span>Form Number</span>
          </div>
          <span>Type</span>
          <span>Date</span>
          <span>Driver</span>
          <span>Vehicle Info</span>
          <span>Actions</span>
        </div>

        {/* Rows */}
        <div>
          {loading ? (
            <Shimmer />
          ) : formsData.length > 0 ? (
            formsData.map((form, index) => (
              <div
                key={index}
                     onClick={() => navigate(`/admin/form-details/${form._id}`)}
                className={` cursor-pointer grid grid-cols-6 items-center text-[14px] py-3 px-4 border-b border-gray-200 hover:bg-gray-50 ${
                  selectedForms.includes(index) ? "bg-blue-50" : ""
                }`}
              >
                {/* Checkbox + ID */}
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

                {/* Type */}
                <span>{form.type || "—"}</span>

                {/* Date */}
                <span>
                  {form.consentDateTime
                    ? new Date(form.consentDateTime).toLocaleDateString()
                    : "—"}
                </span>

                {/* Driver */}
                <span>{form.towDriver?.name || "—"}</span>

                {/* Vehicle */}
                <div className="flex items-center gap-3">
                  <img
                    src={
                      form.vehicle?.vehicleId?.photo ||
                      "https://via.placeholder.com/40"
                    }
                    alt="Vehicle"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div className="flex flex-col text-[13px]">
                    <span className="font-medium">{form.vehicle?.plate}</span>
                  </div>
                </div>

                {/* Download Button */}
                <div 
                className="flex justify-start cursor-pointer"
                 onClick={(e) => e.stopPropagation()} // ✅ prevent navigation
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDownloadForm({
                        id: form._id,
                        type: form.type?.toLowerCase() || "tow",
                      });
                    }}
                    className=" cursor-pointer flex items-center gap-2 px-3 py-2 bg-[#043677]/80 text-white rounded-md hover:bg-[#043677] transition"
                  >
                    <FaDownload size={14} />
                    <span>PDF</span>
                  </button>
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

      {/* ✅ Loading Overlay for PDF Generation */}
      {downloadForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <LoadingSpinner />
            <p className="text-gray-700 text-lg font-medium">Generating PDF...</p>
          </div>
        </div>
      )}

      {/* ✅ Hidden PDF generator (renders only when a form is selected) */}
      {downloadForm && (
        <DownloadPdf
          id={downloadForm.id}
          type={downloadForm.type}
          onComplete={() => setDownloadForm(null)}
        />
      )}
    </div>
  );
};

export default AdminForms;