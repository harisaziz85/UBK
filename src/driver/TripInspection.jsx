import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/image 104.png'
import inspections from './Inspection/InspectionData'

const TripInspection = () => {
  const [formFilter, setFormFilter] = useState("Submitted Inspection Form");
  const [itemFilter, setItemFilter] = useState("Submitted Inspection Item");
  const navigation = useNavigate();



  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div
        className="flex justify-between items-center mb-4 p-3 rounded"
      >
        <h2 className="text-xl font-bold text-gray-800">All Inspections</h2>
        <button
          onClick={() => navigation('/start-inspection')}
          className=" cursor-pointer px-4 py-2 text-white rounded-lg shadow"
          style={{ backgroundColor: "#043677" }}
        >
          + Start Inspection
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
              <tr key={insp.id} onClick={() => navigation(`/inspection/${insp.id}`)} className=" cursor-pointer bg-white hover:bg-[#04367714]">
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
                  <span 
                    className={`px-3 py-1 rounded-full text-xs ${
                      insp.status === "Pass" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {insp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex  items-center justify-end mt-4 gap-2 text-sm text-gray-600">
        <span>1–14 of 14</span>
        <div className="flex gap-2">
          <button className="px-1 py-1  rounded bg-gray-100 hover:bg-gray-200">
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.6 6L6.6 12L8 10.6L3.4 6L8 1.4L6.6 0L0.6 6Z" fill="#1D1B20" fill-opacity="0.8"/>
            </svg>

          </button>
          <button className="px-1 py-1  rounded bg-gray-100 hover:bg-gray-200">
              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.4 6L1.4 12L0 10.6L4.6 6L0 1.4L1.4 0L7.4 6Z" fill="#1D1B20" fill-opacity="0.8"/>
            </svg>

          </button>
        </div>
      </div>
    </div>
  );
};

export default TripInspection;