import React, { useState } from "react";

const TruckDock = () => {
  const [activeTab, setActiveTab] = useState("all");

  const documents = [
    {
      id: 1,
      name: "INV - 2388.pdf",
      size: "63.2 KB",
      location: "John Doe EMP112233",
      createdOn: "06/30/2025",
    },
    {
      id: 2,
      name: "INV - 2389.pdf",
      size: "48.6 KB",
      location: "John Doe EMP112233",
      createdOn: "06/30/2025",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Documents</h2>
        <button className="px-4 py-2 text-white rounded-lg shadow"
          style={{ backgroundColor: "#043677" }}
        >
          Upload Document
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 -mb-px border-b-2 ${
            activeTab === "all"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500"
          }`}
        >
          All Documents
        </button>
        <button
          onClick={() => setActiveTab("ubk")}
          className={`px-4 py-2 -mb-px border-b-2 ${
            activeTab === "ubk"
              ? "border-blue-600 text-blue-600 font-semibold"
              : "border-transparent text-gray-500"
          }`}
        >
          UBK Towing
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Document File Type</option>
          <option>PDF</option>
          <option>Word</option>
          <option>Excel</option>
        </select>
        <button className="px-4 py-2 border rounded-lg bg-gray-100 hover:bg-gray-200">
          Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-3 font-medium border-b" style={{ borderColor: "#33333333" }}>
                File Name
              </th>
              <th className="p-3 font-medium border-b" style={{ borderColor: "#33333333" }}>
                File Size
              </th>
              <th className="p-3 font-medium border-b" style={{ borderColor: "#33333333" }}>
                Location
              </th>
              <th className="p-3 font-medium border-b" style={{ borderColor: "#33333333" }}>
                Attached To
              </th>
              <th className="p-3 font-medium border-b" style={{ borderColor: "#33333333" }}>
                Labels
              </th>
              <th className="p-3 font-medium border-b" style={{ borderColor: "#33333333" }}>
                Created on
              </th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr
                key={doc.id}
                className="hover:bg-gray-50 text-sm text-gray-700"
                style={{ borderBottom: "1px solid #33333333" }}
              >
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg"
                    alt="pdf"
                    className="w-5 h-5"
                  />
                  {doc.name}
                </td>
                <td className="p-3">{doc.size}</td>
                <td className="p-3 flex items-center gap-2">
                  <img
                    src="https://via.placeholder.com/24"
                    alt="user"
                    className="w-6 h-6 rounded-full"
                  />
                  {doc.location}
                </td>
                <td className="p-3">—</td>
                <td className="p-3">—</td>
                <td className="p-3">{doc.createdOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TruckDock;
