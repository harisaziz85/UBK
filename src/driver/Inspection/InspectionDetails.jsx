import React, { useState } from "react";
import { ChevronRight, ExternalLink } from "lucide-react";
import logo from '../../assets/image 104.png'

const InspectionDetails = () => {
  const [inspectionDetails] = useState({
    vehicle: "EX7872",
    inspectionForm: "Pre-trip Inspection",
    started: "Tue, Feb 20 2025 10:30am",
    submitted: "Tue, Feb 20 2025 10:30am",
    duration: "1m 23s",
    source: "App name",
    submittedBy: "John Doe EMP112233",
  });

  const [inspectionItems] = useState([
    { id: 1, name: "Air Brake System", status: "Fail", image: null, expandable: false },
    { id: 2, name: "Cargo Securement", status: "Pass", image: null, expandable: false },
    { id: 3, name: "Driver Controls", status: "Pass", image: null, expandable: false },
    { id: 4, name: "Cab", status: "Pass", image: null, expandable: false },
    { id: 5, name: "Driver Seat", status: "Pass", image: null, expandable: false },
    { id: 6, name: "Driver Seat", status: "Pass", image: null, expandable: false },
    { id: 7, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
    { id: 8, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
    { id: 9, name: "Cab", status: "Pass", image: null, expandable: false },
    { id: 10, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
    { id: 11, name: "Air Brake System", status: "Fail", image: logo, expandable: true },
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white  px-6 py-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          
        </div>
        <h1 className="text-[24px] text-[#333333] robotosemibold">Submission #536472</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-2 sm:p-6">
        {/* Left Panel - Inspection Details */}
        <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-[24px]  robotosemibold text-[#333333] mb-6">Inspection Details</h2>
          <div className="space-y-5 ">
            <div className="flex  justify-between border-b border-[#33333333]">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Vehicle</p>
              <div className="flex items-center  pb-2">
                  <img src={logo} className="w-10 h-10  rounded mr-3 flex items-center justify-center"/>
                <span className="robotomedium text-[14px] text-[#043677]">{inspectionDetails.vehicle}</span>
              </div>

            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Inspection Form</p>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-[#3CCE14] rounded-full mr-2"></span>
                <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.inspectionForm}</span>
              </div>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Started</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.started}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Submitted</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.submitted}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Duration</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.duration}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Submission Source</p>
              <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.source}</span>
            </div>

            <div className="border-b flex justify-between border-[#33333333] pb-2">
              <p className="text-[#333333] robotoregular  text-[14px] mb-2">Submitted By</p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-orange-400 rounded-full mr-3 flex items-center justify-center text-white text-sm font-medium">
                  JD
                </div>
                <span className="robotoregular text-[14px] text-[#333333E5]">{inspectionDetails.submittedBy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Inspection Items */}
        <div className="w-full lg:flex-1 bg-white rounded-lg shadow-sm  p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[24px] text-[#333333] robotosemibold">Inspection Items</h2>
        
          </div>

          <div className="space-y-0 ">
            {inspectionItems.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between py-4 ${
                  index !== inspectionItems.length - 1 ? 'border-b border-[#33333333]' : ''
                }`}
              >
                <div className="flex items-center flex-1">
                  {item.expandable && (
                    <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
                  )}
                  {item.image && (
                    <img
                      src={item.image}
                      alt="Inspection"
                      className="w-12 h-12 rounded mr-3 object-cover"
                    />
                  )}
                  <span className="robotomedium text-[14px] text-[#333333CC]">{item.name}</span>
                  {item.expandable && (
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-2" />
                  )}
                </div>
                <div className="flex items-center">
                  {item.status === "Fail" && (
                    <span className="text-red-500 mr-2">✕</span>
                  )}
                  {item.status === "Pass" && (
                    <span className="text-green-500 mr-2">✓</span>
                  )}
                  <span
                    className={`robotomedium text-[14px] ${
                      item.status === "Pass" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-6">Created 1 day ago</p>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails;