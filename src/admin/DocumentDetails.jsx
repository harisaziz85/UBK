import React from "react";
import { FaFilePdf } from "react-icons/fa";

const DocumentDetails = () => {
  const document = {
    title: "Insurance slip",
    location: "John Doe EMP112233",
    attachedTo: "22 Vehicles",
    expiry: "23/09/2025",
    type: "PDF",
    fileSize: "50 KB",
    lastModified: "23/09/2025 by John Doe EMP112233",
    uploaded: "23/09/2025 by John Doe EMP112233",
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* PDF Viewer Section */}
      <div className="w-2/3 p-4 bg-white shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <span>1 / 2</span>
            <button className="text-gray-500">-</button>
            <span>100%</span>
            <button className="text-gray-500">+</button>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="text-gray-500">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10a2 2 0 002-2" />
              </svg>
            </button>
            <button className="text-gray-500">•••</button>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded flex items-center justify-between">
          <span className="flex items-center">
            <FaFilePdf className="mr-2 text-red-500" />
            {document.title}
          </span>
          <span>Location: {document.location}</span>
        </div>
        <div className="mt-4 bg-black h-[calc(100%-120px)] flex items-center justify-center">
          <span className="text-gray-500">PDF Preview Placeholder</span>
        </div>
      </div>

      {/* Details Sidebar */}
      <div className="w-1/3 bg-white shadow-lg p-4">
        <h2 className="text-lg font-semibold mb-4">{document.title}</h2>
        <div className="space-y-4">
          <div>
            <span className="text-gray-500">Location</span>
            <p>{document.location}</p>
          </div>
          <div>
            <span className="text-gray-500">Attached to</span>
            <p>{document.attachedTo}</p>
          </div>
          <div>
            <span className="text-gray-500">Expiry</span>
            <p>{document.expiry}</p>
          </div>
          <div>
            <span className="text-gray-500">Type</span>
            <p>{document.type}</p>
          </div>
          <div>
            <span className="text-gray-500">File</span>
            <p>{document.fileSize}</p>
          </div>
          <div>
            <span className="text-gray-500">Last Modified</span>
            <p>{document.lastModified}</p>
          </div>
          <div>
            <span className="text-gray-500">Uploaded</span>
            <p>{document.uploaded}</p>
          </div>
          <div className="flex items-center mt-6">
            <img
              src="https://via.placeholder.com/40"
              alt="User"
              className="w-10 h-10 rounded-full mr-2"
            />
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Add a comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetails;