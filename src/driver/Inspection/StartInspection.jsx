import React, { useState } from 'react';
import { X, Camera, ChevronDown } from 'lucide-react';
import inspectionCategories from './InspectionPopupData';
import InspectionModal from './InspectionModal';
import CameraModal from './CameraModel';



const VehicleInspectionSystem = () => {
  const [activeTab, setActiveTab] = useState('checklist');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [photoContext, setPhotoContext] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedInspectionItem, setSelectedInspectionItem] = useState(null);

  const [inspectionData, setInspectionData] = useState({
    date: '',
    currentMileage: '',
    inspectedBy: 'Ali Janna'
  });




  const instructionCards = [
    { id: 'air-brake', title: 'Air Brake system', color: 'bg-blue-500' },
    { id: 'cab', title: 'Cab', color: 'bg-gray-700' },
    { id: 'cargo-securement', title: 'Cargo Securement', color: 'bg-gray-700' },
    { id: 'coupling-devices', title: 'Coupling Devices', color: 'bg-gray-700' },
    { id: 'dangerous-goods', title: 'Dangerous Goods', color: 'bg-gray-700' },
    { id: 'driver-controls', title: 'Driver Controls', color: 'bg-gray-700' },
    { id: 'electric-brake', title: 'Electric Brake System', color: 'bg-gray-700' }
  ];

  const openInspectionModal = (item) => {
    setSelectedInspectionItem(item);
     setIsModalOpen(true);
  };

  const closeInspectionModal = () => {
    setSelectedInspectionItem(null);
  };

  const openPhotoModal = (context) => {
    setPhotoContext(context);
    setShowPhotoModal(true);
  };

  const getStatusColor = (status) => {
    if (status === 'Pass') return 'text-green-600';
    if (status === 'Fail') return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white  sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Pre-Trip Safety Checklist</h1>
          <p className="text-gray-600 text-sm mt-1">Complete all inspection items before operating the vehicle.</p>
        </div>
      </div>


      {/* Instructions Section */}
      {activeTab === 'instructions' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {instructionCards.map((card) => (
              <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${card.color} h-32 flex items-center justify-center`}>
                  <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">i</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-xs text-gray-600 mb-3">Major Defects</p>
                  <ul className="text-xs text-gray-700 space-y-1 mb-4">

                    {inspectionCategories.find(cat => cat.id === card.id)?.instructions.slice(0, 2).map((inst, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="mr-2">□</span>
                        <span>{inst}</span>
                      </li>
                    ))}

                  </ul>
                  <button className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700">
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'checklist' && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Vehicle Selection */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Vehicle for Inspection
            </label>
            <div className="relative">
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Search Vehicle</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          {/* Vehicle Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Name</label>
                <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                  REQ-4052
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Plate</label>
                <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                  REQ-4052
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Province</label>
              <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
                REQ-4052
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  value={inspectionData.date}
                  onChange={(e) => setInspectionData({...inspectionData, date: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Current Mileage</label>
                <input
                  type="text"
                  placeholder="Enter current mileage"
                  value={inspectionData.currentMileage}
                  onChange={(e) => setInspectionData({...inspectionData, currentMileage: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>


          {/* Photo Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer" onClick={() => openPhotoModal('front')}>
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm font-medium text-gray-700">Front of the Truck</p>
                <p className="text-xs text-gray-500 mt-1">Take Photo of the Front of the Truck</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer" onClick={() => openPhotoModal('driver')}>
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm font-medium text-gray-700">Driver Side the Truck</p>
                <p className="text-xs text-gray-500 mt-1">Take Photo of the Driver Side of the Truck</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer" onClick={() => openPhotoModal('rear')}>
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm font-medium text-gray-700">Rear of the Truck</p>
                <p className="text-xs text-gray-500 mt-1">Take photo of the Rear of the Truck</p>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 cursor-pointer" onClick={() => openPhotoModal('passenger')}>
                <Camera className="mx-auto mb-2 text-gray-400" size={32} />
                <p className="text-sm font-medium text-gray-700">Passenger Side of the Truck</p>
                <p className="text-xs text-gray-500 mt-1">Take photo of the passenger Side of the Truck</p>
              </div>
            </div>
          </div>


          {/* Items Checklist */}
          <div className=" p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Items Checklist</h2>
            <div className="space-y-2">
              {inspectionCategories.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-6 px-4 border border-[#E9E9E9] rounded-[6px] bg-[#FFFFFF] hover:bg-gray-50 cursor-pointer"
                  onClick={() => openInspectionModal(item)}
                >
                  <span className="text-[#333333CC] roboto-medium text-[14px]">{item.title}</span>
                  <div className="flex flex-col items-center gap-4">
                    <span className={`robotosemibold text-[13px] ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <button className="text-blue-600 text-sm hover:underline">
                      View Instructions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inspection Remarks */}
         <div className=" p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Inspection Remarks</h2>
                <span className="text-green-600 font-semibold">Pass</span>
            </div>
            
            {/* Input field instead of button */}
            <input
                type="text"
                placeholder="Enter remarks..."
                className="w-full px-4 py-8  bg-[#FBFBFB] rounded-[8px] text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                style={{border:"1px solid #E9E9E9"}}
            />
            </div>


          {/* Initial Inspection By */}
         <div className="p-6 mb-6">
  <h2 className="text-lg font-semibold text-gray-900 mb-4">Initial Inspection by</h2>
  <div className="space-y-4">
    <div>
      <label className="block text-sm text-gray-600 mb-1">Inspected On</label>
      <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
        10/08/2025
      </div>
    </div>
    <div>
      <label className="block text-sm text-gray-600 mb-1">Inspected By</label>
      <div className="bg-gray-50 px-4 py-2 rounded border border-gray-200 text-gray-700">
        {inspectionData.inspectedBy}
      </div>
    </div>
    <div className="space-y-3">
    <label className="block text-sm font-medium text-gray-700 mb-2">Driver's Sign</label>

      <div className="flex items-start">
        <input type="checkbox" className="mt-1 mr-3" />
        <label className="text-sm text-gray-700">
          I declare that the vehicle(s) listed has been inspected in Accordance with Ontario Schedule 1 Daily Inspections of trucks, tractors,
          <br />
          and trailers (Reg. 199/07)
        </label>
      </div>
      
    </div>
    <div>
      <div className="relative">
        <div className="bg-gray-50 px-4 py-3 rounded border border-gray-200 min-h-[60px] text-gray-700">
          <textarea
            placeholder="Enter signature here..."
            className="w-full h-12 border-none bg-transparent resize-none outline-none text-sm"
          />
        </div>
      
      </div>
    </div>
  </div>
</div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <button className=" cursor-pointer px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                Cancel
            </button>
            <button className=" cursor-pointer px-6 py-3 bg-[#043677] text-white rounded-lg font-medium hover:bg-[#043677]">
                Save Inspection
            </button>
            </div>

        </div>
      )}


      {/* Inspection Item Modal */}
      {isModalOpen && selectedInspectionItem && (
        <InspectionModal
          item={selectedInspectionItem}
          onClose={closeInspectionModal}
          onSave={closeInspectionModal}
        />
      )}

            {/* Photo Modal */}
            {showPhotoModal && (
            <CameraModal
                context={photoContext}
                onClose={() => setShowPhotoModal(false)}
            />
            )}


    </div>
  );
};

export default VehicleInspectionSystem;