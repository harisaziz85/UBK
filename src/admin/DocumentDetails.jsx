import React, { useState, useEffect } from "react";
import {
  Download,
  MoreVertical,
  ZoomIn,
  ZoomOut,
  Printer,
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DocumentDetails() {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const totalPages = 1;
  const { id } = useParams();
  const navigate = useNavigate();

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));

  // ✅ Fetch document by id
  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `https://ubktowingbackend-production.up.railway.app/api/common/document/by-id/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDocument(response.data.document || null);
      } catch (error) {
        console.error("Error fetching document details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2">
              <Skeleton circle width={32} height={32} />
            </div>
            <Skeleton width={200} height={16} />
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2">
              <Skeleton circle width={20} height={20} />
            </div>
            <Skeleton width={80} height={32} />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)]">
          {/* Left Side - PDF Viewer Skeleton */}
          <div className="flex-1 bg-gray-100 overflow-auto">
            <div className="p-4 flex justify-center">
              <div
                className="bg-white shadow-lg"
                style={{
                  width: "716px",
                  minHeight: "1056px",
                }}
              >
                <Skeleton height="1000px" />
              </div>
            </div>
          </div>

          {/* Right Side - Document Details Skeleton */}
          <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-auto">
            <div className="p-6 space-y-6">
              {/* Header Skeleton */}
              <div className="flex items-start gap-3">
                <Skeleton circle width={32} height={32} />
                <div className="flex-1">
                  <Skeleton width={250} height={24} />
                </div>
              </div>

              {/* Details Skeleton */}
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-100">
                    <Skeleton width={80} height={12} />
                    <Skeleton width={120} height={12} />
                  </div>
                ))}
              </div>

              {/* Comment Input Skeleton */}
              <div className="pt-4">
                <div className="flex items-start gap-3">
                  <Skeleton circle width={40} height={40} />
                  <div className="flex-1">
                    <Skeleton height={40} />
                  </div>
                  <Skeleton circle width={32} height={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <p>Document not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <FaFilePdf className="w-8 h-8 text-red-600" />
          </button>
          <span className="text-gray-500 text-sm">{document.title}</span>
        </div>
        <div className="flex items-center gap-2">
        
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-60px)]">
        {/* Left Side - PDF Viewer */}
        <div className="flex-1 bg-gray-100 overflow-auto">
     

          {/* ✅ PDF Viewer */}
          <div className="p-4 flex justify-center">
            <div
              className="bg-white shadow-lg"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                width: "716px",
                minHeight: "1056px",
              }}
            >
              <iframe
                src={document.fileUrl}
                title="Document Viewer"
                className="w-full h-[1000px] border-0"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Document Details */}
        <div className="w-full lg:w-96 bg-white border-l border-gray-200 overflow-auto">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start gap-3">
              <FaFilePdf className="w-8 h-8 text-red-500" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-gray-900">
                  {document.title}
                </h1>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Category</span>
                <span className="text-sm font-medium text-gray-900">
                  {document.category || "—"}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Expiry</span>
                <span className="text-sm font-medium text-gray-900">
                  {document.expiryDate
                    ? new Date(document.expiryDate).toLocaleDateString()
                    : "—"}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Type</span>
                <span className="text-sm font-medium text-gray-900">PDF</span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">File Size</span>
                <span className="text-sm font-medium text-gray-900">
                  {document.formattedFileSize || "—"}
                </span>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Last Modified</span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(document.updatedAt).toLocaleDateString()} by
                  </p>
                  <p className="text-sm text-gray-600">
                    {document.uploadedBy?.name || "System"}
                  </p>
                </div>
              </div>

              <div className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Uploaded</span>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(document.createdAt).toLocaleDateString()} by
                  </p>
                  <p className="text-sm text-gray-600">
                    {document.uploadedBy?.name || "System"}
                  </p>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            {/* <div className="pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 flex-shrink-0"></div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}