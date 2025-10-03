import React, { useState } from "react";

const DateInputCanada = () => {
  const [inspectionData, setInspectionData] = useState({
    date: ""
  });

  const handleDateChange = (e) => {
    const selectedDate = e.target.value; // YYYY-MM-DD
    setInspectionData({ ...inspectionData, date: selectedDate });

    if (selectedDate) {
      // Convert to Date and log in Canada timezone
      const canadaDate = new Date(selectedDate + "T00:00:00Z").toLocaleString(
        "en-CA",
        {
          timeZone: "America/Toronto", // Change to America/Vancouver for BC
          dateStyle: "full",
          timeStyle: "long"
        }
      );

      console.log("Selected Date in Canada (Toronto):", canadaDate);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-6">
      <label className="block text-sm text-gray-600 mb-1">Date</label>
      <input
        type="date"
        value={inspectionData.date}
        onChange={handleDateChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

export default DateInputCanada;
