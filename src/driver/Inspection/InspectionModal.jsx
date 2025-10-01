// src/components/InspectionModal.jsx
import React from 'react';

const InspectionModal = ({ item, onClose, onSave }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm bg-opacity-50 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

        {item.minorDefects?.length > 0 && (
          <div className="mb-0">
            <h4 className="font-semibold text-gray-900 mb-0">Minor Defects</h4>
            <div className="space-y-1">
              {item.minorDefects.map((defect, idx) => (
                <label
                  key={idx}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input type="checkbox" className="mt-1 mr-3" />
                  <span className="text-gray-700">{defect}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {item.majorDefects?.length > 0 && (
          <div className="mb-0">
            <h4 className="font-semibold text-gray-900 mb-0">Major Defects</h4>
            <div className="space-y-1">
              {item.majorDefects.map((defect, idx) => (
                <label
                  key={idx}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input type="checkbox" className="mt-1 mr-3" />
                  <span className="text-gray-700">{defect}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {item.otherDefects?.length > 0 && (
          <div className="mb-0">
            <h4 className="font-semibold text-gray-900 mb-0">Other</h4>
            <div className="space-y-1">
              {item.otherDefects.map((defect, idx) => (
                <label
                  key={idx}
                  className="flex items-start cursor-pointer hover:bg-gray-50 p-2 rounded"
                >
                  <input type="checkbox" className="mt-1 mr-3" />
                  <span className="text-gray-700">{defect}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default InspectionModal;
