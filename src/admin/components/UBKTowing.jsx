import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { IoDocumentSharp } from "react-icons/io5";
import Doctopbar from "./Doctopbar";
import { FaFilePdf } from "react-icons/fa";

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

const UBKTowing = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: "EX7872", attached: false },
    { id: 2, plate: "EX7872", attached: false },
    { id: 3, plate: "EX7872", attached: false },
    { id: 4, plate: "EX7872", attached: false },
    { id: 5, plate: "EX7872", attached: false },
  ]);
  const [formData, setFormData] = useState({
    title: "",
    expiryDate: "",
    category: "",
    file: null,
    fileSize: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const dateInputRef = useRef(null);

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        `https://ubktowingbackend-production.up.railway.app/api/common/document/all?limit=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Filter documents to show only those with category "UBK Towing"
      const filteredDocuments = (response.data.documents || []).filter(
        (doc) => doc.category === "UBK Towing"
      );
      setDocuments(filteredDocuments);
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

  useEffect(() => {
    fetchDocuments();
  }, []);

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
      setFormData({ title: "", expiryDate: "", category: "", file: null, fileSize: "" });
      fetchDocuments();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
  };

  const handleSelectVehicles = () => {
    setShowVehicleModal(true);
  };

  const handleAttachVehicle = (vehicleId) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, attached: !v.attached } : v
      )
    );
  };

  const handleVehicleModalClose = () => {
    setShowVehicleModal(false);
  };

  const handleAttach = () => {
    alert("Vehicles attached successfully!");
    setShowVehicleModal(false);
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
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
<Doctopbar/>
      {/* Table Section */}
      <div className="overflow-x-auto bg-[white] border border-gray-200">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-[#F5F5F5] text-[#1E1E1E] text-[13px] uppercase font-robotomedium tracking-wide">
            <tr>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Document Name</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">File Size</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Uploaded By</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Expiry</th>
              <th className="px-5 py-5 robotomedium text-[14px] text-[#333333E5]">Category</th>
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
                  onClick={() => handleDocClick(doc)}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all text-[14px] font-robotoregular cursor-pointer"
                >
<td className="px-5 py-4 flex items-center space-x-2">
  <FaFilePdf className="w-10 h-10 text-[#DC2626]" />
  <span className="robotomedium text-[14px] text-[#333333E5]">
    {doc.title}
  </span>
</td>


                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{doc.formattedFileSize || "—"}</td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{doc.uploadedBy?.name || "—"}</td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">
                    {doc.expiryDate
                      ? new Date(doc.expiryDate).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-5 py-4 robotomedium text-[14px] text-[#333333E5]">{doc.category || "—"}</td>
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

      {/* Sidebar (Details Panel) */}
      {selectedDoc && (
        <div className="fixed top-0 right-0 h-screen w-1/2 bg-white text-gray-800 p-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-600">{selectedDoc.title}</h2>
            <div>
              <button className="text-gray-500 mr-2">...</button>
              <button className="text-gray-500">Download</button>
            </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 h-48 flex items-center justify-center mb-4">
            <p className="text-gray-500">Drag and drop files to upload</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="text-gray-800 font-medium">UBK Towing</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Attached to</p>
              <button
                onClick={handleSelectVehicles}
                className="text-blue-600 font-medium hover:underline"
              >
                Select Vehicles
              </button>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Labels</p>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300">
                Truck Document
              </button>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="text-gray-800 font-medium">{selectedDoc.fileUrl ? selectedDoc.fileUrl.split('.').pop().toUpperCase() : "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">File</p>
              <p className="text-gray-800 font-medium">{selectedDoc.formattedFileSize || "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Modified</p>
              <p className="text-gray-800 font-medium">{selectedDoc.updatedAt ? new Date(selectedDoc.updatedAt).toLocaleDateString() + " by " + (selectedDoc.uploadedBy?.name || "Unknown") : "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Uploaded</p>
              <p className="text-gray-800 font-medium">{selectedDoc.createdAt ? new Date(selectedDoc.createdAt).toLocaleDateString() + " by " + (selectedDoc.uploadedBy?.name || "Unknown") : "—"}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Category</p>
              <p className="text-gray-800 font-medium">{selectedDoc.category || "—"}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/30"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-gray-500 text-sm">Add a comment</p>
              <button className="text-blue-600 text-sm hover:underline">📝</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Vehicle Selection */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-semibold mb-4">Attach documents to Vehicles</h2>
            <p className="text-gray-500 mb-4">Drag and drop files to upload</p>
            <input
              type="text"
              placeholder="Find Vehicles, types, group"
              className="w-full p-2 mb-4 rounded-full border border-gray-300"
            />
            <div className="flex space-x-4 mb-4">
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
                Attached Devices <span className="bg-blue-600 text-white rounded-full px-2">0</span>
              </button>
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
                All Vehicles <span className="bg-blue-600 text-white rounded-full px-2">0</span>
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Vehicle"
                      className="w-12 h-12 mr-2"
                    />
                    <span>{vehicle.plate}</span>
                  </div>
                  <button
                    onClick={() => handleAttachVehicle(vehicle.id)}
                    className={`px-4 py-2 rounded ${vehicle.attached ? "bg-green-500" : "bg-blue-600"} text-white`}
                  >
                    {vehicle.attached ? "Attached" : "Attach"}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleVehicleModalClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAttach}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Attach
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UBKTowing;