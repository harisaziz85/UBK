import React, { useState } from "react";

const PreTripChecklist = () => {
  const [vehicleDetails, setVehicleDetails] = useState({
    plateFront: "",
    plateRear: "",
    platePassenger: "",
    currentMileage: "",
    startDate: "",
  });
  const [checklistItems, setChecklistItems] = useState({
    airBrakeSystem: "N/A",
    cab: "N/A",
    cargoSecurement: "N/A",
    couplingDevices: "N/A",
    dangerousGoods: "N/A",
    driverControls: "N/A",
    driverSeat: "N/A",
    electricSystem: "N/A",
    emergencyEquipment: "N/A",
    exhaustSystem: "N/A",
    frameCargo: "N/A",
    fuelSystem: "N/A",
    glassMirrors: "N/A",
    heaterDefroster: "N/A",
    horn: "N/A",
    hydraulicBrakeSystem: "N/A",
    lampReflectors: "N/A",
    steering: "N/A",
    suspensionSystem: "N/A",
    tires: "N/A",
    wheelsHubsFasteners: "N/A",
    windshieldWiperWasher: "N/A",
  });
  const [photos, setPhotos] = useState({
    front: null,
    rear: null,
    driverSide: null,
    passengerSide: null,
  });
  const [inspectedBy, setInspectedBy] = useState("");
  const [inspectionDate, setInspectionDate] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicleDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleChecklistChange = (e) => {
    const { name, value } = e.target;
    setChecklistItems((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoCapture = (side) => {
    // Simulate opening camera (in a real app, this would trigger a file input or camera API)
    alert(`Opening camera to capture ${side} photo`);
    // Placeholder for photo upload logic
    setPhotos((prev) => ({ ...prev, [side]: "Captured" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Checklist Submitted:", { vehicleDetails, checklistItems, photos, inspectedBy, inspectionDate });
    alert("Inspection saved successfully!");
  };

  return (
    <div className="border border-[#F7F7F7] p-4 bg-white  mx-auto">
      <h2 className="text-xl font-semibold mb-4">Pre-Trip Safety Checklist</h2>

      {/* Vehicle Details Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Vehicle Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="plateFront"
            value={vehicleDetails.plateFront}
            onChange={handleInputChange}
            placeholder="Plate # (Front)"
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="plateRear"
            value={vehicleDetails.plateRear}
            onChange={handleInputChange}
            placeholder="Plate # (Rear)"
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="platePassenger"
            value={vehicleDetails.platePassenger}
            onChange={handleInputChange}
            placeholder="Plate # (Passenger Side)"
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            name="currentMileage"
            value={vehicleDetails.currentMileage}
            onChange={handleInputChange}
            placeholder="Current Mileage"
            className="border border-gray-300 rounded p-2"
          />
          <input
            type="date"
            name="startDate"
            value={vehicleDetails.startDate}
            onChange={handleInputChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
      </div>

      {/* Photo Capture Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Photos of the Truck</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-300 rounded p-4 text-center">
            <p>Front of Truck</p>
            <button
              onClick={() => handlePhotoCapture("front")}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Open Camera
            </button>
            {photos.front && <p className="mt-2 text-green-600">Photo Captured</p>}
          </div>
          <div className="border border-gray-300 rounded p-4 text-center">
            <p>Driver Side of Truck</p>
            <button
              onClick={() => handlePhotoCapture("driverSide")}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Open Camera
            </button>
            {photos.driverSide && <p className="mt-2 text-green-600">Photo Captured</p>}
          </div>
          <div className="border border-gray-300 rounded p-4 text-center">
            <p>Rear of Truck</p>
            <button
              onClick={() => handlePhotoCapture("rear")}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Open Camera
            </button>
            {photos.rear && <p className="mt-2 text-green-600">Photo Captured</p>}
          </div>
          <div className="border border-gray-300 rounded p-4 text-center">
            <p>Passenger Side of Truck</p>
            <button
              onClick={() => handlePhotoCapture("passengerSide")}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Open Camera
            </button>
            {photos.passengerSide && <p className="mt-2 text-green-600">Photo Captured</p>}
          </div>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Items Checklist</h3>
        {Object.entries(checklistItems).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between mb-2">
            <label className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</label>
            <select
              name={key}
              value={value}
              onChange={handleChecklistChange}
              className="border border-gray-300 rounded p-1"
            >
              <option value="N/A">N/A</option>
              <option value="Pass">Pass</option>
            </select>
          </div>
        ))}
      </div>

      {/* Inspection Details */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Inspection Details</h3>
        <input
          type="date"
          value={inspectionDate}
          onChange={(e) => setInspectionDate(e.target.value)}
          className="border border-gray-300 rounded p-2 mb-2 w-full"
          placeholder="Inspection Date"
        />
        <input
          type="text"
          value={inspectedBy}
          onChange={(e) => setInspectedBy(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
          placeholder="Inspected By"
        />
      </div>

      {/* Submit Button */}
      <div className="text-right">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Save Inspection
        </button>
      </div>
    </div>
  );
};

export default PreTripChecklist;