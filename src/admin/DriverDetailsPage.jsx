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

  // Helper function to format dates in UTC to avoid timezone offset issues
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { timeZone: 'UTC' });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", { timeZone: 'UTC', year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
  };

  // Fetch comments
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
              timeZone: 'UTC',
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
        console.log(data);
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
          address: data.driver.address?.completeAddress || "N/A",
          city: data.driver.address?.city || "N/A",
          stateProvince: data.driver.address?.state || "N/A",
          zipCode: data.driver.address?.zipcode || "N/A",
          country: data.driver.address?.country || "N/A",
          jobTitle: data.driver.jobTitle || "N/A",
          dob: formatDate(data.driver.dob),
          employeeNumber: data.driver.employeeNumber || "N/A",
          startDate: formatDate(data.driver.startDate),
          leaveDate: formatDate(data.driver.leaveDate),
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
    fetchComments();
  }, [id, navigate]);

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

        setNewComment("");
        fetchComments(); // Refetch to get updated comments with sender info
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

  const handleEditDriver = () => {
    // Navigate to Add Driver page and pass driver ID
    navigate(`/admin/add-driver/${id}`);
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
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6">
        {/* Header - Professional and Responsive */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 flex-1">
              <img 
                src={driver.profileImage} 
                alt={driver.name} 
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 shadow-md flex-shrink-0" 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/100?text=Profile'; }}
              />
              <div className="text-left">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-1">{driver.name}</h1>
                <p className="text-lg text-gray-600 mb-2">{driver.classifications}</p>
                <p className="text-sm text-gray-500">Group: {driver.group} | {driver.employeeNumber}</p>
              </div>
            </div>
            <button
              onClick={handleEditDriver}
              className="bg-[#043677] hover:bg-[#032c5a] text-white px-6 py-3 rounded-lg font-medium text-sm lg:text-base transition-colors shadow-sm whitespace-nowrap"
            >
              Edit Driver
            </button>
          </div>
        </div>

        {/* Tabs - Clean and Professional */}
       <div className="flex flex-col items-start mb-8">
  <div className="flex gap-6 ">
    {[
      { key: "Overview", label: "Overview" },
      { key: "Inspections", label: "Inspections" },
      { key: "Assigned Vehicles", label: "Assigned Vehicles" },
    ].map((tab) => (
      <button
        key={tab.key}
        onClick={() => setActiveTab(tab.key)}
        className={`relative pb-2 text-[15px] font-medium transition-all duration-200 ${
          activeTab === tab.key
            ? "text-[#043677]"
            : "text-gray-600 hover:text-[#043677]"
        }`}
      >
        {tab.label}
        <span
          className={`absolute left-0 bottom-0 h-[2px] rounded-full transition-all duration-300 ${
            activeTab === tab.key
              ? "w-full bg-[#043677]"
              : "w-0 bg-[#043677] group-hover:w-full"
          }`}
        ></span>
      </button>
    ))}
  </div>
</div>


        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-4">Profile Details</h3>
              <div className="space-y-6">
                {/* Basic Information */}
                <section>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Full Name</span>
                      <span className="font-semibold text-gray-900">{driver.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Email</span>
                      <span className="font-semibold text-gray-900">{driver.email}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Group</span>
                      <span className="font-semibold text-gray-900">{driver.group}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Classifications</span>
                      <span className="font-semibold text-gray-900">{driver.classifications}</span>
                    </div>
                  </div>
                </section>

                {/* Contact Information */}
                <section>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Mobile Phone</span>
                      <span className="font-semibold text-gray-900">{driver.mobilePhone}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Home Phone</span>
                      <span className="font-semibold text-gray-900">{driver.homePhone}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Address</span>
                      <span className="font-semibold text-gray-900">{driver.address}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">City</span>
                      <span className="font-semibold text-gray-900">{driver.city}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">State/Province</span>
                      <span className="font-semibold text-gray-900">{driver.stateProvince}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">ZIP Code</span>
                      <span className="font-semibold text-gray-900">{driver.zipCode}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Country</span>
                      <span className="font-semibold text-gray-900">{driver.country}</span>
                    </div>
                  </div>
                </section>

                {/* Personal Details */}
                <section>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h4>
                  <div className="space-y-4 border-b border-gray-100 pb-6">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Job Title</span>
                      <span className="font-semibold text-gray-900">{driver.jobTitle}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Date of Birth</span>
                      <span className="font-semibold text-gray-900">{driver.dob}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Employee Number</span>
                      <span className="font-semibold text-gray-900">{driver.employeeNumber}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Start Date</span>
                      <span className="font-semibold text-gray-900">{driver.startDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Leave Date</span>
                      <span className="font-semibold text-gray-900">{driver.leaveDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">License Number</span>
                      <span className="font-semibold text-gray-900">{driver.licenseNumber}</span>
                    </div>
                  </div>
                </section>

                {/* Permissions */}
                <section>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Document Access Permissions</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">View Vehicle Documents</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                        driver.viewAccess === "View access" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {driver.viewAccess}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-500 font-medium">Upload Vehicle Documents</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-sm ${
                        driver.uploadAccess === "Upload access" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {driver.uploadAccess}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* Comments Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center border-b border-gray-200 pb-4">
                <FaComments className="mr-2 text-[#043677] w-5 h-5" /> Recent Comments
              </h3>
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                {comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaComments className="mx-auto mb-2 text-gray-300 w-8 h-8" />
                    <p className="text-sm">No comments yet. Be the first to add one!</p>
                  </div>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <img
                        src={comment.userImage}
                        alt={comment.user}
                        className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=User'; }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900 text-sm truncate">{comment.user}</span>
                          <span className="text-xs text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={handleCommentSubmit} className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#043677] focus:border-transparent"
                  />
                  <button 
                    type="submit" 
                    disabled={!newComment.trim()}
                    className="bg-[#043677] hover:bg-[#032c5a] disabled:bg-gray-300 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === "Assigned Vehicles" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Assigned Vehicles</h3>
              <p className="text-gray-600 text-sm">Manage and view details of vehicles assigned to this driver.</p>
            </div>
            {assignedVehicles.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-lg">No assigned vehicles found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">Vehicle</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">License Plate</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%]">Year</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">Make</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[12%]">Model</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[10%]">Mileage</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%]">Color</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[8%]">Status</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-[7%]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {assignedVehicles.map((vehicle) => (
                      <tr
                        key={vehicle._id}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleVehicleClick(vehicle._id)}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={vehicle.photo || "https://via.placeholder.com/40?text=Vehicle"}
                                alt=""
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Vehicle'; }}
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{vehicle.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{vehicle.licensePlate}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{vehicle.year}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{vehicle.make}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{vehicle.model}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{vehicle.currentMilage} km</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center capitalize">{vehicle.color}</td>
                        <td className="px-4 py-4 whitespace-nowrap text-center">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Assigned
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-center text-gray-500" onClick={(e) => e.stopPropagation()}>
                          <div className="flex justify-center space-x-2">
                            <Phone className="w-4 h-4 cursor-pointer hover:text-[#043677]" />
                            <MessageSquare className="w-4 h-4 cursor-pointer hover:text-[#043677]" />
                            <Mail className="w-4 h-4 cursor-pointer hover:text-[#043677]" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "Inspections" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inspections History</h3>
              <p className="text-gray-600 text-sm">View all pre-trip inspections performed by this driver.</p>
            </div>
            {inspectionsLoading ? (
              <Shimmer type="inspections" />
            ) : inspections.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                <p className="text-lg">No inspections found.</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[5%]">
                          <input
                            type="checkbox"
                            checked={selected.length === inspections.length && inspections.length > 0}
                            onChange={handleSelectAll}
                            className="rounded"
                          />
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Submitted At</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Inspection ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[25%]">Vehicle</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[20%]">Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[15%]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {inspections.map((inspection) => (
                        <tr
                          key={inspection._id}
                          className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleInspectionClick(inspection._id)}
                        >
                          <td className="px-4 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selected.includes(inspection._id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                handleCheckboxChange(inspection._id);
                              }}
                              className="rounded"
                            />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{formatDateTime(inspection.createdAt)}</td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-[#043677] font-medium text-sm">#{inspection._id.slice(0, 6)}</span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#043677]">{inspection.vehicleId?.name || "N/A"}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              • Pre-trip Inspection
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              inspection.inspectionStatus === "passed" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {inspection.inspectionStatus === "passed" ? "Passed" : "Failed"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="relative ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-gray-700">
                          Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{' '}
                          <span className="font-medium">{Math.min(currentPage * limit, totalInspections)}</span> of{' '}
                          <span className="font-medium">{totalInspections}</span> results
                        </p>
                      </div>
                      <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handlePageChange(currentPage)}
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-[#043677] focus:border-[#043677]"
                            aria-current="page"
                          >
                            {currentPage}
                          </button>
                          <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                          >
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default DriverDetailsPage;