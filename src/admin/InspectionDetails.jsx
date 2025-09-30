import React, { useState } from "react";

const InspectionDetails = () => {
  const [inspectionDetails] = useState({
    vehicle: "EX7872",
    inspectionForm: "Pre-trip inspection",
    started: "Tue, Feb 20, 2025 10:30am",
    submitted: "Tue, Feb 20, 2025 10:31am",
    duration: "1m 23s",
    source: "App name",
    submittedBy: "John Doe EMP112233",
  });

  const [inspectionItems] = useState([
    { id: 1, name: "Air Brake System", status: "Fail", image: "https://via.placeholder.com/50" },
    { id: 2, name: "Cargo Securement", status: "Pass", image: null },
    { id: 3, name: "Driver Controls", status: "Pass", image: null },
    { id: 4, name: "Cab", status: "Pass", image: null },
    { id: 5, name: "Driver Seat", status: "Pass", image: null },
    { id: 6, name: "Air Brake System", status: "Fail", image: "https://via.placeholder.com/50" },
    { id: 7, name: "Cab", status: "Pass", image: null },
    { id: 8, name: "Air Brake System", status: "Fail", image: "https://via.placeholder.com/50" },
    { id: 9, name: "Air Brake System", status: "Fail", image: "https://via.placeholder.com/50" },
  ]);

  const handleAcknowledge = (itemId) => {
    alert(`Acknowledged item ${itemId}`);
  };

  const handleCreateIssue = (itemId) => {
    alert(`Issue created for item ${itemId}`);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel - Inspection Details */}
      <div className="w-1/3 p-6 bg-white shadow-md">
        <h2 className="text-xl font-semibold mb-4">Inspection Details</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Vehicle</p>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/40"
                alt="Vehicle"
                className="w-10 h-10 mr-2"
              />
              <span className="font-medium">{inspectionDetails.vehicle}</span>
            </div>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Inspection Form</p>
            <span className="text-green-600 font-medium">{inspectionDetails.inspectionForm}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Started</p>
            <span className="font-medium">{inspectionDetails.started}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Submitted</p>
            <span className="font-medium">{inspectionDetails.submitted}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Duration</p>
            <span className="font-medium">{inspectionDetails.duration}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Source</p>
            <span className="font-medium">{inspectionDetails.source}</span>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Submitted by</p>
            <div className="flex items-center">
              <img
                src="https://via.placeholder.com/30"
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-medium">{inspectionDetails.submittedBy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Inspection Items */}
      <div className="w-2/3 p-6 bg-white shadow-md ml-4">
        <h2 className="text-xl font-semibold mb-4">Inspection Items</h2>
        <div className="space-y-4">
          {inspectionItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2 border-b border-gray-200"
            >
              <div className="flex items-center">
                {item.image && (
                  <img
                    src={item.image}
                    alt="Inspection"
                    className="w-12 h-12 mr-2"
                  />
                )}
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded ${
                    item.status === "Pass" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.status}
                </span>
                {item.status === "Fail" && (
                  <>
                    <button
                      onClick={() => handleAcknowledge(item.id)}
                      className="text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => handleCreateIssue(item.id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                    >
                      Create Issue
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <p className="text-blue-600 text-sm mt-4">Created 1 day ago</p>
      </div>
    </div>
  );
};

export default InspectionDetails;