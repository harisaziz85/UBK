import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import logo from '../assets/image 104.png'

const TripInspection = () => {
  const [formFilter, setFormFilter] = useState("Submitted Inspection Form");
  const [itemFilter, setItemFilter] = useState("Submitted Inspection Item");
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const navigation = useNavigate();

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api"; 
  const itemsPerPage = 10;

  const fetchInspections = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage as 'token'
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${baseUrl}/common/inspection/list?page=${page}&limit=${itemsPerPage}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      if (data.success) {
        // Map API data to component format
        const mappedInspections = data.inspections.map((insp) => ({
          id: insp._id,
            index: insp.index ,

          submittedAt: new Date(insp.createdAt).toLocaleString(), // Format as needed
          
          vehicleImg: insp.vehicleId.photo || logo, // Use front image or default logo
          vehicle: `${insp.vehicleId.name} (${insp.vehicleId.licensePlate})`,
         date: new Date(insp.inspectedOn).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          timeZone: 'UTC'
        }),
          form: "Pre-Trip Inspection", // Or derive from formFilter/context
          status: insp.inspectionStatus === 'passed' ? 'Pass' : 'Fail',
          // Add other fields if needed, e.g., remarks, inspectedBy
        }));

          mappedInspections.sort(
    (a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)
  );
        setInspections(mappedInspections);
        setTotalPages(data.pages);
        setTotal(data.total);
        setCurrentPage(data.page);
      } else {
        setError('Failed to fetch inspections');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections(currentPage);
  }, [currentPage]);

  if (error) {
    return <div className="p-6 bg-gray-50 min-h-screen">Error: {error}</div>;
  }

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, total);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <div className=" py-4 sm:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div
        className="flex justify-between items-center mb-4 p-3 rounded"
      >
        <h2 className="text-xl font-bold text-gray-800">All Inspections</h2>
        <button
          onClick={() => navigation('/start-inspection')}
          className=" cursor-pointer px-4 py-2 text-white rounded-lg shadow"
          style={{ backgroundColor: "#043677" }}
        >
          + Start Inspection
        </button>
      </div>

     

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full text-left border-collapse text-sm">
          <thead style={{ backgroundColor: "#04367714" }}>
            <tr>
              <th className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                <input type="checkbox" />
              </th>
              <th className=" whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                Submitted At
              </th>
              <th className=" whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                Submission
              </th>
              <th className=" whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                Vehicle
              </th>
              <th className=" whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                Date
              </th>
              <th className=" whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                Inspection Form
              </th>
              <th className=" whitespace-nowrap p-3 border-b" style={{ borderColor: "#33333333" }}>
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, idx) => (
                <tr key={idx} className="bg-white">
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <Skeleton width={20} height={20} />
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <Skeleton />
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <Skeleton />
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <div className="flex items-center gap-2">
                      <Skeleton width={32} height={32} circle />
                      <Skeleton width={100} />
                    </div>
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <Skeleton />
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <Skeleton />
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <Skeleton width={60} height={24} />
                  </td>
                </tr>
              ))
            ) : (


              inspections.map((insp, idx) => (
                <tr key={insp.id} onClick={() => navigation(`/inspection/${insp.id}`)} className=" cursor-pointer bg-white hover:bg-[#04367714]">
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <input type="checkbox" />
                  </td>
                  <td className="p-3 whitespace-nowrap border-b roboto-regular" style={{ borderColor: "#33333333" }}>
                    {insp.submittedAt}
                  </td>
                  <td
                    className="p-3 whitespace-nowrap border-b roboto-regular text-blue-600"
                    style={{ borderColor: "#33333333" }}
                  >
                      {insp.index}
                  </td>
                  <td className="p-3 whitespace-nowrap border-b roboto-regular text-blue-600" style={{ borderColor: "#33333333" }}>
                  <div className="flex items-center gap-2">
                    <img
                      src={insp.vehicleImg}
                      alt="vehicle"
                      className="w-8 h-8 rounded"
                    />
                    {insp.vehicle}
                  </div>
                </td>

                  <td className="p-3 whitespace-nowrap border-b roboto-regular " style={{ borderColor: "#33333333" }}>
                    {insp.date}
                  </td>
                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                  <span className="flex items-center gap-2 whitespace-nowrap">
                    <span className="w-2 h-2 bg-green-500 roboto-medium rounded-full"></span>
                    {insp.form}
                  </span>
                </td>

                  <td className="p-3 border-b" style={{ borderColor: "#33333333" }}>
                    <span 
                      className={`px-3 py-1 roboto-medium rounded-full text-xs ${
                        insp.status === "Pass" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {insp.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-4 gap-2 text-sm text-gray-600">
        {loading ? (
          <Skeleton width={100} />
        ) : (
          <>
            <span>{start}–{end} of {total}</span>
            <div className="flex gap-2">
              <button 
                onClick={handlePrev}
                disabled={isPrevDisabled}
                className={`px-1 py-1 rounded bg-gray-100 ${isPrevDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.6 6L6.6 12L8 10.6L3.4 6L8 1.4L6.6 0L0.6 6Z" fill="#1D1B20" fill-opacity="0.8"/>
                </svg>
              </button>
              <button 
                onClick={handleNext}
                disabled={isNextDisabled}
                className={`px-1 py-1 rounded bg-gray-100 ${isNextDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
              >
                <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.4 6L1.4 12L0 10.6L4.6 6L0 1.4L1.4 0L7.4 6Z" fill="#1D1B20" fill-opacity="0.8"/>
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TripInspection;