import React, { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import { Phone, MessageSquare, Mail } from "lucide-react";
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
        <table className="min-w-full border border-gray-200">
          <thead className="bg-[#04367714] text-black text-sm robotomedium">
            <tr>
              <th className="w-[5%] px-3 py-2 text-center"><div className="w-4 h-4 bg-gray-200 rounded animate-pulse mx-auto" /></th>
              <th className="w-[20%] px-3 py-2 text-left"><div className="w-16 h-4 bg-gray-200 rounded animate-pulse" /></th>
              <th className="w-[15%] px-3 py-2 text-left"><div className="w-16 h-4 bg-gray-200 rounded animate-pulse" /></th>
              <th className="w-[20%] px-3 py-2 text-left"><div className="w-16 h-4 bg-gray-200 rounded animate-pulse" /></th>
              <th className="w-[20%] px-3 py-2 text-left"><div className="w-16 h-4 bg-gray-200 rounded animate-pulse" /></th>
              <th className="w-[20%] px-3 py-2 text-left"><div className="w-16 h-4 bg-gray-200 rounded animate-pulse" /></th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-[#E6E6E6] h-[50px]">
                <td className="w-[5%] px-3 pt-2 pb-[10px] text-center"><div className="w-4 h-4 bg-gray-200 rounded animate-pulse mx-auto" /></td>
                <td className="w-[20%] px-3 pt-2 pb-[10px] text-left"><div className="w-32 h-4 bg-gray-200 rounded animate-pulse" /></td>
                <td className="w-[15%] px-3 pt-2 pb-[10px] text-left"><div className="w-24 h-4 bg-gray-200 rounded animate-pulse" /></td>
                <td className="w-[20%] px-3 pt-2 pb-[10px] text-left"><div className="w-24 h-4 bg-gray-200 rounded animate-pulse" /></td>
                <td className="w-[20%] px-3 pt-2 pb-[10px] text-left"><div className="w-28 h-4 bg-gray-200 rounded animate-pulse" /></td>
                <td className="w-[20%] px-3 pt-2 pb-[10px] text-left"><div className="w-20 h-4 bg-gray-200 rounded animate-pulse" /></td>
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
  const [selected, setSelected] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [assignedVehicles, setAssignedVehicles] = useState([]);
  const [inspections, setInspections] = useState([]);
  const [inspectionsLoading, setInspectionsLoading] = useState(false);
  const [inspectionsLoaded, setInspectionsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInspections, setTotalInspections] = useState(0);
  const limit = 10;

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

  // Fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please log in to access comments.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      try {
        const response = await fetch(
          `https://ubktowingbackend-production.up.railway.app/api/common/comment/get-with/${id}?page=1&limit=10`,
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
          console.error("Comments fetch error:", response.status, errorText);
          throw new Error(`Failed to fetch comments: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        const mappedComments = (data.comments || []).map((comment) => ({
          user: comment.senderId?.name || "Unknown User",
          userImage: comment.senderId?.profileImage || "https://via.placeholder.com/30",
          time: comment.createdAt
            ? new Date(comment.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "Unknown time",
          text: comment.text || "",
        }));
        setComments(mappedComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    };

    fetchComments();
  }, [id]);

  // Fetch inspections
  useEffect(() => {
    if (activeTab === "Inspections" && !inspectionsLoaded) {
      fetchInspections(currentPage);
      setInspectionsLoaded(true);
    }
  }, [activeTab, inspectionsLoaded, currentPage]);

  const fetchInspections = async (page) => {
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
        `https://ubktowingbackend-production.up.railway.app/api/admin/driver/inspections/${id}?page=${page}&limit=${limit}&search=`,
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
      setInspections(data.inspections || []);
      setTotalInspections(data.total || 0);
      setTotalPages(Math.ceil(data.total / limit));
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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please log in to add a comment.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      try {
        const response = await fetch(
          "https://ubktowingbackend-production.up.railway.app/api/common/comment/create",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              receiverId: id,
              text: newComment,
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to create comment: ${response.status} ${errorText}`);
        }

        const data = await response.json();
        setComments([
          ...comments,
          {
            user: "Current User",
            userImage: "https://via.placeholder.com/30",
            time: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            text: newComment,
          },
        ]);
        setNewComment("");
        toast.success("Comment added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      } catch (err) {
        console.error("Error creating comment:", err);
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  // Toggle single checkbox
  const handleCheckboxChange = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  // Toggle select all
  const handleSelectAll = () => {
    if (selected.length === inspections.length) {
      setSelected([]);
    } else {
      setSelected(inspections.map((d) => d._id));
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchInspections(newPage);
      setSelected([]);
    }
  };

  // Handle vehicle row click
  const handleVehicleClick = (vehicleId) => {
    navigate(`/admin/vehicleprofile/${vehicleId}`);
  };

  // Handle inspection row click
  const handleInspectionClick = (inspectionId) => {
    navigate(`/admin/inspection/${inspectionId}`);
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
        <div className="p-4">
          <div className="p-4 mb-6">
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
              className={`px-4 py-2 rounded robotomedium ${
                activeTab === "Overview" ? "text-[#043677] underline" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Overview")}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 rounded robotomedium ${
                activeTab === "Inspections" ? "text-[#043677] underline" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Inspections")}
            >
              Inspections
            </button>
            <button
              className={`px-4 py-2 rounded robotomedium ${
                activeTab === "Assigned Vehicles" ? "text-[#043677] underline" : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Assigned Vehicles")}
            >
              Assigned Vehicles
            </button>
          </div>

          {activeTab === "Overview" && (
            <div className="flex space-x-6">
              <div className="w-1/2">
                <div className="bg-white p-4 shadow-md">
                  <h3 className="text-[22px] mt-6 mb-4 robotosemibold">Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between pt-[20px] pb-[10px] border-b border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">First Name</p>
                      <p className="robotomedium">{driver.name.split(" ")[0] || "N/A"}</p>
                    </div>
                    <div className="flex justify-between pt-[20px] pb-[10px] border-b border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Last Name</p>
                      <p className="robotomedium">{driver.name.split(" ").slice(1).join(" ") || "N/A"}</p>
                    </div>
                    <div className="flex justify-between pt-[20px] pb-[10px] border-b border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Email</p>
                      <p className="robotomedium">{driver.email}</p>
                    </div>
                  </div>
                  <h3 className="text-[22px] mt-6 mb-4 robotosemibold">Contact Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Mobile Phone Number</p>
                      <p className="robotomedium">{driver.mobilePhone}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Home Phone Number</p>
                      <p className="robotomedium">{driver.homePhone}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Address</p>
                      <p className="robotomedium">{driver.address}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">City</p>
                      <p className="robotomedium">{driver.city}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">State/Province</p>
                      <p className="robotomedium">{driver.stateProvince}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">ZIP code</p>
                      <p className="robotomedium">{driver.zipCode}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Country</p>
                      <p className="robotomedium">{driver.country}</p>
                    </div>
                  </div>
                  <h3 className="text-[22px] mt-6 mb-4 robotosemibold">Personal Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Job Title</p>
                      <p className="robotomedium">{driver.jobTitle}</p>
                    </div>
                    <div className="flex justify-between pt-[20px] pb-[10px] border-b border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">DOB</p>
                      <p className="robotomedium">{driver.dob}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Employee Number</p>
                      <p className="robotomedium">{driver.employeeNumber}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Start Date</p>
                      <p className="robotomedium">{driver.startDate}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Leave Date</p>
                      <p className="robotomedium">{driver.leaveDate}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">License Number</p>
                      <p className="robotomedium">{driver.licenseNumber}</p>
                    </div>
                  </div>
                  <h3 className="text-[22px] mt-6 mb-4 robotosemibold">Document Access Permissions</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">View Vehicle documents</p>
                      <p className="robotomedium">{driver.viewAccess}</p>
                    </div>
                    <div className="flex justify-between border-b pt-[20px] pb-[10px] border-[#0000004A]">
                      <p className="text-gray-500 robotoregular">Upload Vehicle documents</p>
                      <p className="robotomedium">{driver.uploadAccess}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2">
                <div className="bg-white p-4 shadow-md h-full">
                  <h3 className="text-lg font-semibold mb-4 flex items-center robotomedium">
                    <FaComments className="mr-2" /> Comments
                  </h3>
                  <div className="space-y-4 mb-4">
                    {comments.length === 0 ? (
                      <p className="text-gray-500 robotoregular">No comments available.</p>
                    ) : (
                      comments.map((comment, index) => (
                        <div key={index} className="flex items-start">
                          <img
                            src={comment.userImage}
                            alt={comment.user}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <p className="text-sm font-semibold robotomedium">{comment.user}</p>
                            <p className="text-xs text-gray-500 robotoregular">{comment.time}</p>
                            <p className="text-gray-700 robotoregular">{comment.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <form onSubmit={handleCommentSubmit} className="mt-auto">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button type="submit" className="bg-[#043677] text-white px-4 py-2 rounded hover:bg-[#032c5a] transition">
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
              <h3 className="text-lg font-semibold mb-4 robotomedium">Assigned Vehicles</h3>
              {assignedVehicles.length === 0 ? (
                <p className="text-gray-500 robotoregular">No assigned vehicles found.</p>
              ) : (
                <table className="min-w-full border border-gray-200">
                  <thead className="bg-[#04367714] text-black text-sm robotomedium">
                    <tr>
                      <th className="w-[20%] px-3 py-2 text-left">Name</th>
                      <th className="w-[10%] px-3 py-2 text-center">License Plate</th>
                      <th className="w-[10%] px-3 py-2 text-center">Year</th>
                      <th className="w-[10%] px-3 py-2 text-center">Make</th>
                      <th className="w-[10%] px-3 py-2 text-center">Model</th>
                      <th className="w-[15%] px-3 py-2 text-center">Current Meter</th>
                      <th className="w-[10%] px-3 py-2 text-center">Color</th>
                      <th className="w-[10%] px-3 py-2 text-center">Status</th>
                      <th className="w-[15%] px-3 py-2 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 robotoregular">
                    {assignedVehicles.map((vehicle) => (
                      <tr
                        key={vehicle._id}
                        className="border-b last:border-b-0 border-[#E6E6E6] hover:bg-gray-50 transition cursor-pointer h-[50px]"
                        onClick={() => handleVehicleClick(vehicle._id)}
                      >
                        <td className="w-[20%] flex items-center gap-3 px-3 pt-2 pb-[10px]">
                          <div className="w-[50px] h-[50px] flex-shrink-0 rounded-full overflow-hidden border border-gray-300">
                            <img
                              src={vehicle.photo || "https://via.placeholder.com/50"}
                              alt={vehicle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="truncate max-w-[150px]">{vehicle.name || "N/A"}</span>
                        </td>
                        <td className="w-[10%] px-3 pt-2 pb-[10px] text-center">{vehicle.licensePlate || "N/A"}</td>
                        <td className="w-[10%] px-3 pt-2 pb-[10px] text-center">{vehicle.year || "N/A"}</td>
                        <td className="w-[10%] px-3 pt-2 pb-[10px] text-center">{vehicle.make || "N/A"}</td>
                        <td className="w-[10%] px-3 pt-2 pb-[10px] text-center">{vehicle.model || "N/A"}</td>
                        <td className="w-[15%] px-3 pt-2 pb-[10px] text-center">{vehicle.currentMilage ? `${vehicle.currentMilage} Km` : "N/A"}</td>
                        <td className="w-[10%] px-3 pt-2 pb-[10px] text-center">{vehicle.color || "N/A"}</td>
                        <td className="w-[10%] px-3 pt-2 pb-[10px] text-center">
                          {vehicle.assignment ? (
                            <span className="text-success">• Assigned</span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td
                          className="w-[15%] flex gap-3 justify-center px-3 pt-2 pb-[10px]"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Phone className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
                          <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
                          <Mail className="w-5 h-5 cursor-pointer text-gray-600 hover:text-blue-600" />
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
              <h3 className="text-lg font-semibold mb-4 robotomedium">Inspections</h3>
              {inspectionsLoading ? (
                <Shimmer type="inspections" />
              ) : inspections.length === 0 ? (
                <p className="text-gray-500 robotoregular">No inspections found.</p>
              ) : (
                <>
                  <table className="min-w-full border border-gray-200">
                    <thead className="bg-[#04367714] text-black text-sm robotomedium">
                      <tr>
                        <th className="w-[5%] px-3 py-2 text-center">
                          <input
                            type="checkbox"
                            checked={selected.length === inspections.length && inspections.length > 0}
                            onChange={handleSelectAll}
                          />
                        </th>
                        <th className="w-[20%] px-3 py-2 text-left">Created At</th>
                        <th className="w-[15%] px-3 py-2 text-left">ID</th>
                        <th className="w-[20%] px-3 py-2 text-left">Vehicle</th>
                        <th className="w-[20%] px-3 py-2 text-left">Type</th>
                        <th className="w-[20%] px-3 py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-800 robotoregular">
                      {inspections.map((inspection) => (
                        <tr
                          key={inspection._id}
                          className="border-b last:border-b-0 border-[#E6E6E6] hover:bg-gray-50 transition cursor-pointer h-[50px]"
                          onClick={() => handleInspectionClick(inspection._id)}
                        >
                          <td className="w-[5%] px-3 pt-2 pb-[10px] text-center">
                            <input
                              type="checkbox"
                              checked={selected.includes(inspection._id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(inspection._id);
                              }}
                            />
                          </td>
                          <td className="w-[20%] px-3 pt-2 pb-[10px] text-left">
                            {new Date(inspection.createdAt).toLocaleString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="w-[15%] px-3 pt-2 pb-[10px] text-left text-[#043677] robotomedium">
                            #{inspection._id.slice(0, 6)}
                          </td>
                          <td className="w-[20%] px-3 pt-2 pb-[10px] text-left text-[#043677] robotomedium">
                            {inspection.vehicleId?.name || "N/A"}
                          </td>
                          <td className="w-[20%] px-3 pt-2 pb-[10px] text-left">
                            <span className="text-success me-1">•</span> Pre-trip Inspection
                          </td>
                          <td className="w-[20%] px-3 pt-2 pb-[10px] text-left">
                            <span
                              className={`d-inline-block rounded-pill px-3 py-1 ${
                                inspection.inspectionStatus === "passed" ? "bg-success" : "bg-danger"
                              } text-black robotomedium`}
                            >
                              {inspection.inspectionStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center mt-4">
                    <p className="text-gray-600 robotoregular">
                      Showing {inspections.length} of {totalInspections} inspections
                    </p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-[#043677] text-white rounded disabled:bg-gray-300"
                      >
                        Previous
                      </button>
                      <span className="px-4 py-2">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-[#043677] text-white rounded disabled:bg-gray-300"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
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