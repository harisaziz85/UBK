import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const AdminDoc = () => {
  const [selectedOption, setSelectedOption] = useState("Filter by Files");
  const [isOpen, setIsOpen] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    expiryDate: "",
    file: null,
  });

  const limit = 10;
  const dateInputRef = useRef(null);
  const updateDateInputRef = useRef(null);

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://ubktowingbackend-production.up.railway.app/api/common/document/all?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDocuments(response.data.documents || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [page]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Upload document
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const form = new FormData();
      form.append("title", formData.title);
      form.append("expiryDate", formData.expiryDate);
      form.append("file", formData.file);

      await axios.post(
        "https://ubktowingbackend-production.up.railway.app/api/common/document/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowUploadModal(false);
      setFormData({ title: "", expiryDate: "", file: null });
      fetchDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  // Update document
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const form = new FormData();
      form.append("title", formData.title);
      form.append("expiryDate", formData.expiryDate);
      if (formData.file) form.append("file", formData.file);

      await axios.put(
        `https://ubktowingbackend-production.up.railway.app/api/common/document/update/${selectedDoc._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setShowUpdateModal(false);
      setSelectedDoc(null);
      setFormData({ title: "", expiryDate: "", file: null });
      fetchDocuments();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const openUpdateModal = (doc) => {
    setSelectedDoc(doc);
    setFormData({
      title: doc.title,
      expiryDate: doc.expiryDate.split("T")[0],
      file: null,
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="w-full bg-white shadow-sm rounded-xl border border-gray-200 p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-robotomedium text-[#1E1E1E]">Documents</h2>

        <div className="flex space-x-4 items-center">
          {/* Upload Button */}
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#043677] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#032b5c] transition"
          >
            + Upload Document
          </button>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#043677]"
            />
            <FaSearch className="absolute left-2.5 top-2.5 text-gray-400 text-sm" />
          </div>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="px-3 py-2 border border-gray-300 rounded-lg flex items-center text-sm hover:bg-gray-50 focus:outline-none"
            >
              {selectedOption}
              <svg
                className="w-4 h-4 ml-2 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="py-1 text-sm text-gray-700">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect("All Files")}
                  >
                    All
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect("PDF")}
                  >
                    PDF
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect("Images")}
                  >
                    Image
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-[#F3F4F6] text-[#1E1E1E] text-[13px] uppercase font-robotomedium tracking-wide">
            <tr>
              <th className="px-5 py-3">Document Name</th>
              <th className="px-5 py-3">File Size</th>
              <th className="px-5 py-3">Uploaded By</th>
              <th className="px-5 py-3">Expiry</th>
              <th className="px-5 py-3">Attached To</th>
              <th className="px-5 py-3">Created On</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  Loading documents...
                </td>
              </tr>
            ) : documents.length > 0 ? (
              documents.map((doc) => (
                <tr
                  key={doc._id}
                  onClick={() => openUpdateModal(doc)}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all text-[14px] font-robotoregular cursor-pointer"
                >
                  <td className="px-5 py-4 flex items-center space-x-2">
                    <img
                      src={doc.fileUrl}
                      alt="file"
                      className="w-10 h-10 rounded object-cover"
                    />
                    <span className="font-medium text-[#043677]">{doc.title}</span>
                  </td>
                  <td className="px-5 py-4">—</td>
                  <td className="px-5 py-4">{doc.uploadedBy?.name || "—"}</td>
                  <td className="px-5 py-4">
                    {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="px-5 py-4">{doc.vehicleId ? "Linked" : "—"}</td>
                  <td className="px-5 py-4">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No documents found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 space-x-3">
          <button
            className={`px-3 py-1 text-sm rounded border ${
              page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => page > 1 && setPage(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>

          <span className="text-sm text-gray-700">
            Page {page} of {totalPages}
          </span>

          <button
            className={`px-3 py-1 text-sm rounded border ${
              page === totalPages
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => page < totalPages && setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-lg font-robotomedium mb-4">Upload Document</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Title"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
              <div
                onClick={() => dateInputRef.current.showPicker()}
                className="relative"
              >
                <input
                  ref={dateInputRef}
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                />
              </div>
              <input
                type="file"
                name="file"
                accept="*/*"
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#043677] text-white rounded-lg hover:bg-[#032b5c]"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px]">
            <h3 className="text-lg font-robotomedium mb-4">Update Document</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter Title"
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />
              <div
                onClick={() => updateDateInputRef.current.showPicker()}
                className="relative"
              >
                <input
                  ref={updateDateInputRef}
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none cursor-pointer"
                />
              </div>
              <input
                type="file"
                name="file"
                accept="*/*"
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              />

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#043677] text-white rounded-lg hover:bg-[#032b5c]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoc;
