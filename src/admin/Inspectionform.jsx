import React from "react";

const Inspectionform = () => {
  return (
    <div className=" bg-white rounded-r-lg shadow-lg p-4">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Inspection Details</h2>
      
      {/* Items Section */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-600">Items</span>
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">33</span>
      </div>
      
      {/* Workflows Section */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-600">Workflows</span>
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">33</span>
      </div>
      
      {/* Submissions Section */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">Submissions</span>
        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-bold">33</span>
      </div>
    </div>
  );
};

export default Inspectionform;