import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VehicleAssignment = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vehicleLoading, setVehicleLoading] = useState(false);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [assignmentData, setAssignmentData] = useState({
    vehicleId: "",
    driverId: "",
    startDate: "",
    endDate: "",
  });

  const days = Array.from({ length: 13 }, (_, i) => i + 1);

  // Fetch all drivers
  const fetchDrivers = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to access drivers.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/admin/driver/get`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Drivers fetch error:", response.status, errorText);
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        }
        throw new Error(`Failed to fetch drivers: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      setDrivers(data.drivers || []);
    } catch (err) {
      console.error("Error fetching drivers:", err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Fetch vehicles with pagination
  const fetchVehicles = async (page = 1, limit = 10) => {
    setVehicleLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Please log in to access this data.", {
        position: "top-right",
        autoClose: 3000,
      });
      setVehicleLoading(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/admin/vehicle?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Vehicles fetch error:", response.status, errorText);
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        }
        throw new Error(`Failed to fetch vehicles: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("Vehicles response:", data);

      const mappedVehicles = (data.vehicles || []).map((vehicle) => ({
        id: vehicle._id,
        name: vehicle.name || "N/A",
        status: vehicle.assignment?.driverId ? "Assigned" : "Unassigned",
        image: vehicle.photo || "https://via.placeholder.com/60x40?text=Car",
        vin: vehicle.vin || "N/A",
        year: vehicle.year || "N/A",
        make: vehicle.make || "N/A",
        model: vehicle.model || "N/A",
        color: vehicle.color || "N/A",
        currentMilage: vehicle.currentMilage || 0,
        type: vehicle.type || "Car",
        fuelType: vehicle.fuelType || "N/A",
        licensePlate: vehicle.licensePlate || "N/A",
        driverId: vehicle.assignment?.driverId?._id || null,
        driverName: vehicle.assignment?.driverId?.name || "N/A",
        driverEmployeeNumber: vehicle.assignment?.driverId?.employeeNumber || "N/A",
        startDate: vehicle.assignment?.startDate
          ? new Date(vehicle.assignment.startDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }) +
            " " +
            new Date(vehicle.assignment.startDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        endDate: vehicle.assignment?.endDate
          ? new Date(vehicle.assignment.endDate).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }) +
            " " +
            new Date(vehicle.assignment.endDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "N/A",
        _id: vehicle._id,
        documents: [],
      }));

      setVehicles(mappedVehicles);
      setTotalPages(data.pages || 1);
      setTotalVehicles(data.total || 0);
      setCurrentPage(page);
      setLoading(false);
      setVehicleLoading(false);
    } catch (err) {
      console.error("Error fetching vehicles:", err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
      setVehicleLoading(false);
    }
  };

  // Fetch documents for a specific vehicle
  const fetchVehicleDocuments = async (vehicleId) => {
    if (!vehicleId) return;

    setDocumentsLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Please log in to access documents.", {
        position: "top-right",
        autoClose: 3000,
      });
      setDocumentsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/common/document/by-vehicle/${vehicleId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Documents fetch error:", response.status, errorText);
        if (response.status === 401) {
          throw new Error("Unauthorized: Please log in again.");
        }
        throw new Error(`Failed to fetch documents: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("Documents response:", data);
      setDocuments(data.documents || []);
      setDocumentsLoading(false);
    } catch (err) {
      console.error("Error fetching documents:", err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setDocuments([]);
      setDocumentsLoading(false);
    }
  };

  // Assign vehicle to driver
  const assignVehicle = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to assign a vehicle.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!assignmentData.vehicleId || !assignmentData.driverId || !assignmentData.startDate || !assignmentData.endDate) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/admin/vehicle/${assignmentData.vehicleId}/assign/${assignmentData.driverId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            startDate: new Date(assignmentData.startDate).toISOString(),
            endDate: new Date(assignmentData.endDate).toISOString(),
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Assignment error:", response.status, errorText);
        throw new Error(`Failed to assign vehicle: ${response.status} ${errorText}`);
      }

      toast.success("Vehicle assigned successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setIsModalOpen(false);
      fetchVehicles(currentPage); // Refresh vehicle list
    } catch (err) {
      console.error("Error assigning vehicle:", err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  // Initial load
  useEffect(() => {
    fetchVehicles(1);
    fetchDrivers();
  }, []);

  // Fetch documents when vehicle is selected
  useEffect(() => {
    if (selectedVehicle) {
      fetchVehicleDocuments(selectedVehicle._id);
    }
  }, [selectedVehicle]);

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const closePanel = () => {
    setSelectedVehicle(null);
    setDocuments([]);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setAssignmentData({ vehicleId: "", driverId: "", startDate: "", endDate: "" });
  };

  const handleAssignmentChange = (e) => {
    const { name, value } = e.target;
    setAssignmentData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchVehicles(page);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 justify-center items-center">
        <div className="animate-pulse  w-full ">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-2">
            {Array(5).fill().map((_, index) => (
              <div key={index} className="grid grid-cols-[200px_repeat(13,1fr)] bg-white border border-gray-200 rounded">
                <div className="flex items-center gap-3 px-4 py-3">
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                {days.map((day) => (
                  <div key={day} className="border-l border-gray-200 px-2 py-3">
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative p-6 bg-gray-50 min-h-screen overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Vehicle Assignments
          </h1>
          <p className="text-sm text-gray-500">
            Assign available vehicles to drivers and manage their usage in one place
          </p>
        </div>
        <button
          onClick={openModal}
          className="mt-3 sm:mt-0 bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-md text-sm font-medium shadow"
          disabled={vehicleLoading}
        >
          {vehicleLoading ? "Loading..." : "+ Add Assignment"}
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-600">
          Showing {vehicles.length} of {totalVehicles} vehicles
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || vehicleLoading}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || vehicleLoading}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-700">&lt;</button>
          <h2 className="text-lg font-semibold text-gray-700">September 2025</h2>
          <button className="text-gray-500 hover:text-gray-700">&gt;</button>
        </div>
        <div className="flex items-center gap-3">
          <button className="border border-gray-300 rounded-md px-3 py-1 text-sm hover:bg-gray-100">
            Today
          </button>
          <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-700">
            <option>Month</option>
          </select>
        </div>
      </div>

      {/* Scrollable Table Container */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        {/* Table Header */}
        <div className="grid grid-cols-[200px_repeat(13,1fr)] border-b border-gray-300 bg-gray-100 text-sm font-medium text-gray-600">
          <div className="px-4 py-2">Vehicle</div>
          {days.map((day) => (
            <div key={day} className="px-4 py-2 text-center border-l border-gray-300">
              {day}
            </div>
          ))}
        </div>

        {/* Table Body */}
        {vehicleLoading ? (
          <div className="animate-pulse space-y-2">
            {Array(5).fill().map((_, index) => (
              <div key={index} className="grid grid-cols-[200px_repeat(13,1fr)] bg-white border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-3 border-r border-gray-200">
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
                {days.map((day) => (
                  <div key={day} className="border-l border-gray-200 px-2 py-3">
                    <div className="h-4 bg-gray-200 rounded w-12 mx-auto"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              onClick={() => handleVehicleClick(vehicle)}
              className="grid grid-cols-[200px_repeat(13,1fr)] border-t border-gray-200 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {/* Vehicle Info */}
              <div className="flex items-center gap-3 px-4 py-3 border-r border-gray-200">
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-12 h-8 rounded object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/60x40?text=Car";
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{vehicle.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${
                        vehicle.status === "Assigned" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {vehicle.status}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {vehicle.make} {vehicle.model}
                  </p>
                </div>
              </div>

              {/* Calendar Cells */}
              {days.map((day) => (
                <div
                  key={day}
                  className={`border-l border-gray-200 px-2 py-3 text-sm ${
                    vehicle.driverId && day === 4
                      ? "bg-blue-50 text-blue-800 font-medium"
                      : ""
                  }`}
                >
                  {vehicle.driverId && day === 4 && (
                    <div>
                      <p>{vehicle.driverName}</p>
                      <p className="text-xs text-gray-500">{vehicle.startDate}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-600">
          Showing {vehicles.length} of {totalVehicles} vehicles
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || vehicleLoading}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || vehicleLoading}
            className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Right Slide Panel */}
      {selectedVehicle && (
        <div className="fixed top-0 right-0 w-full sm:w-[450px] h-full bg-white shadow-2xl border-l border-gray-200 z-50 animate-slideIn overflow-y-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-lg font-semibold text-gray-800">
              Assignment #{selectedVehicle.id.slice(-4)}
            </h2>
            <button
              onClick={closePanel}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ×
            </button>
          </div>

          <div className="p-6 space-y-5">
            <button
              className="w-full border border-red-300 text-red-700 rounded-md py-2 hover:bg-red-50"
              disabled={vehicleLoading}
            >
              Unassign Vehicle
            </button>

            {/* Assigned Vehicle */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Assigned Vehicle
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-16 h-10 rounded object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80x50?text=Car";
                  }}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedVehicle.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span
                      className={`w-2 h-2 rounded-full inline-block ${
                        selectedVehicle.status === "Assigned" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    {selectedVehicle.status} • {selectedVehicle.type}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    VIN: {selectedVehicle.vin} • {selectedVehicle.currentMilage} km
                  </p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Documents ({documents.length})
                {documentsLoading && (
                  <span className="text-xs text-gray-500 ml-2">Loading...</span>
                )}
              </h3>
              {documents.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {documents.map((doc, index) => (
                    <div key={doc._id || index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <p className="text-xs font-medium text-gray-800">{doc.title || doc.name || "Document"}</p>
                        <p className="text-xs text-gray-500">
                          {doc.type || "File"} • {new Date(doc.createdAt || doc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            doc.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {doc.status || "Unknown"}
                        </span>
                        <button className="text-xs text-blue-600 hover:text-blue-800">View</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : !documentsLoading ? (
                <p className="text-sm text-gray-500 italic">No documents found for this vehicle.</p>
              ) : (
                <p className="text-sm text-gray-500">Loading documents...</p>
              )}
            </div>

            {/* Operator */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Operator
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/60x40?text=Driver"
                  alt="operator"
                  className="w-12 h-8 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">{selectedVehicle.driverName}</p>
                  <p className="text-xs text-gray-500">{selectedVehicle.driverEmployeeNumber}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  Start Date
                </h3>
                <p className="text-sm text-blue-800">{selectedVehicle.startDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">
                  End Date
                </h3>
                <p className="text-sm text-blue-800">{selectedVehicle.endDate}</p>
              </div>
            </div>

            {/* Additional Vehicle Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Color</p>
                <p className="font-medium">{selectedVehicle.color}</p>
              </div>
              <div>
                <p className="text-gray-500">Fuel Type</p>
                <p className="font-medium">{selectedVehicle.fuelType}</p>
              </div>
              <div>
                <p className="text-gray-500">License Plate</p>
                <p className="font-medium">{selectedVehicle.licensePlate}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile slide panel */}
      {selectedVehicle && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={closePanel}
        />
      )}

      {/* Add Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Add Assignment</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
                <select
                  name="vehicleId"
                  value={assignmentData.vehicleId}
                  onChange={handleAssignmentChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  disabled={vehicleLoading}
                >
                  <option value="">Select Vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle._id} value={vehicle._id}>
                      {vehicle.name} - {vehicle.make} {vehicle.model}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver</label>
                <select
                  name="driverId"
                  value={assignmentData.driverId}
                  onChange={handleAssignmentChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
                >
                  <option value="">Select Driver</option>
                  {drivers.map((driver) => (
                    <option key={driver._id} value={driver._id}>
                      {driver.name} ({driver.employeeNumber})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={assignmentData.startDate}
                    onChange={handleAssignmentChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={assignmentData.endDate}
                    onChange={handleAssignmentChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  disabled={vehicleLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={assignVehicle}
                  className="px-4 py-2 bg-blue-900 text-white text-sm rounded-md hover:bg-blue-800 disabled:opacity-50"
                  disabled={vehicleLoading}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default VehicleAssignment;