import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUserCircle, FaComments, FaFolder, FaComment, FaEye } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Shimmer = ({ type }) => {
  if (type === "driver") {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <div className="bg-white p-4 shadow-md w-full max-w-4xl">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-4 w-60 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-80 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="flex space-x-4">
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "inspections") {
    return (
      <div className="bg-white p-4 shadow-md">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
        <table className="table table-striped table-bordered w-100">
          <thead className="bg-primary text-white">
            <tr>
              <th>Created At</th>
              <th>ID</th>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td><div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div></td>
                <td><div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></td>
                <td><div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div></td>
                <td><div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div></td>
                <td><div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
};

const DriverDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([
    {
      user: "John Doe EMP112233",
      time: "3 mins ago",
      text: "Hey please brief me the issues you had while driving the truck",
    },
    {
      user: "John Doe EMP112233",
      time: "3 mins ago",
      text: "Hey please brief me the issues you had while driving the truck",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [assignedVehicles, setAssignedVehicles] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [inspectionsLoading, setInspectionsLoading] = useState(false);
  const [inspectionsLoaded, setInspectionsLoaded] = useState(false);

  // Fetch driver details and vehicles
  useEffect(() => {
    const fetchDriverDetails = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You are not logged in. Please log in to view driver details.");
        setLoading(false);
        toast.error("Please log in to access this page.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 3000);
        return;
      }

      try {
        const response = await fetch(
          `https://ubktowingbackend-production.up.railway.app/api/admin/driver/get-by/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Driver details fetch error:", response.status, errorText);
          if (response.status === 401) {
            throw new Error("Unauthorized: Invalid or expired token. Please log in again.");
          }
          throw new Error(`Failed to fetch driver details: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        if (!data.driver) {
          throw new Error("No driver data returned from API");
        }

        const mappedDriver = {
          name: data.driver.name || "N/A",
          email: data.driver.email || "N/A",
          group: data.driver.group || "N/A",
          classifications: data.driver.role || "N/A",
          mobilePhone: data.driver.phone || "N/A",
          homePhone: data.driver.homePhone || "N/A",
          address: data.driver.address?.address || "N/A",
          city: data.driver.address?.city || "N/A",
          stateProvince: data.driver.address?.state || "N/A",
          zipCode: data.driver.address?.zipcode || "N/A",
          country: data.driver.address?.country || "N/A",
          jobTitle: data.driver.jobTitle || "N/A",
          dob: data.driver.dob ? new Date(data.driver.dob).toLocaleDateString("en-US") : "N/A",
          employeeNumber: data.driver.employeeNumber || "N/A",
          startDate: data.driver.startDate
            ? new Date(data.driver.startDate).toLocaleDateString("en-US")
            : "N/A",
          leaveDate: data.driver.leaveDate || "N/A",
          licenseNumber: data.driver.licenseNo || "N/A",
          viewAccess: data.driver.accessType === "view" || data.driver.accessType === "both" ? "View access" : "No access",
          uploadAccess: data.driver.accessType === "upload" || data.driver.accessType === "both" ? "Upload access" : "No access",
          profileImage: data.driver.profileImage || "https://via.placeholder.com/50",
        };

        setDriver(mappedDriver);
        setAssignedVehicles(data.driver.vehicles || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching driver details:", err);
        setError(err.message);
        setLoading(false);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        if (err.message.includes("Unauthorized")) {
          setTimeout(() => navigate("/login"), 3000);
        }
      }
    };

    fetchDriverDetails();
  }, [id, navigate]);

  // Fetch inspections
  useEffect(() => {
    if (activeTab === "Inspections" && !inspectionsLoaded) {
      fetchInspections();
      setInspectionsLoaded(true);
    }
  }, [activeTab, inspectionsLoaded]);

  const fetchInspections = async () => {
    setInspectionsLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to access this data.", {
        position: "top-right",
        autoClose: 3000,
      });
      setInspectionsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/admin/driver/inspections/${id}?page=1&limit=10&search=`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Inspections fetch error:", response.status, errorText);
        throw new Error(`Failed to fetch inspections: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      console.log("Inspections response:", data);
      setInspections(data.inspections || []);
    } catch (err) {
      console.error("Error fetching inspections:", err);
      toast.error(err.message, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setInspectionsLoading(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          user: "Current User",
          time: "Just now",
          text: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  if (loading) {
    return <Shimmer type="driver" />;
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <div className="p-6">
          <div className=" p-4  mb-6">
            <div className="flex items-end space-x-4 mb-4">
              <img src={driver.profileImage} alt={driver.name} className="w-[100px] h-[100px] rounded-full" />
              <div>
                <h2 className="text-[24px] robotomedium">{driver.name}</h2>
                <p className="text-gray-600 robotomedium text-[14px]">{driver.email}</p>
                <p className="text-gray-600 robotomedium text-[14px]">
                  Group: {driver.group} | Classifications: {driver.classifications}
                </p>
              </div>
              <button className="ml-auto bg-[#043677] text-white px-4 py-2 rounded">
                Edit Driver
              </button>
            </div>
          </div>

          <div className="flex space-x-4 mb-[40px]">
  <button
    className={`px-4 py-2 rounded  robotomedium ${
      activeTab === "Overview"
        ? "text-[#043677] underline"
        : "text-gray-600"
    }`}
    onClick={() => setActiveTab("Overview")}
  >
    Overview
  </button>

  <button
    className={`px-4 py-2 rounded robotomedium  ${
      activeTab === "Inspections"
        ? "text-[#043677] underline"
        : "text-gray-600"
    }`}
    onClick={() => setActiveTab("Inspections")}
  >
    Inspections
  </button>

  <button
    className={`px-4 py-2 rounded robotomedium  ${
      activeTab === "Assigned Vehicles"
        ? "text-[#043677] underline"
        : "text-gray-600"
    }`}
    onClick={() => setActiveTab("Assigned Vehicles")}
  >
    Assigned Vehicles
  </button>
</div>

          {activeTab === "Overview" && (
            <div className="flex space-x-6">
              <div className="flex-1">
                <div className="bg-white p-4 shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">First Name</p>
                      <p>{driver.name.split(" ")[0] || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Last Name</p>
                      <p>{driver.name.split(" ").slice(1).join(" ") || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Email</p>
                      <p>{driver.email}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Mobile Phone Number</p>
                      <p>{driver.mobilePhone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Home Phone Number</p>
                      <p>{driver.homePhone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p>{driver.address}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">City</p>
                      <p>{driver.city}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">State/Province</p>
                      <p>{driver.stateProvince}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">ZIP code</p>
                      <p>{driver.zipCode}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Country</p>
                      <p>{driver.country}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Personal Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">Job Title</p>
                      <p>{driver.jobTitle}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">DOB</p>
                      <p>{driver.dob}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Employee Number</p>
                      <p>{driver.employeeNumber}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Start Date</p>
                      <p>{driver.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Leave Date</p>
                      <p>{driver.leaveDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">License Number</p>
                      <p>{driver.licenseNumber}</p>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mt-6 mb-4">Document Access Permissions</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-500">View Vehicle documents</p>
                      <p>{driver.viewAccess}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Upload Vehicle documents</p>
                      <p>{driver.uploadAccess}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <div className="bg-white p-4 shadow-md h-full">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FaComments className="mr-2" /> Comments
                  </h3>
                  <div className="space-y-4 mb-4">
                    {comments.map((comment, index) => (
                      <div key={index} className="flex items-start">
                        <img
                          src="https://via.placeholder.com/30"
                          alt="User"
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="text-sm font-semibold">{comment.user}</p>
                          <p className="text-xs text-gray-500">{comment.time}</p>
                          <p className="text-gray-700">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleCommentSubmit} className="mt-auto">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        className="w-full p-2 border rounded"
                      />
                      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Assigned Vehicles" && (
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-4">Assigned Vehicles</h3>
              {assignedVehicles.length === 0 ? (
                <p>No assigned vehicles found.</p>
              ) : (
                <table className="table table-striped table-bordered w-100">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Name</th>
                      <th>License Plate</th>
                      <th>Year</th>
                      <th>Make</th>
                      <th>Model</th>
                      <th>Current Meter</th>
                      <th>Color</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignedVehicles.map((vehicle) => (
                      <tr key={vehicle._id}>
                        <td className="d-flex align-items-center">
                          <img
                            src={vehicle.photo || "https://via.placeholder.com/30"}
                            alt={vehicle.name}
                            className="me-2"
                            style={{ width: "30px" }}
                          />
                          {vehicle.name || "N/A"}
                        </td>
                        <td>{vehicle.licensePlate || "N/A"}</td>
                        <td>{vehicle.year || "N/A"}</td>
                        <td>{vehicle.make || "N/A"}</td>
                        <td>{vehicle.model || "N/A"}</td>
                        <td>{vehicle.currentMilage ? `${vehicle.currentMilage} Km` : "N/A"}</td>
                        <td>{vehicle.color || "N/A"}</td>
                        <td>
                          {vehicle.assignment ? (
                            <span className="text-success">• Assigned</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td>
                          <FaFolder className="me-2" />
                          <FaComment className="me-2" />
                          <FaEye />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          {activeTab === "Inspections" && (
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-lg font-semibold mb-4">Inspections</h3>
              {inspectionsLoading ? (
                <Shimmer type="inspections" />
              ) : inspections.length === 0 ? (
                <p>No inspections found.</p>
              ) : (
                <table className="table table-striped table-bordered w-100">
                  <thead className="bg-primary text-white">
                    <tr>
                      <th>Created At</th>
                      <th>ID</th>
                      <th>Vehicle</th>
                      <th>Type</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspections.map((inspection) => (
                      <tr key={inspection._id}>
                        <td>{new Date(inspection.inspectedOn).toLocaleString()}</td>
                        <td className="text-primary">#{inspection._id}</td>
                        <td className="text-primary">{inspection.vehicleId?.licensePlate || "N/A"}</td>
                        <td>
                          <span className="text-success me-1">•</span> Pre-trip Inspection
                        </td>
                        <td>
                          <span
                            className={`d-inline-block rounded-pill px-3 py-1 ${
                              inspection.inspectionStatus === "passed" ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {inspection.inspectionStatus}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DriverDetailsPage;