import React, { useState } from "react";

const Inspectionschdues = () => {
  const [scheduledInspections] = useState([
    { id: 1, vehicle: "EX7872", type: "Pre-trip Inspection", date: "2025-09-27", time: "09:00 AM", status: "Pending", assignedTo: "John Doe EMP112233" },
    { id: 2, vehicle: "EX7873", type: "Post-trip Inspection", date: "2025-09-28", time: "02:00 PM", status: "Scheduled", assignedTo: "Jane Smith EMP445566" },
    { id: 3, vehicle: "EX7874", type: "Pre-trip Inspection", date: "2025-09-29", time: "10:00 AM", status: "Pending", assignedTo: "John Doe EMP112233" },
    { id: 4, vehicle: "EX7875", type: "Annual Inspection", date: "2025-10-01", time: "01:00 PM", status: "Scheduled", assignedTo: "Mike Johnson EMP778899" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const handleViewDetails = (id) => {
    alert(`Viewing details for inspection ID: ${id}`);
  };

  const handleReschedule = (id) => {
    alert(`Rescheduling inspection ID: ${id}`);
  };

  const filteredInspections = scheduledInspections.filter((inspection) =>
    inspection.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.date.includes(searchTerm) ||
    inspection.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search and Filters */}
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search by vehicle, type, date, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="p-2 rounded-lg border border-gray-300">
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Inspections Table */}
      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border-b">Vehicle</th>
              <th className="p-3 border-b">Inspection Type</th>
              <th className="p-3 border-b">Date</th>
              <th className="p-3 border-b">Time</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Assigned To</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInspections.length > 0 ? (
              filteredInspections.map((inspection) => (
                <tr key={inspection.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{inspection.vehicle}</td>
                  <td className="p-3">{inspection.type}</td>
                  <td className="p-3">{inspection.date}</td>
                  <td className="p-3">{inspection.time}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded ${
                        inspection.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : inspection.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {inspection.status}
                    </span>
                  </td>
                  <td className="p-3">{inspection.assignedTo}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(inspection.id)}
                      className="text-blue-600 hover:underline"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleReschedule(inspection.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Reschedule
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  No scheduled inspections found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     
    </div>
  );
};

export default Inspectionschdues;