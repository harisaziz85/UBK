import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          console.error("No auth token found in localStorage.");
          setComments([]);
          setLoading(false);
          return;
        }

        const res = await axios.get(
          "https://ubktowingbackend-production.up.railway.app/api/common/comment/admin/received?page=1&limit=10",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = res.data;
        if (data?.success && Array.isArray(data.comments)) {
          setComments(data.comments);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
        setComments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Comments</h3>

      {loading ? (
        <div className="text-center py-4 text-gray-500 text-sm">
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-4 text-gray-500 text-sm">
          No recent comments found.
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {comments.map((comment, index) => (
            <div
              key={comment._id || index}
              className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50"
            >
              {comment?.user?.profileImage ? (
                <img
                  src={comment.user.profileImage}
                  alt={`${comment.user.name} avatar`}
                  className="w-10 h-10 rounded-full mr-2 object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "block";
                  }}
                />
              ) : (
                <FaUserCircle className="w-10 h-10 text-gray-400 mr-2" />
              )}
              <FaUserCircle
                className="w-10 h-10 text-gray-400 mr-2"
                style={{ display: "none" }}
              />
              <div className="flex-1">
                <p className="text-[16px] robotomedium">
                  {comment.user?.name || "Unknown User"}
                </p>
                <p className="text-sm text-gray-700">
                  {comment.message || "-"}
                </p>
              </div>
              <span className="text-[14px] robotomedium text-black ml-2">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleString()
                  : "-"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminComments;
