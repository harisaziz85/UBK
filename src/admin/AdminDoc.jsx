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
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    expiryDate: "",
    category: "",
    file: null,
    fileSize: "",
  });
  const limit = 10;
  const dateInputRef = useRef(null);
  const updateDateInputRef = useRef(null);

  // Load persisted file sizes from localStorage on mount
  useEffect(() => {
    const persistedFileSizes = localStorage.getItem("documentFileSizes");
    if (persistedFileSizes) {
      setFileSizes(JSON.parse(persistedFileSizes));
    }
  }, []);

  // Persist file sizes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("documentFileSizes", JSON.stringify(fileSizes));
  }, [fileSizes]);

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

  // Format bytes to human readable size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 B";
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Fetch file size from URL (front-end only)
  const fetchFileSize = async (url, id) => {
    if (fileSizes[id]) {
      return; // Already have it in state
    }

    if (!url) {
      setFileSizes((prev) => ({ ...prev, [id]: "—" }));
      return;
    }

    // Check persisted
    const persisted = localStorage.getItem("documentFileSizes");
    if (persisted) {
      const parsed = JSON.parse(persisted);
      if (parsed[id]) {
        setFileSizes((prev) => ({ ...prev, [id]: parsed[id] }));
        return;
      }
    }

    // Set loading state
    setFileSizes((prev) => ({ ...prev, [id]: "Loading..." }));

    let bytes = 0;

    // Try HEAD request
    try {
      const headResponse = await axios.head(url, { timeout: 10000 });
      const sizeHeader = headResponse.headers["content-length"];
      if (sizeHeader) {
        bytes = parseInt(sizeHeader);
      }
    } catch (headError) {
      console.warn("HEAD request failed, trying fallback:", headError.message);
    }

    // If HEAD failed or no size, fallback to partial GET
    if (bytes === 0) {
      try {
        const getResponse = await axios.get(url, {
          headers: { Range: "bytes=0-0" },
          responseType: "arraybuffer",
          timeout: 15000,
          maxContentLength: 1024,
        });

        const contentRange = getResponse.headers["content-range"];
        if (contentRange) {
          const match = contentRange.match(/\/(\d+)$/);
          if (match) {
            bytes = parseInt(match[1]);
          }
        }
        // Do not use content-length here as it would be 1 for range request
      } catch (getError) {
        console.error("Fallback GET failed:", getError.message);
      }
    }

    const sizeStr = bytes > 0 ? formatFileSize(bytes) : "—";
    setFileSizes((prev) => ({ ...prev, [id]: sizeStr }));
  };

  useEffect(() => {
    fetchDocuments();
  }, [page]);

  useEffect(() => {
    documents.forEach((doc) => {
      fetchFileSize(doc.fileUrl, doc._id);
    });
  }, [documents]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files ? files[0] : null;
      if (file) {
        const sizeStr = formatFileSize(file.size);
        setFormData((prev) => ({ ...prev, file, fileSize: sizeStr }));
      } else {
        setFormData((prev) => ({ ...prev, file: null, fileSize: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Upload document
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file) return;
    setIsUploading(true);
    try {
      const token = localStorage.getItem("authToken");
      const form = new FormData();
      form.append("title", formData.title);
      form.append("expiryDate", formData.expiryDate);
      form.append("category", formData.category);
      form.append("file", formData.file);

      const uploadResponse = await axios.post(
        "https://ubktowingbackend-production.up.railway.app/api/common/document/create",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Set file size in state from uploaded file (front-end only)
      const newDocId = uploadResponse.data.document?._id || uploadResponse.data._id;
      if (newDocId && formData.fileSize) {
        setFileSizes((prev) => ({ ...prev, [newDocId]: formData.fileSize }));
      }

      setShowUploadModal(false);
      setFormData({ title: "", expiryDate: "", category: "", file: null, fileSize: "" });
      fetchDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Update document
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const token = localStorage.getItem("authToken");
      const form = new FormData();
      form.append("title", formData.title);
      form.append("expiryDate", formData.expiryDate);
      form.append("category", formData.category);
      if (formData.file) form.append("file", formData.file);

      const updateResponse = await axios.put(
        `https://ubktowingbackend-production.up.railway.app/api/common/document/update/${selectedDoc._id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // If file was updated, set new file size (front-end only)
      if (formData.file && formData.fileSize) {
        setFileSizes((prev) => ({ ...prev, [selectedDoc._id]: formData.fileSize }));
      }

      setShowUpdateModal(false);
      setSelectedDoc(null);
      setFormData({ title: "", expiryDate: "", category: "", file: null, fileSize: "" });
      fetchDocuments();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

const openUpdateModal = (doc) => {
  setSelectedDoc(doc);

  let formattedExpiry = "";
  if (doc.expiryDate) {
    // ✅ Convert UTC date to correct local calendar date
    const utcDate = new Date(doc.expiryDate);
    const year = utcDate.getUTCFullYear();
    const month = String(utcDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(utcDate.getUTCDate()).padStart(2, "0");
    formattedExpiry = `${year}-${month}-${day}`;
  }

  setFormData({
    title: doc.title,
    expiryDate: formattedExpiry, // ✅ Exact calendar date
    category: doc.category || "",
    file: null,
    fileSize: "",
  });

  setShowUpdateModal(true);
};



  const closeUploadModal = () => {
    setShowUploadModal(false);
    setFormData({ title: "", expiryDate: "", category: "", file: null, fileSize: "" });
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedDoc(null);
    setFormData({ title: "", expiryDate: "", category: "", file: null, fileSize: "" });
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
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">
                    {fileSizes[doc._id] || "—"}
                  </td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{doc.uploadedBy?.name || "—"}</td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">
                    {doc.expiryDate
                      ? new Date(doc.expiryDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
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
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-robotomedium mb-4">Upload Document</h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter Title"
                  required
                  disabled={isUploading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <div
                  onClick={() => !isUploading && dateInputRef.current?.showPicker()}
                  className="relative"
                >
                  <input
                    ref={dateInputRef}
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    disabled={isUploading}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none cursor-pointer disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={isUploading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50"
                >
                  <option value="">Select Category</option>
                  <option value="UBK Towing">UBK Towing</option>
                  <option value="CAA">CAA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF *</label>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleInputChange}
                  required
                  disabled={isUploading}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#043677] file:text-white hover:file:bg-[#032b5c]"
                />
                {formData.file && (
                  <div className="text-sm text-gray-500 mt-1">
                    Selected: {formData.file.name} ({formData.fileSize})
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeUploadModal}
                  className=" cursor-pointer px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  disabled={isUploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !formData.title || !formData.expiryDate || !formData.category || !formData.file}
                  className=" cursor-pointer px-4 py-2 bg-[#043677] text-white rounded-lg hover:bg-[#032b5c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/20   backdrop-blur-sm bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-robotomedium mb-4">Update Document</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter Title"
                  required
                  disabled={isUpdating}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <div
                  onClick={() => !isUpdating && updateDateInputRef.current?.showPicker()}
                  className="relative"
                >
                  <input
                    ref={updateDateInputRef}
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    disabled={isUpdating}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none cursor-pointer disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  disabled={isUpdating}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50"
                >
                  <option value="">Select Category</option>
                  <option value="UBK Towing">UBK Towing</option>
                  <option value="CAA">CAA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update PDF (Optional)</label>
                <input
                  type="file"
                  name="file"
                  accept="application/pdf"
                  onChange={handleInputChange}
                  disabled={isUpdating}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none disabled:opacity-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#043677] file:text-white hover:file:bg-[#032b5c]"
                />
                {formData.file && (
                  <div className="text-sm text-gray-500 mt-1">
                    Selected: {formData.file.name} ({formData.fileSize})
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={closeUpdateModal}
                  className=" cursor-pointer px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition disabled:opacity-50"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating || !formData.title || !formData.expiryDate || !formData.category}
                  className=" cursor-pointer px-4 py-2 bg-[#043677] text-white rounded-lg hover:bg-[#032b5c] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Updating..." : "Update"}
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