import React, { useState } from 'react';
import DatePickerComponent from '../Postform/CustomDatePicker'; // Adjust the import path as needed
import { Calendar } from 'lucide-react';

const AddMeterPopup = ({ onClose }) => {
  const [meterDate, setMeterDate] = useState('');

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[24px] p-8 w-[600px] shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add Meter Entry</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle</label>
            <select className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
              <option>Please Select</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Meter</label>
            <input
              type="number"
              defaultValue=""
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Meter Date</label>
            <DatePickerComponent
              label=""
              value={meterDate}
              onChange={setMeterDate}
            />
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeterPopup;