import React, { useState, useEffect } from "react";
import { ChevronLeft, Search, FileText, MoreVertical } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const VehicleDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [vehicle, setVehicle] = useState(null);
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await fetch(`${baseUrl}/admin/vehicle/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle");
        }

        const data = await response.json();
        setVehicle(data.vehicle);
        setInspections((data.inspections || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, baseUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Vehicle Header Skeleton */}
        <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative">
              <Skeleton circle height={64} width={64} />
            </div>
            <div className="flex-1">
              <Skeleton height={24} width={200} />
              <Skeleton height={16} width={150} className="mt-1" />
              <Skeleton height={16} width={250} className="mt-1" />
            </div>
          </div>
          {/* Tabs Skeleton */}
          <div className="flex gap-6 mt-4 overflow-x-auto">
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={80} />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="px-4 lg:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                  <Skeleton height={24} width={150} />
                </div>
                <div className="px-4 lg:px-6 py-4">
                  <div className="flex flex-col gap-4">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className="flex flex-row items-center gap-16 p-4 border-b border-[#33333333] pb-2">
                        <Skeleton height={16} width={100} />
                        <Skeleton height={16} width={200} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <Skeleton height={20} width={100} />
                  <div className="flex flex-row gap-2">
                    <Skeleton height={24} width={24} />
                    <Skeleton height={24} width={62} />
                    <Skeleton height={24} width={24} />
                  </div>
                </div>
                <div className="px-4 lg:px-6 py-4">
                  <div className="relative mb-4">
                    <Skeleton height={40} width="100%" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-3">
                        <div className="flex flex-col items-center">
                          <Skeleton circle height={48} width={48} className="mb-2" />
                          <div className="flex items-center gap-1 mb-1">
                            <Skeleton height={12} width={80} />
                            <Skeleton height={14} width={14} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return <p className="p-6">Vehicle not found or error loading.</p>;
  }

  const documents = [
    { name: "Inspection1.pdf", type: "pdf" },
    { name: "Inspection2.pdf", type: "pdf" },
    { name: "Inspection3.pdf", type: "pdf" },
    { name: "Inspection4.pdf", type: "pdf" },
  ];

  const operator = vehicle.assignment?.driverId || { name: "N/A", employeeNumber: "N/A" , profileImage: "/placeholder-avatar.png" };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Vehicle Header */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative">
            <img
              src={vehicle.photo}
              alt={vehicle.name}
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.src = '/placeholder-avatar.png'; // fallback image
              }}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-xl lg:text-2xl roboto-semi-bold text-[#333333]">
              {vehicle.name}
            </h1>
            <p className="text-sm text-[#4B5563] roboto-medium mt-1">
              {vehicle.year} • {vehicle.make} • {vehicle.licensePlate}
            </p>
            <p className="text-sm text-gray-500 mt-1">
             <span className="text-[#4B5563] roboto-medium">{vehicle.currentMilage}</span>  • <span className="text-[#043677] roboto-medium">  {operator.name} {operator.employeeNumber}</span>
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
                    <DetailRow label="Status" value="Active" status />
                    <DetailRow label="Meter" value={vehicle.currentMilage} />
                    <DetailRow
                      label="Operator"
                      value={
                        <div className="flex items-center gap-2">
                          <img
                            src={operator.profileImage} // default placeholder
                            alt={operator.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>
                            {operator.name} {operator.employeeNumber}
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
                    <DetailRow label="License Plate" value={vehicle.licensePlate} />
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

        {activeTab === "inspections" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <h2 className="text-[24px] roboto-semi-bold text-[#333333]">Inspections</h2>
            </div>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="w-full text-left border-collapse text-sm">
                <thead style={{ backgroundColor: "#04367714" }}>
                  <tr>
                    <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                      <input type="checkbox" />
                    </th>
                    <th className="whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                      Submitted At
                    </th>
                    <th className="whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                      Submission
                    </th>
                    <th className="whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                      Vehicle
                    </th>
                    <th className="whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                      Date
                    </th>
                    <th className="whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                      Inspection Form
                    </th>
                    <th className="whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inspections.map((insp) => {
                    const submittedAt = new Date(insp.createdAt).toLocaleString();
                    const date = new Date(insp.createdAt).toLocaleDateString();
                    const status = insp.inspectionStatus === 'passed' ? 'Pass' : 'Fail';
                    const vehicleImg = insp.vehicleImage || vehicle.photo;
                    const vehicleName = `${vehicle.name} (${vehicle.licensePlate})`;
                    return (
                      <tr key={insp.inspectionId} onClick={() => navigate(`/inspection/${insp.inspectionId}`)} className="cursor-pointer bg-white hover:bg-[#04367714]">
                        <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                          <input type="checkbox" />
                        </td>
                        <td className="p-3 whitespace-nowrap border-b roboto-regular" style={{ borderColor: "#33333333" }}>
                          {submittedAt}
                        </td>
                        <td
                          className="p-3 whitespace-nowrap border-b roboto-regular text-blue-600"
                          style={{ borderColor: "#33333333" }}
                        >
                          {insp.inspectionId.slice(0, 7)}
                        </td>
                        <td
                          className="p-3 whitespace-nowrap border-b flex items-center roboto-regular gap-2 text-blue-600"
                          style={{ borderColor: "#33333333" }}
                        >
                          <img
                            src={vehicleImg}
                            alt="vehicle"
                            className="w-8 h-8 rounded object-cover"
                            onError={(e) => {
                              e.target.src = '/placeholder-avatar.png';
                            }}
                          />
                          {vehicleName}
                        </td>
                        <td className="p-3 whitespace-nowrap border-b roboto-regular " style={{ borderColor: "#33333333" }}>
                          {date}
                        </td>
                        <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                          <span className="flex items-center gap-2">
                            <span className="whitespace-nowrap w-2 h-2 bg-green-500 roboto-medium rounded-full"></span>
                            Pre-Trip Inspection
                          </span>
                        </td>
                        <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                          <span 
                            className={`px-3 py-1 roboto-medium rounded-full text-xs ${
                              status === "Pass" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
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