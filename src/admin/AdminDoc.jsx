import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaFilePdf } from "react-icons/fa6";
import Doctopbar from "./components/Doctopbar";

const Shimmer = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <tr key={index} className="border-b border-gray-200">
          <td className="px-5 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          </td>
          <td className="px-5 py-4">
            <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
          </td>
        </tr>
      ))}
    </>
  );
};

const AdminDoc = () => {
  const [documents, setDocuments] = useState([]);
  const [fileSizes, setFileSizes] = useState({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    expiryDate: "",
    category: "",
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

  // Fetch file size
  const fetchFileSize = async (url, id) => {
    try {
      const response = await axios.head(url);
      const size = response.headers["content-length"];
      if (size) {
        const sizeInKB = (size / 1024).toFixed(1) + " KB";
        setFileSizes((prev) => ({ ...prev, [id]: sizeInKB }));
      }
    } catch (error) {
      console.error("Error fetching file size:", error);
      setFileSizes((prev) => ({ ...prev, [id]: "—" }));
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [page]);

  useEffect(() => {
    documents.forEach((doc) => {
      if (doc.fileUrl) {
        fetchFileSize(doc.fileUrl, doc._id);
      } else {
        setFileSizes((prev) => ({ ...prev, [doc._id]: "—" }));
      }
    });
  }, [documents]);

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
      form.append("category", formData.category);
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
      setFormData({ title: "", expiryDate: "", category: "", file: null });
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
      form.append("category", formData.category);
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
      setFormData({ title: "", expiryDate: "", category: "", file: null });
      fetchDocuments();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const openUpdateModal = (doc) => {
    setSelectedDoc(doc);
    setFormData({
      title: doc.title,
      expiryDate: doc.expiryDate ? doc.expiryDate.split("T")[0] : "",
      category: doc.category || "",
      file: null,
    });
    setShowUpdateModal(true);
  };

  return (
    <div className="w-full p-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[24px] robotosemibold text-[#1E1E1E]">
          Documents
        </h2>
        <div className="flex space-x-4 items-center">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-[#043677] text-white text-[16px] flex gap-2 items-center justify-center robotomedium px-4 py-2 h-[46px] rounded-lg hover:bg-[#032b5c] transition"
          >
            <FaFilePdf className="text-[20px] text-[#DC2626]" /> Upload Document
          </button>
        </div>
      </div>
      <Doctopbar />
      {/* Table Section */}
      <div className="overflow-x-auto bg-[white] border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-[#F5F5F5] text-[#1E1E1E] text-[13px] uppercase font-robotomedium tracking-wide">
            <tr>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Document Name</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">File Size</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Uploaded By</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Expiry</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Attached To</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Created On</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Shimmer />
            ) : documents.length > 0 ? (
              documents.map((doc) => (
                <tr
                  key={doc._id}
                  onClick={() => openUpdateModal(doc)}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all text-[14px] font-robotoregular cursor-pointer"
                >
                  <td className="px-5 py-4 flex items-center space-x-2">
                    <FaFilePdf className="w-10 h-10 text-[#DC2626]" />
                    <span className="robotomedium text-[14px] text-[#333333E5]">
                      {doc.title}
                    </span>
                  </td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{fileSizes[doc._id] || "Loading..."}</td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{doc.uploadedBy?.name || "—"}</td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">
                    {doc.expiryDate
                      ? new Date(doc.expiryDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{doc.vehicleId ? "Linked" : "—"}</td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">
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
        <div className="flex justify-end items-center mt-6 space-x-3 text-sm text-gray-600">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex space-x-2">
            <button
              className={`px-3 py-1 rounded border ${
                page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => page > 1 && setPage(page - 1)}
              disabled={page === 1}
            >
              Prev
            </button>
            <button
              className={`px-3 py-1 rounded border ${
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
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-[#00000083] bg-opacity-40 flex justify-center items-center z-50">
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
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="UBK Towing">UBK Towing</option>
                <option value="CAA">CAA</option>
              </select>
              <input
                type="file"
                name="file"
                accept="application/pdf"
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
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none"
              >
                <option value="">Select Category</option>
                <option value="UBK Towing">UBK Towing</option>
                <option value="CAA">CAA</option>
              </select>
              <input
                type="file"
                name="file"
                accept="application/pdf"
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