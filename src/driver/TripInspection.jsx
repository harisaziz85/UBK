import React, { useState } from "react";

const TripInspection = () => {
  const [formFilter, setFormFilter] = useState("Submitted Inspection Form");
  const [itemFilter, setItemFilter] = useState("Submitted Inspection Item");

  const inspections = [
    {
      id: "#12844534",
      submittedAt: "Tue, Feb 20, 2025 10:30am",
      vehicle: "EX7872",
      vehicleImg: "https://via.placeholder.com/32",
      date: "22/04/2025",
      form: "Pre-trip Inspection",
      status: "Critical Fail",
    },
    {
      id: "#12844535",
      submittedAt: "Tue, Feb 20, 2025 10:30am",
      vehicle: "EX7872",
      vehicleImg: "https://via.placeholder.com/32",
      date: "22/04/2025",
      form: "Pre-trip Inspection",
      status: "Critical Fail",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div
        className="flex justify-between items-center mb-4 p-3 rounded"
        style={{ backgroundColor: "#04367714" }}
      >
        <h2 className="text-xl font-bold text-gray-800">All Inspections</h2>
        <button
          className="px-4 py-2 text-white rounded-lg shadow"
          style={{ backgroundColor: "#043677" }}
        >
          + Start Inspection
        </button>
      </div>

      {/* Filters (Custom Dropdowns) */}
      <div className="flex gap-3 mb-4">
        <div className="relative inline-block w-64">
          <button className="w-full px-4 py-2 bg-white border rounded-lg text-left shadow-sm">
            {formFilter}
          </button>
          <ul className="absolute hidden group-hover:block w-full mt-1 bg-white border rounded-lg shadow-md z-10">
            <li
              onClick={() => setFormFilter("Pre-trip")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Pre-trip
            </li>
            <li
              onClick={() => setFormFilter("Post-trip")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Post-trip
            </li>
          </ul>
        </div>

        <div className="relative inline-block w-64">
          <button className="w-full px-4 py-2 bg-white border rounded-lg text-left shadow-sm">
            {itemFilter}
          </button>
          <ul className="absolute hidden group-hover:block w-full mt-1 bg-white border rounded-lg shadow-md z-10">
            <li
              onClick={() => setItemFilter("Brakes")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Brakes
            </li>
            <li
              onClick={() => setItemFilter("Lights")}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Lights
            </li>
          </ul>
        </div>

        <button className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-left border-collapse text-sm">
          <thead style={{ backgroundColor: "#04367714" }}>
            <tr>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                <input type="checkbox" />
              </th>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                Submitted At
              </th>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                Submission
              </th>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                Vehicle
              </th>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                Date
              </th>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                Inspection Form
              </th>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((insp, idx) => (
              <tr key={idx} className="bg-white">
                <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                  <input type="checkbox" />
                </td>
                <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                  {insp.submittedAt}
                </td>
                <td
                  className="p-3 border-b text-blue-600"
                  style={{ borderColor: "#33333333" }}
                >
                  {insp.id}
                </td>
                <td
                  className="p-3 border-b flex items-center gap-2 text-blue-600"
                  style={{ borderColor: "#33333333" }}
                >
                  <img
                    src={insp.vehicleImg}
                    alt="vehicle"
                    className="w-8 h-8 rounded"
                  />
                  {insp.vehicle}
                </td>
                <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                  {insp.date}
                </td>
                <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    {insp.form}
                  </span>
                </td>
                <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                  <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs">
                    {insp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>1–14 of 14</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200">
            ◀
          </button>
          <button className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200">
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripInspection;
