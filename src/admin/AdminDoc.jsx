// src/components/AdminDoc.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AdminDoc = () => {
  const [selectedOption, setSelectedOption] = useState("Filter by Files");
  const [isOpen, setIsOpen] = useState(false);

  const documentsData = [
    { documentName: "Driver License", type: "PDF", date: "09/11/2025", files: "2", vehicle: "EX7872" },
    { documentName: "Driver License", type: "PDF", date: "09/11/2025", files: "2", vehicle: "EX7872" },
    { documentName: "Registration", type: "PDF", date: "09/11/2025", files: "1", vehicle: "EX7872" },
    { documentName: "Maintenance Log", type: "PDF", date: "09/11/2025", files: "3", vehicle: "EX7872" },
    { documentName: "Inspection Report", type: "PDF", date: "09/11/2025", files: "1", vehicle: "EX7872" },
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // Add custom logic for the selected option here
  };

  return (
    <div className="w-full  bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Documents</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 pl-8 border border-gray-300 rounded"
            />
            <FaSearch className="absolute left-2 top-2 text-gray-400" />
          </div>
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-gray-300 rounded flex items-center"
            >
              {selectedOption}
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg z-10">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect("Filter by Files")}
                  >
                    All
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect("Filter by Files")}
                  >
                    PDF
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleOptionSelect("Filter by Files")}
                  >
                    Image
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2">INV - 2388. pdf</th>
              <th className="px-4 py-2">File Size</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Attached To</th>
              <th className="px-4 py-2">Labels</th>
              <th className="px-4 py-2">Created on</th>
            </tr>
          </thead>
          <tbody>
            {documentsData.map((doc, index) => (
              <tr
                key={index}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">{doc.documentName}</td>
                <td className="px-4 py-2">{doc.type}</td>
                <td className="px-4 py-2">{doc.vehicle}</td>
                <td className="px-4 py-2">{doc.files}</td>
                <td className="px-4 py-2">
                  <span className="text-gray-500">No Label</span>
                </td>
                <td className="px-4 py-2">{doc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDoc;