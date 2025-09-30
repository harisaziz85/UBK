import React from 'react';

const InspectionHistory = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Inspection History</h1>
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <span className="text-blue-600 font-medium">All</span>
          <span className="text-gray-500">Submission with Field Items</span>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Start Inspection
        </button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Inspection for Transportation</h2>
          <div className="flex space-x-2">
            <span className="text-gray-600">• Create and customize pre-built inspection</span>
            <span className="text-gray-600">• Complete and submit inspection anywhere with app</span>
            <span className="text-gray-600">• Triage and start resolving issues as soon as they're reported</span>
          </div>
        </div>
        <img
          src="https://via.placeholder.com/800x200"
          alt="Truck Inspection"
          className="w-full h-48 object-cover rounded"
        />
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-2 w-1/3"
          />
          <div className="flex space-x-4">
            <select className="border rounded p-2">
              <option>Inspection Submitted</option>
            </select>
            <select className="border rounded p-2">
              <option>Inspection</option>
            </select>
            <select className="border rounded p-2">
              <option>Vehicle</option>
            </select>
            <select className="border rounded p-2">
              <option>Vehicle Group</option>
            </select>
            <button className="border rounded p-2">Filters</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Vehicle</th>
                <th className="p-2">Vehicle Group</th>
                <th className="p-2">Submitted</th>
                <th className="p-2">Duration</th>
                <th className="p-2">Inspection From</th>
                <th className="p-2">User</th>
                <th className="p-2">Location Exception</th>
                <th className="p-2">Failed Items</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No results to show. Inspection Submission create a digital paper-trail for important asset
                  inspection workflows.
                  <br />
                  <a href="#" className="text-blue-600 underline">Learn More</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Start Inspection
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionHistory;