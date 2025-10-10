// src/components/InspectionModal.jsx
import React, { useState } from 'react';

const InspectionModal = ({ item, onClose, onSave }) => {
  if (!item) return null;

  const [minorChecked, setMinorChecked] = useState(new Set(item.minorChecked || []));
  const [majorChecked, setMajorChecked] = useState(new Set(item.majorChecked || []));
  const [otherChecked, setOtherChecked] = useState(new Set(item.otherChecked || []));

  const handleMinorChange = (defect, checked) => {
    const newSet = new Set(minorChecked);
    if (checked) {
      newSet.add(defect);
    } else {
      newSet.delete(defect);
    }
    setMinorChecked(newSet);
  };

  const handleMajorChange = (defect, checked) => {
    const newSet = new Set(majorChecked);
    if (checked) {
      newSet.add(defect);
    } else {
      newSet.delete(defect);
    }
    setMajorChecked(newSet);
  };

  const handleOtherChange = (defect, checked) => {
    const newSet = new Set(otherChecked);
    if (checked) {
      newSet.add(defect);
    } else {
      newSet.delete(defect);
    }
    setOtherChecked(newSet);
  };

  const getStatus = () => {
    if (majorChecked.size > 0) return 'Fail';
    if (minorChecked.size > 0) return 'Pass';
    if (otherChecked.size > 0) return 'N/A';
    return 'N/A';
  };

  

  const handleSave = () => {
    const updatedItem = {
      ...item,
      minorChecked: new Set(minorChecked),
      majorChecked: new Set(majorChecked),
      otherChecked: new Set(otherChecked),
    };
    onSave(updatedItem);
  };

  const computedStatus = getStatus();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

        {item.minorDefects?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Minor Defects</h4>
            <div className="space-y-1">
              {item.minorDefects.map((defect, idx) => (
                <label
                  key={idx}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3" 
                    checked={minorChecked.has(defect)}
                    onChange={(e) => handleMinorChange(defect, e.target.checked)}
                  />
                  <span className="text-gray-700">{defect}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {item.majorDefects?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Major Defects</h4>
            <div className="space-y-1">
              {item.majorDefects.map((defect, idx) => (
                <label
                  key={idx}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3" 
                    checked={majorChecked.has(defect)}
                    onChange={(e) => handleMajorChange(defect, e.target.checked)}
                  />
                  <span className="text-gray-700">{defect}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {item.otherDefects?.length > 0 && (
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Other</h4>
            <div className="space-y-1">
              {item.otherDefects.map((defect, idx) => (
                <label
                  key={idx}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input 
                    type="checkbox" 
                    className="mt-1 mr-3" 
                    checked={otherChecked.has(defect)}
                    onChange={(e) => handleOtherChange(defect, e.target.checked)}
                  />
                  <span className="text-gray-700">{defect}</span>
                </label>
              ))}
            </div>
          </div>
        )}

       

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className=" cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionModal;