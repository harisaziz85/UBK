import React, { useState, useEffect } from "react";
import { FaDownload, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DownloadPdf from "./Donwloadpdf/Downloadpdf";

const Shimmer = () => (
  <>
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-6 items-center py-3 px-4 border-b border-gray-200 min-w-[800px]"
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
  const [downloadForm, setDownloadForm] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalForms, setTotalForms] = useState(0);
  const limit = 10;
  const navigate = useNavigate();

  const fetchForms = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://ubktowingbackend-production.up.railway.app/api/driver/consentForm?page=${page}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Adjust based on actual response structure; assuming { forms: [], total: number }
      // If different (e.g., totalPages directly), adjust accordingly
      // For debugging, add: console.log('API Response:', response.data);
      
      setFormsData(response.data.forms || []);
      const total = response.data.total || response.data.count || 0;
      setTotalForms(total);
      setTotalPages(Math.ceil(total / limit) || 1);
    } catch (error) {
      console.error("Error fetching forms:", error);
      setFormsData([]);
      setTotalForms(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForms(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setSelectedForms([]);
      setSelectAll(false);
      setCurrentPage(newPage);
    }
  };

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
    setSelectAll(newSelectedForms.length === formsData.length && formsData.length > 0);
  };

  return (
    <div className="p-4 sm:p-6 bg-[#F9FAFB] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <p className="robotosemibold text-[20px] sm:text-[24px]">Forms</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto">
          {/* Header - Sticky for vertical scroll */}
          <div className="bg-[#04367714] text-black robotomedium text-[12px] sm:text-[14px] grid grid-cols-6 items-center py-2 sm:py-3 px-2 sm:px-4 sticky top-0 z-10 min-w-[800px]">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
                className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600"
              />
              <span className="whitespace-nowrap">Form Number</span>
            </div>
            <span className="whitespace-nowrap">Type</span>
            <span className="whitespace-nowrap">Date</span>
            <span className="whitespace-nowrap">Driver</span>
            <span className="whitespace-nowrap">Vehicle Info</span>
            <span className="whitespace-nowrap">Actions</span>
          </div>

          {/* Rows */}
          <div className="min-w-[800px]">
            {loading ? (
              <Shimmer />
            ) : formsData.length > 0 ? (
              formsData.map((form, index) => (
                <div
                  key={form._id || index}
                  onClick={() => navigate(`/admin/form-details/${form._id}`)}
                  className={`cursor-pointer grid grid-cols-6 items-center text-[12px] sm:text-[14px] py-2 sm:py-3 px-2 sm:px-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    selectedForms.includes(index) ? "bg-blue-50" : ""
                  }`}
                >
                  {/* Checkbox + ID */}
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedForms.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="w-3 h-3 sm:w-4 sm:h-4 accent-blue-600 cursor-pointer"
                    />
                    <span className="font-medium truncate max-w-[60px] sm:max-w-none">
                      {form._id ? form._id.slice(-6).toUpperCase() : "—"}
                    </span>
                  </div>

                  {/* Type */}
                  <span className="truncate">{form.type || "—"}</span>

                  {/* Date */}
                  <span className="truncate">
                    {form.consentDateTime
                      ? new Date(form.consentDateTime).toLocaleDateString()
                      : "—"}
                  </span>

                  {/* Driver */}
                  <span className="truncate max-w-[80px] sm:max-w-none">{form.towDriver?.name || "—"}</span>

                  {/* Vehicle */}
                  <div className="flex items-center gap-1 sm:gap-3 min-w-[100px]">
                    <img
                      src={
                        form.vehicle?.vehicleId?.photo ||
                        "https://via.placeholder.com/40"
                      }
                      alt="Vehicle"
                      className="w-6 h-6 sm:w-10 sm:h-10 rounded-md object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                    <div className="flex flex-col text-[11px] sm:text-[13px] truncate">
                      <span className="font-medium truncate">{form.vehicle?.plate || "—"}</span>
                    </div>
                  </div>

                  {/* Download Button */}
                  <div className="flex justify-start min-w-[80px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDownloadForm({
                          id: form._id,
                          type: form.type?.toLowerCase() || "tow",
                        });
                      }}
                      className="cursor-pointer flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-2 bg-[#043677]/80 text-white rounded-md hover:bg-[#043677] transition-colors text-xs sm:text-sm flex-shrink-0"
                      title="Download PDF"
                    >
                      <FaDownload size={10} className="sm:[size:14]" />
                      <span className="hidden sm:inline">PDF</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 text-[14px] min-w-[800px]">
                No forms found.
              </div>
            )}
          </div>
        </div>

        {/* Pagination - Responsive */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 px-2 sm:px-4 py-2 border-t border-gray-200 gap-2 sm:gap-0">
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 w-full sm:w-auto justify-center sm:justify-start">
              Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, totalForms)} of {totalForms} forms
            </div>
            <div className="flex items-center space-x-2 w-full sm:w-auto justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors flex-1 sm:flex-none"
                title="Previous Page"
              >
                <FaChevronLeft size={10} className="mr-1 sm:[size:12]" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </button>
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-xs text-gray-600 sm:hidden">
                {currentPage}/{totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors flex-1 sm:flex-none"
                title="Next Page"
              >
                <span className="sm:hidden">Next</span>
                <span className="hidden sm:inline">Next</span>
                <FaChevronRight size={10} className="ml-1 sm:[size:12]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay for PDF Generation */}
      {downloadForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-xl flex flex-col items-center gap-4 max-w-sm mx-4">
            <LoadingSpinner />
            <p className="text-gray-700 text-base sm:text-lg font-medium text-center">Generating PDF...</p>
          </div>
        </div>
      )}

      {/* Hidden PDF generator */}
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