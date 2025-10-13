import React, { useState, useEffect } from "react";
import { FaFilePdf, FaPaperPlane, FaImage, FaFileAlt, FaComment } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const Vehicleprofile = () => {
  const { vehicleId } = useParams();
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [comments, setComments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSendingComment, setIsSendingComment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  // Fetch vehicle data
  useEffect(() => {
    const fetchVehicleData = async () => {
      setIsLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("No authentication token found. Please log in.", {
          position: "top-right",
          autoClose: 3000,
        });
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${baseUrl}/admin/vehicle/${vehicleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { vehicle, documents } = response.data;
        setVehicleData(vehicle);
        setDocuments(documents || []);
      } catch (err) {
        console.error("Error fetching vehicle data:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch vehicle data.",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehicleData();
  }, [vehicleId]);

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get(
          `${baseUrl}/common/comment/get-with/${vehicleId}?page=${currentPage}&limit=10`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newComments = response.data.comments || [];
        if (currentPage === 1) {
          setComments(newComments);
        } else {
          setComments(prev => [...prev, ...newComments]);
        }
        setHasMoreComments(newComments.length === 10);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [vehicleId, currentPage]);

  // Send comment
  const handleSendComment = async () => {
    if (!commentText.trim()) {
      toast.error("Please enter a comment.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsSendingComment(true);
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(
        `${baseUrl}/common/comment/create`,
        {
          receiverId: vehicleId,
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommentText("");
      setCurrentPage(1);
      
      const response = await axios.get(
        `${baseUrl}/common/comment/get-with/${vehicleId}?page=1&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setComments(response.data.comments || []);
      
      toast.success("Comment sent successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Error sending comment:", err);
      toast.error(
        err.response?.data?.message || "Failed to send comment.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setIsSendingComment(false);
    }
  };

  // Handle file drop
  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      } else {
        toast.error("Please drop an image file.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleFileInput = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      } else {
        toast.error("Please select an image file.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const getFileIcon = (fileUrl) => {
    const extension = fileUrl.split('.').pop().toLowerCase();
    if (extension === 'pdf') {
      return <FaFilePdf className="w-10 h-10 text-red-600" />;
    } else if (['png', 'jpg', 'jpeg', 'gif', 'webp'].includes(extension)) {
      return <img src={fileUrl} alt="file" className="w-10 h-10 object-cover rounded" />;
    } else if (['doc', 'docx'].includes(extension)) {
      return <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">DOC</div>;
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
      return <div className="w-10 h-10 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">XLS</div>;
    } else {
      return <div className="w-10 h-10 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">FILE</div>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatCommentTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const Shimmer = () => {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="animate-pulse">
          <div className="mb-6">
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-2/3 mt-2 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow-sm rounded-2xl p-6">
              <div className="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {[...Array(14)].map((_, index) => (
                  <div key={index} className="h-4 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
            <div className="bg-white shadow-sm rounded-2xl p-6">
              <div className="h-6 w-1/4 bg-gray-200 rounded mb-4"></div>
              <div className="h-10 w-full bg-gray-200 rounded mb-4"></div>
              <div className="border-2 border-dashed rounded-lg py-8">
                <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded"></div>
                <div className="h-10 w-32 mx-auto mt-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <Shimmer />;
  }

  if (!vehicleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-red-600">Failed to load vehicle data.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {vehicleData.name}
        </h1>
        <p className="text-gray-600">
          {vehicleData.make} • {vehicleData.year} • {vehicleData.licensePlate} •{" "}
          {vehicleData.currentMeter} Km •{" "}
          <span className="text-blue-600 cursor-pointer hover:underline">
            {vehicleData.assignment?.driverId ? "Assigned" : "Unassigned"}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Details Card */}
        <div className="bg-white shadow-sm rounded-2xl p-6">
          <h2 className="text-[24px] robotosemibold mb-4">Vehicle Details</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-gray-700">
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Name</p>
              <p className="robotomedium">{vehicleData.name || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Status</p>
              <p className="text-green-600 robotomedium">
                ● {vehicleData.assignment?.driverId ? "Assigned" : "Unassigned"}
              </p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Meter</p>
              <p className="robotomedium">{vehicleData.currentMeter ? `${vehicleData.currentMeter} Km` : "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Operator</p>
              <div className="flex items-center space-x-2">
                <img
                  src={vehicleData.photo || "https://via.placeholder.com/32"}
                  alt="vehicle"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="robotomedium">{vehicleData.assignment?.driverId ? "Assigned" : "Unassigned"}</p>
              </div>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Type</p>
              <p className="robotomedium">{vehicleData.type || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Fuel Type</p>
              <p className="robotomedium">{vehicleData.fuelType || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">VIN/SN</p>
              <div className="flex items-center space-x-2">
                <span className="robotomedium">{vehicleData.vin || "—"}</span>
              </div>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">License Plate</p>
              <p className="robotomedium">{vehicleData.licensePlate || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Year</p>
              <p className="robotomedium">{vehicleData.year || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Make</p>
              <p className="robotomedium">{vehicleData.make || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Model</p>
              <p className="robotomedium">{vehicleData.model || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Registration State/Province</p>
              <p className="robotomedium">{vehicleData.registrationState || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Color</p>
              <p className="robotomedium">{vehicleData.color || "—"}</p>
            </div>
            <div className="border-b border-[#33333333] w-full flex justify-between pt-[38px] pb-[12px]">
              <p className="robotoregular">Ownership</p>
              <p className="robotomedium">{vehicleData.ownership || "—"}</p>
            </div>
          </div>
        </div>

        {/* Right Side - Documents and Comments */}
        <div className="space-y-6">
          {/* Documents Section */}
          <div className="bg-white shadow-sm rounded-2xl p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Documents ({documents.length})</h2>

            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search files"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Vehicle Image */}
            <div className="border border-gray-200 rounded-lg flex flex-col items-center justify-center py-6 mb-6 hover:shadow-sm transition">
              <img
                src={vehicleData.photo || "https://via.placeholder.com/40?text=No+Image"}
                alt="Vehicle"
                className="w-12 h-12 object-cover mb-2"
              />
              <p className="text-sm text-gray-700">Vehicle Photo</p>
            </div>

            {/* Documents List */}
            <div className="mb-6 max-h-[300px] overflow-y-auto">
              {filteredDocuments.length > 0 ? (
                <div className="space-y-3">
                  {filteredDocuments.map((doc, index) => (
                    <div
                      key={doc.documentId}
                      className={`border border-gray-200 rounded-lg p-3 hover:shadow-md transition flex items-center justify-between ${
                        index % 2 === 0 && index + 1 < filteredDocuments.length ? 'pr-12' : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {getFileIcon(doc.fileUrl)}
                        <div>
                          <p className="text-sm font-medium text-gray-800">{doc.title}</p>
                          <p className="text-xs text-gray-500">
                            {doc.category} • Expires: {formatDate(doc.expiryDate)}
                          </p>
                          <p className="text-xs text-gray-400">
                            By: {doc.uploadedBy.name}
                          </p>
                        </div>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        View
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  {searchQuery ? "No documents found matching your search." : "No documents available for this vehicle."}
                </p>
              )}
            </div>

            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg py-8 text-center text-sm ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 text-gray-500"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {previewImage ? (
                <div className="relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                    onClick={handleImageClick}
                  />
                </div>
              ) : (
                <>
                  <p>Drag and drop files to upload</p>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    Browse Files
                  </button>
                </>
              )}
            </div>

            {/* Icons on the Right */}
            <div className="absolute top-6 right-6 flex space-x-2">
              <div className="cursor-pointer">
                <FaImage className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </div>
              <div className="cursor-pointer">
                <FaFileAlt className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </div>
              <div className="cursor-pointer">
                <FaComment className="w-6 h-6 text-gray-600 hover:text-gray-800" />
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white shadow-sm rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>

            {/* Comments List */}
            <div className="mb-4 max-h-[400px] overflow-y-auto space-y-3">
              {comments.length > 0 ? (
                <>
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="border-b border-gray-200 pb-3 last:border-b-0"
                    >
                      <div className="flex items-start space-x-3">
                        <img
                          src={comment.senderId?.profileImage || "https://via.placeholder.com/32"}
                          alt={comment.senderId?.name || "User"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-800">
                              {comment.senderId?.name || "Unknown User"}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatCommentTime(comment.createdAt)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {hasMoreComments && (
                    <button
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium py-2"
                    >
                      Load More
                    </button>
                  )}
                </>
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>

            {/* Comment Input */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !isSendingComment) {
                    handleSendComment();
                  }
                }}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:outline-none"
                disabled={isSendingComment}
              />
              <button
                onClick={handleSendComment}
                disabled={isSendingComment}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Vehicleprofile;