// src/components/AdminForms.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const AdminForms = () => {
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const formsData = [
    { formNumber: "RAM 343", type: "TY-989", date: "09/11/2025", driver: "GMC", vehicle: "EX7872" },
    { formNumber: "RAM 343", type: "TY-989", date: "09/11/2025", driver: "GMC", vehicle: "EX7872" },
    { formNumber: "RAM 343", type: "TY-989", date: "09/11/2025", driver: "GMC", vehicle: "EX7872" },
    { formNumber: "RAM 343", type: "TY-989", date: "09/11/2025", driver: "GMC", vehicle: "EX7872" },
    { formNumber: "RAM 343", type: "TY-989", date: "09/11/2025", driver: "GMC", vehicle: "EX7872" },
    { formNumber: "RAM 343", type: "TY-989", date: "09/11/2025", driver: "GMC", vehicle: "EX7872" },
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedForms(formsData.map((_, index) => index));
      setSelectAll(true);
    } else {
      setSelectedForms([]);
      setSelectAll(false);
    }
  };

  const handleSelectRow = (index) => {
    const newSelectedForms = [...selectedForms];
    const selectedIndex = newSelectedForms.indexOf(index);
    if (selectedIndex === -1) {
      newSelectedForms.push(index);
    } else {
      newSelectedForms.splice(selectedIndex, 1);
    }
    setSelectedForms(newSelectedForms);
    setSelectAll(newSelectedForms.length === formsData.length);
  };

  return (
    <div className="w-full  bg-white shadow-md rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Forms</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 pl-8 border border-gray-300 rounded"
          />
          <FaSearch className="absolute left-2 top-2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-2 py-2">
                <div className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span>Forms Numbers</span>
                </div>
              </th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Driver</th>
              <th className="px-4 py-2">Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {formsData.map((form, index) => (
              <tr
                key={index}
                className={`bg-white border-b hover:bg-gray-50 ${
                  selectedForms.includes(index) ? "bg-blue-50" : ""
                }`}
              >
                <td className="px-2 py-2">
                  <div className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={selectedForms.includes(index)}
                      onChange={() => handleSelectRow(index)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span>{form.formNumber}</span>
                  </div>
                </td>
                <td className="px-4 py-2">{form.type}</td>
                <td className="px-4 py-2">{form.date}</td>
                <td className="px-4 py-2">{form.driver}</td>
                <td className="px-4 py-2">
                  <img
                    src="https://via.placeholder.com/30"
                    alt="Vehicle"
                    className="w-6 h-6 rounded"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminForms;