import React, { useState } from "react";
import { ChevronLeft, Search, FileText, MoreVertical } from "lucide-react";
import { useParams } from "react-router-dom";
import vehicles from "./VechileData";

const VehicleDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = useParams();
  const vehicle = vehicles.find((v) => v.id === parseInt(id));

  if (!vehicle) return <p className="p-6">Vehicle not found.</p>;

  const documents = [
    { name: "Inspection1.pdf", type: "pdf" },
    { name: "Inspection2.pdf", type: "pdf" },
    { name: "Inspection3.pdf", type: "pdf" },
    { name: "Inspection4.pdf", type: "pdf" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vehicle Header */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl roboto-semi-bold text-[#333333]">
              {vehicle.name}
            </h1>
            <p className="text-sm text-[#4B5563] roboto-medium mt-1">
              {vehicle.year} • {vehicle.make} • {vehicle.license}
            </p>
            <p className="text-sm text-gray-500 mt-1">
             <span className="text-[#4B5563] roboto-medium">{vehicle.meter}</span>  • <span className="text-[#043677] roboto-medium">  {vehicle.operator.name} {vehicle.operator.id}</span>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab("overview")}
            className={`cursor-pointer pb-1 px-1 text-sm roboto-medium whitespace-nowrap ${
              activeTab === "overview"
                ? "text-[#043677] border-b-2 border-[#043677]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("inspections")}
            className={`cursor-pointer pb-1 px-1 text-sm roboto-medium whitespace-nowrap ${
              activeTab === "inspections"
                ? "text-[#043677] border-b-2 border-[#043677]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Inspections
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 lg:px-6 py-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Vehicle Details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                  <h2 className="text-[24px] roboto-semi-bold  text-[#333333]">
                    Vehicle Details
                  </h2>
                </div>
                <div className="px-4 lg:px-6 py-4">
                  <div className="flex flex-col gap-4">
                    <DetailRow  label="Name" value={vehicle.name} />
                    <DetailRow label="Status" value={vehicle.status} status />
                    <DetailRow label="Meter" value={vehicle.meter} />
                    <DetailRow
                      label="Operator"
                      value={
                        <div className="flex items-center gap-2">
                          <img
                            src={vehicle.operator.image}
                            alt={vehicle.operator.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>
                            {vehicle.operator.name} {vehicle.operator.id}
                          </span>
                        </div>
                      }
                    />
                    <DetailRow label="Type" value={vehicle.type} />
                    <DetailRow label="Fuel Type" value={vehicle.fuelType} />
                    <DetailRow
                      label="VIN/SN"
                      value={
                        <div className="flex items-center gap-2">
                          <span>{vehicle.vin}</span>
                          <button className="text-blue-600 text-xs hover:underline">
                            Decode VIN
                          </button>
                        </div>
                      }
                    />
                    <DetailRow label="License Plate" value={vehicle.license} />
                    <DetailRow label="Year" value={vehicle.year} />
                    <DetailRow label="Make" value={vehicle.make} />
                    <DetailRow label="Model" value={vehicle.model} />
                    <DetailRow
                      label="Registration State/Province"
                      value={vehicle.registrationState}
                    />
                    <DetailRow label="Color" value={vehicle.color} />
                    <DetailRow label="Ownership" value={vehicle.ownership} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Documents */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Header with Action Icons */}
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg roboto-semi-bold text-gray-900">
                    Documents
                  </h2>
                  {/* Action icons */}
                  <div className="flex flex-row gap-2">
                     <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.5 19.5H8C4 19.5 2 18.5 2 13.5V8.5C2 4.5 4 2.5 8 2.5H16C20 2.5 22 4.5 22 8.5V13.5C22 17.5 20 19.5 16 19.5H15.5C15.19 19.5 14.89 19.65 14.7 19.9L13.2 21.9C12.54 22.78 11.46 22.78 10.8 21.9L9.3 19.9C9.14 19.68 8.77 19.5 8.5 19.5Z" stroke="#333333" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 8.5H17" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 13.5H13" stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>


                    <svg width="62" height="24" viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 22H34C39 22 41 20 41 15V9C41 4 39 2 34 2H28C23 2 21 4 21 9V15C21 20 23 22 28 22Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M28 10C29.1046 10 30 9.10457 30 8C30 6.89543 29.1046 6 28 6C26.8954 6 26 6.89543 26 8C26 9.10457 26.8954 10 28 10Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21.6719 18.9505L26.6019 15.6405C27.3919 15.1105 28.5319 15.1705 29.2419 15.7805L29.5719 16.0705C30.3519 16.7405 31.6119 16.7405 32.3919 16.0705L36.5519 12.5005C37.3319 11.8305 38.5919 11.8305 39.3719 12.5005L41.0019 13.9005" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                   <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 10.5V15.5C22 20.5 20 22.5 15 22.5H9C4 22.5 2 20.5 2 15.5V9.5C2 4.5 4 2.5 9 2.5H14" stroke="#043677" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M22 10.5H18C15 10.5 14 9.5 14 6.5V2.5L22 10.5Z" stroke="#043677" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 13.5H13" stroke="#043677" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 17.5H11" stroke="#043677" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>

                <div className="px-4 lg:px-6 py-4">
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search files"
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Documents Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-red-500 rounded flex items-center justify-center mb-2">
                            <FileText className="text-white" size={24} />
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium text-gray-700 truncate max-w-[80px]">
                              {doc.name}
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "inspections" && <p>Inspections tab</p>}
      </div>
    </div>
  );
};

const DetailRow = ({ label, value, status }) => (
  <div className="flex flex-row items-center gap-16 p-4 border-b border-[#33333333] pb-2">
    <span className="text-[14px] text-[#333333] roboto-regular  w-40">{label}</span>
    {status ? (
      <div className="flex items-center gap-2">
        <span className="text-[#3CCE14] text-lg leading-none">•</span>
        <span className="text-[14px] roboto-medium text-[#333333E5]">{value}</span>
      </div>
    ) : (
      <div className="text-[14px] roboto-medium text-[#333333E5]">{value}</div>
    )}
  </div>
);

export default VehicleDetailsPage;
