import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaUserCircle, FaComments, FaFolder, FaComment, FaEye } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [vehiclesLoading, setVehiclesLoading] = useState(false);
  const [inspectionsLoading, setInspectionsLoading] = useState(false);
  const [vehiclesLoaded, setVehiclesLoaded] = useState(false);
  const [inspectionsLoaded, setInspectionsLoaded] = useState(false);

  // Fetch driver details from API
  useEffect(() => {
    const fetchDriverDetails = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

      if (!token) {
        setError("You are not logged in. Please log in to view driver details.");
        setLoading(false);
        toast.error("Please log in to access this page.", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
        return;
      }

      try {
        const response = await fetch(
          `https://ubktowingbackend-production.up.railway.app/api/admin/driver/get-by/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Invalid or expired token. Please log in again.");
          }
          throw new Error("Failed to fetch driver details");
        }

        const data = await response.json();

        // Map API response to match the component's expected driver structure
        const mappedDriver = {
          name: data.driver.name || "N/A",
          email: data.driver.email || "N/A",
          group: data.driver.group || "N/A", // Not in API response, set to N/A
          classifications: data.driver.role || "N/A", // Use role as classifications
          mobilePhone: data.driver.phone || "N/A",
          homePhone: data.driver.homePhone || "N/A",
          address: data.driver.address?.address || "N/A", // API doesn't have direct address field, using address object
          city: data.driver.address?.city || "N/A",
          stateProvince: data.driver.address?.state || "N/A",
          zipCode: data.driver.address?.zipcode || "N/A",
          country: data.driver.address?.country || "N/A",
          jobTitle: data.driver.jobTitle || "N/A", // Not in API response, set to N/A
          dob: data.driver.dob ? new Date(data.driver.dob).toLocaleDateString("en-US") : "N/A",
          employeeNumber: data.driver.employeeNumber || "N/A",
          startDate: data.driver.startDate ? new Date(data.driver.startDate).toLocaleDateString("en-US") : "N/A",
          leaveDate: data.driver.leaveDate || "N/A", // Not in API response, set to N/A
          licenseNumber: data.driver.licenseNo || "N/A",
          viewAccess: data.driver.accessType === "view" || data.driver.accessType === "both" ? "View access" : "No access",
          uploadAccess: data.driver.accessType === "upload" || data.driver.accessType === "both" ? "Upload access" : "No access",
          profileImage: data.driver.profileImage || "https://via.placeholder.com/50", // Fallback to placeholder if no image
        };

        setDriver(mappedDriver);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
        if (err.message.includes("Unauthorized")) {
          setTimeout(() => navigate("/login"), 3000); // Redirect to login if unauthorized
        }
      }
    };

    fetchDriverDetails();
  }, [id, navigate]);

  // Fetch assigned vehicles when tab is active
  useEffect(() => {
    if (activeTab === "Assigned Vehicles" && !vehiclesLoaded) {
      fetchAssignedVehicles();
      setVehiclesLoaded(true);
    }
  }, [activeTab, vehiclesLoaded]);

  // Fetch inspections when tab is active
  useEffect(() => {
    if (activeTab === "Inspections" && !inspectionsLoaded) {
      fetchInspections();
      setInspectionsLoaded(true);
    }
  }, [activeTab, inspectionsLoaded]);

  const fetchAssignedVehicles = async () => {
    setVehiclesLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to access this data.");
      setVehiclesLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/admin/driver/assigned-vehicles/${id}?page=1&limit=10&search=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch assigned vehicles");
      }
      const data = await response.json();
      setAssignedVehicles(data.vehicles || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setVehiclesLoading(false);
    }
  };

  const fetchInspections = async () => {
    setInspectionsLoading(true);
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please log in to access this data.");
      setInspectionsLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `https://ubktowingbackend-production.up.railway.app/api/admin/driver/inspections/${id}?page=1&limit=10&search=`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inspections");
      }
      const data = await response.json();
      setInspections(data.inspections || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setInspectionsLoading(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      // Logic to add comment can be added here
      setComments([
        ...comments,
        {
          user: "Current User", // Replace with actual user data if available
          time: "Just now",
          text: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 justify-center items-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
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
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content Area */}
        <div className="flex p-6">
          {/* Driver Details */}
          <div className="flex-1 pr-6">
            <div className="bg-white p-4 shadow-md mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={driver.profileImage}
                  alt={driver.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{driver.name}</h2>
                  <p className="text-gray-600">{driver.email}</p>
                  <p className="text-gray-600">
                    Group: {driver.group} | Classifications: {driver.classifications}
                  </p>
                </div>
                <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded">
                  Edit Driver
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className={`px-4 py-2 ${activeTab === "Overview" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
                  onClick={() => setActiveTab("Overview")}
                >
                  Overview
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === "Inspections" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
                  onClick={() => setActiveTab("Inspections")}
                >
                  Inspections
                </button>
                <button
                  className={`px-4 py-2 ${activeTab === "Assigned Vehicles" ? "bg-blue-600 text-white" : "bg-gray-200"} rounded`}
                  onClick={() => setActiveTab("Assigned Vehicles")}
                >
                  Assigned Vehicles
                </button>
              </div>
            </div>
            {activeTab === "Overview" && (
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
            )}
            {activeTab === "Assigned Vehicles" && (
              <div className="bg-white p-4 shadow-md">
                <h3 className="text-lg font-semibold mb-4">Assigned Vehicles</h3>
                {vehiclesLoading ? (
                  <p>Loading vehicles...</p>
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
                            {vehicle.name}
                          </td>
                          <td>{vehicle.licensePlate}</td>
                          <td>{vehicle.year}</td>
                          <td>{vehicle.make}</td>
                          <td>{vehicle.model}</td>
                          <td>{vehicle.currentMilage} Km</td>
                          <td>{vehicle.color}</td>
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
                  <p>Loading inspections...</p>
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
                          <td className="text-primary">{inspection.vehicleId.licensePlate}</td>
                          <td>
                            <span className="text-success me-1">•</span> Pre-trip Inspection
                          </td>
                          <td>
                            <span
                              className={`d-inline-block rounded-pill px-3 py-1 ${
                                inspection.inspectionStatus === "passed"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                            ></span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Comments Section - Only in Overview */}
          {activeTab === "Overview" && (
            <div className="w-1/3 pl-6">
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
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DriverDetailsPage;