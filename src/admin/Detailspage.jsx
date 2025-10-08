import React from "react";

const Detailspage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - PDF Viewer */}
      <div className="w-1/2 border-r border-gray-200 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <span>1 / 2</span>
            <button className="text-gray-500 hover:text-gray-700">-</button>
            <span>100%</span>
            <button className="text-gray-500 hover:text-gray-700">+</button>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10a2 2 0 002-2z" />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-gray-700">...</button>
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4 rounded shadow">
          <p className="text-sm">PDF Content Placeholder (Insurance Slip)</p>
          <p className="text-xs mt-2">This is a mock representation of the insurance slip PDF.</p>
        </div>
      </div>

      {/* Right Panel - Metadata */}
      <div className="w-1/2 p-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-red-600">Insurance slip</h2>
            <span className="text-gray-500 text-sm">John Doe EMP112233</span>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="text-gray-800 font-medium">John Doe EMP112233</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Attached to</p>
              <p className="text-blue-600 font-medium">22 Vehicles</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Labels</p>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm hover:bg-gray-300">
                Truck Document
              </button>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Type</p>
              <p className="text-gray-800 font-medium">PDF</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">File</p>
              <p className="text-gray-800 font-medium">50 KB</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Last Modified</p>
              <p className="text-gray-800 font-medium">23/09/2025 by John Doe EMP112233</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Uploaded</p>
              <p className="text-gray-800 font-medium">23/09/2025 by John Doe EMP112233</p>
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
      </div>
    </div>
  );
};

export default Detailspage;