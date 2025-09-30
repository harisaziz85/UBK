import React, { useState } from "react";

const UBKTowing = () => {
  const [documents, setDocuments] = useState([
    { id: 1, name: "INV - 2388.pdf", size: "63.2 KB", location: "Lorem ipsum dolor sit amet", attachedTo: "-", labels: "-", createdOn: "06/30/2025" },
    { id: 2, name: "INV - 2388.pdf", size: "63.2 KB", location: "Lorem ipsum dolor sit amet", attachedTo: "-", labels: "-", createdOn: "06/30/2025" },
    { id: 3, name: "INV - 2388.pdf", size: "63.2 KB", location: "Lorem ipsum dolor sit amet", attachedTo: "-", labels: "-", createdOn: "06/30/2025" },
    { id: 4, name: "INV - 2388.pdf", size: "63.2 KB", location: "Lorem ipsum dolor sit amet", attachedTo: "-", labels: "-", createdOn: "06/30/2025" },
    { id: 5, name: "INV - 2388.pdf", size: "63.2 KB", location: "Lorem ipsum dolor sit amet", attachedTo: "-", labels: "-", createdOn: "06/30/2025" },
    { id: 6, name: "INV - 2388.pdf", size: "63.2 KB", location: "Lorem ipsum dolor sit amet", attachedTo: "-", labels: "-", createdOn: "06/30/2025" },
  ]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fileType, setFileType] = useState("All");
  const [vehicles, setVehicles] = useState([
    { id: 1, plate: "EX7872", attached: false },
    { id: 2, plate: "EX7872", attached: false },
    { id: 3, plate: "EX7872", attached: false },
    { id: 4, plate: "EX7872", attached: false },
    { id: 5, plate: "EX7872", attached: false },
  ]);

  const handleDocClick = (doc) => {
    setSelectedDoc(doc);
  };

  const handleUpload = () => {
    alert("Upload functionality to be implemented");
  };

  const handleSelectVehicles = () => {
    setShowModal(true);
  };

  const handleAttachVehicle = (vehicleId) => {
    setVehicles((prev) =>
      prev.map((v) =>
        v.id === vehicleId ? { ...v, attached: !v.attached } : v
      )
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAttach = () => {
    alert("Vehicles attached successfully!");
    setShowModal(false);
  };

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (fileType === "All" || doc.name.endsWith(fileType))
  );

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-semibold">Documents</h2>
        <div className="flex justify-between items-center mb-4">
          <nav className="flex space-x-4">
            <a href="#" className="text-blue-400">All Documents</a>
            <a href="#" className="text-white font-medium">UBK Towing</a>
          </nav>
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11v1.5a1.5 1.5 0 01-3 0V13H5.5zM8 9v.5a1 1 0 002 0V9h1a1 1 0 100-2H9V6a1 1 0 10-2 0v1H6a1 1 0 100 2h1z" />
            </svg>
            Upload Document
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-full bg-white text-gray-900 w-1/3"
          />
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="p-2 rounded-full bg-white text-gray-900"
          >
            <option value="All">Document File Type</option>
            <option value=".pdf">PDF</option>
            <option value=".docx">DOCX</option>
          </select>
          <button className="p-2 rounded-full bg-gray-500 text-white">Filters</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full  rounded-lg">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2"></th>
                <th className="p-2">File Size</th>
                <th className="p-2">Location</th>
                <th className="p-2">Attached To</th>
                <th className="p-2">Labels</th>
                <th className="p-2">Created on</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr
                  key={doc.id}
                  onClick={() => handleDocClick(doc)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <td className="p-2 flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-red-500">PDF</span> {doc.name}
                  </td>
                  <td className="p-2">{doc.size}</td>
                  <td className="p-2">{doc.location}</td>
                  <td className="p-2">{doc.attachedTo}</td>
                  <td className="p-2">{doc.labels}</td>
                  <td className="p-2">{doc.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sidebar (Details Panel) */}
      {selectedDoc && (
        <div className="fixed top-0 right-0 h-screen w-1/2 bg-white text-gray-800 p-6 transition-all duration-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-red-600">Insurance slip</h2>
            <div>
              <button className="text-gray-500 mr-2">...</button>
              <button className="text-gray-500">Download</button>
            </div>
          </div>
          <div className="border-2 border-dashed border-gray-300 h-48 flex items-center justify-center mb-4">
            <p className="text-gray-500">Drag and drop files to upload</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-500 text-sm">Location</p>
              <p className="text-gray-800 font-medium">UBK Towing</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Attached to</p>
              <button
                onClick={handleSelectVehicles}
                className="text-blue-600 font-medium hover:underline"
              >
                Select Vehicles
              </button>
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
      )}

      {/* Modal for Vehicle Selection */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-lg font-semibold mb-4">Attach documents to Vehicles</h2>
            <p className="text-gray-500 mb-4">Drag and drop files to upload</p>
            <input
              type="text"
              placeholder="Find Vehicles, types, group"
              className="w-full p-2 mb-4 rounded-full border border-gray-300"
            />
            <div className="flex space-x-4 mb-4">
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
                Attached Devices <span className="bg-blue-600 text-white rounded-full px-2">0</span>
              </button>
              <button className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full">
                All Vehicles <span className="bg-blue-600 text-white rounded-full px-2">0</span>
              </button>
            </div>
            <div className="space-y-2 mb-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="Vehicle"
                      className="w-12 h-12 mr-2"
                    />
                    <span>{vehicle.plate}</span>
                  </div>
                  <button
                    onClick={() => handleAttachVehicle(vehicle.id)}
                    className={`px-4 py-2 rounded ${vehicle.attached ? "bg-green-500" : "bg-blue-600"} text-white`}
                  >
                    {vehicle.attached ? "Attached" : "Attach"}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAttach}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Attach
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UBKTowing;