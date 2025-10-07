import React, { useState } from "react";

const VehicleAssignment = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const vehicles = Array(8).fill({
    id: "EX06-02",
    status: "Active - WL",
    image: "https://via.placeholder.com/60x40?text=Car",
  });

  const days = Array.from({ length: 13 }, (_, i) => i + 1);

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const closePanel = () => {
    setSelectedVehicle(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
        >
          + Add Assignment
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="w-full sm:w-64 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
          />
        </div>
        <div className="flex items-center gap-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-700">
            <option>Vehicle</option>
          </select>
          <button className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100">
            A - Z
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
        {vehicles.map((vehicle, index) => (
          <div
            key={index}
            onClick={() => handleVehicleClick(vehicle)}
            className="grid grid-cols-[200px_repeat(13,1fr)] border-t border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
          >
            {/* Vehicle Info */}
            <div className="flex items-center gap-3 px-4 py-3 border-r border-gray-200">
              <img
                src={vehicle.image}
                alt="vehicle"
                className="w-12 h-8 rounded object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{vehicle.id}</p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                  {vehicle.status}
                </p>
              </div>
            </div>

            {/* Calendar Cells */}
            {days.map((day) => (
              <div
                key={day}
                className={`border-l border-gray-200 px-2 py-3 text-sm ${
                  index === 0 && day === 4
                    ? "bg-blue-50 text-blue-800 font-medium"
                    : ""
                }`}
              >
                {index === 0 && day === 4 && (
                  <div>
                    <p>John Doe EMP112233</p>
                    <p className="text-xs text-gray-500">04/09/2025 3:05pm</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Right Slide Panel */}
      {selectedVehicle && (
        <div className="fixed top-0 right-0 w-full sm:w-[400px] h-full bg-white shadow-2xl border-l border-gray-200 z-50 animate-slideIn">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Assignment #1333
            </h2>
            <button
              onClick={closePanel}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Close
            </button>
          </div>

          <div className="p-6 space-y-5">
            <button className="w-full border border-gray-300 rounded-md py-2 hover:bg-gray-100">
              Unassign Vehicle
            </button>

            {/* Assigned Vehicle */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Assigned Vehicle
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={selectedVehicle.image}
                  alt="vehicle"
                  className="w-12 h-8 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {selectedVehicle.id}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    {selectedVehicle.status}
                  </p>
                </div>
              </div>
            </div>

            {/* Operator */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Operator
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src="https://via.placeholder.com/60x40?text=Driver"
                  alt="operator"
                  className="w-12 h-8 rounded object-cover"
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">EMP112233</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Start Date
              </h3>
              <p className="text-sm text-blue-800">
                04/09/2025 - 04/09/2025
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                End Date
              </h3>
              <p className="text-sm text-blue-800">
                04/09/2025 - 04/09/2025
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Assignment</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Vehicle</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700">
                  <option>Select Vehicle</option>
                  {vehicles.map((vehicle, index) => (
                    <option key={index} value={vehicle.id}>{vehicle.id}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Operator</label>
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700">
                  <option>Select Operator</option>
                  <option>John Doe EMP112233</option>
                </select>
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-700"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-900 text-white text-sm rounded-md hover:bg-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleAssignment;