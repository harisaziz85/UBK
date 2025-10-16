import React, { useState, useEffect } from "react";

const Shimmer = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="text-center sm:text-left space-y-2">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-6">
              <div>
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="w-24 h-4 bg-gray-200 rounded"></div>
                      <div className="w-28 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-5 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-4">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="w-44 h-4 bg-gray-200 rounded"></div>
                      <div className="w-40 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="space-y-4 mb-6 max-h-96">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      <div className="h-3 w-16 bg-gray-200 rounded"></div>
                    </div>
                    <div className="h-4 w-64 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex space-x-2">
                <div className="flex-1 h-10 bg-gray-200 rounded-lg"></div>
                <div className="w-20 h-10 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyProfilePage = () => {
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [driver, setDriver] = useState(null);
  const [userId, setUserId] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  const BASE_URL = "https://ubktowingbackend-production.up.railway.app/api";

  const timeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInMinutes = Math.floor((now - past) / (1000 * 60));
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const fetchComments = async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${BASE_URL}/common/comment/get-with/${userId}?page=1&limit=10`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments((data.comments || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !userId) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${BASE_URL}/common/comment/create`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiverId: userId,
            text: newComment,
          }),
        }
      );

      if (response.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "long", 
      day: "numeric" 
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You are not logged in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/common/profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const data = await response.json();
        if (!data.user) {
          throw new Error("No user data returned");
        }

        const userData = data.user;
        setUserId(userData.id);
        const mappedDriver = {
          name: userData.name || "N/A",
          email: userData.email || "N/A",
          phone: userData.phone || "N/A",
          homePhone: userData.homePhone || "N/A",
          address: `${userData.address?.city || ""}, ${userData.address?.state || ""} ${userData.address?.zipcode || ""}, ${userData.address?.country || ""}`.replace(/, /g, ' ').trim() || "N/A",
          city: userData.address?.city || "N/A",
          stateProvince: userData.address?.state || "N/A",
          zipCode: userData.address?.zipcode || "N/A",
          country: userData.address?.country || "N/A",
          dob: formatDate(userData.dob),
          employeeNumber: userData.employeeNumber || "N/A",
          startDate: formatDate(userData.startDate),
          licenseNumber: userData.licenseNo || "N/A",
          viewAccess: userData.accessType === "view" || userData.accessType === "both" ? "View access granted" : "No access",
          uploadAccess: userData.accessType === "upload" || userData.accessType === "both" ? "Upload access granted" : "No access",
          profileImage: userData.profileImage || "https://via.placeholder.com/150",
          role: userData.role || "N/A",
        };

        setDriver(mappedDriver);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    fetchComments();
  }, [userId]);

  if (loading) {
    return <Shimmer />;
  }

  if (error || !driver) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-red-500">Error: {error || "Failed to load profile"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src={driver.profileImage}
              alt={driver.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-white shadow-md"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{driver.name}</h1>
              <p className="text-lg text-gray-600">{driver.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              Profile Details
            </h2>
            <div className="space-y-6">
              {/* Basic Info */}
              <section>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{driver.email}</span>
                  </div>
                </div>
              </section>

              {/* Contact Info */}
              <section>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Mobile Phone</span>
                    <span className="font-medium">{driver.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Home Phone</span>
                    <span className="font-medium">{driver.homePhone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Address</span>
                    <span className="font-medium">{driver.address}</span>
                  </div>
                </div>
              </section>

              {/* Personal Details */}
              <section>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Details</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Date of Birth</span>
                    <span className="font-medium">{driver.dob}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Employee Number</span>
                    <span className="font-medium">{driver.employeeNumber}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Start Date</span>
                    <span className="font-medium">{driver.startDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">License Number</span>
                    <span className="font-medium">{driver.licenseNumber}</span>
                  </div>
                </div>
              </section>

           
            </div>
          </div>

          {/* Right: Comments */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Comments</h2>
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {comments.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No comments yet.</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="flex space-x-3">
                    <img
                      src={comment.senderId?.profileImage || 'https://via.placeholder.com/40'}
                      alt={comment.senderId?.name}
                      className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/40';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 truncate">{comment.senderId?.name || 'Unknown'}</span>
                        <span className="text-xs text-gray-500">{timeAgo(comment.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleCommentSubmit} className=" pt-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;