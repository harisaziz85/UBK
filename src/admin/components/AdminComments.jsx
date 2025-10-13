import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaUserCircle } from "react-icons/fa";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const AdminComments = () => {
  const [recentConversations, setRecentConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalComments, setTotalComments] = useState(0);
  const commentsRef = useRef(null);

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
  };

  const fetchComments = useCallback(async (pageNum) => {
    if (loadingMore) return;
    setLoadingMore(true);
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found in localStorage.");
        setLoading(false);
        return;
      }
      const response = await fetch(`${baseUrl}/common/comment/admin/received?page=${pageNum}&limit=10`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (!data.success) return;
        const transformed = data.comments.map((comment, index) => ({
          id: comment._id,
          user: comment.senderId.name,
          avatar: comment.senderId.profileImage || `https://i.pravatar.cc/150?img=${index + 1}`,
          action: `Message from ${comment.senderId.name}`,
          message: comment.text,
          time: formatRelativeTime(comment.createdAt),
        }));
        setRecentConversations((prev) => {
          if (pageNum === 1) {
            return transformed;
          } else {
            return [...prev, ...transformed];
          }
        });
        setTotalComments(data.total);
        setHasMore((pageNum * 10) < data.total);
        setPage((prev) => prev + 1);
      } else if (response.status === 401) {
        console.error("Authentication failed. Please log in again.");
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [baseUrl]);

  const handleScroll = useCallback(() => {
    if (commentsRef.current && loadingMore || !hasMore) return;
    const { scrollTop, scrollHeight, clientHeight } = commentsRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) {
      fetchComments(page);
    }
  }, [loadingMore, hasMore, page, fetchComments]);

  useEffect(() => {
    const div = commentsRef.current;
    if (!div) return;
    div.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchComments(1);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchComments]);

  if (loading) {
    return (
      <div className="w-full bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">
          <Skeleton height={20} width={120} />
        </h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start p-2 border-b border-gray-200">
              <Skeleton circle height={40} width={40} />
              <div className="flex-1 ml-3">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton height={12} width={200} className="mb-1" />
                    <Skeleton height={12} width={150} />
                  </div>
                  <Skeleton height={10} width={60} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Comments</h3>

      {recentConversations.length === 0 ? (
        <div className="text-center py-4 text-gray-500 text-sm">
          No recent comments found.
        </div>
      ) : (
        <div ref={commentsRef} className="space-y-2 max-h-64 overflow-y-auto">
          {recentConversations.map((comment, index) => (
            <div
              key={comment.id}
              className={`flex items-start p-2 ${
                index !== recentConversations.length - 1 ? "border-b border-gray-200" : ""
              } hover:bg-gray-50`}
            >
              {comment.avatar ? (
                <img
                  src={comment.avatar}
                  alt={comment.user}
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
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm mb-1">
                      <span className="font-semibold">{comment.user}</span>{" "}
                      <span className="text-gray-500">{comment.action}</span>
                    </p>
                    <p className="text-sm text-gray-700">{comment.message}</p>
                  </div>
                  <span className="text-gray-400 text-xs whitespace-nowrap">
                    {comment.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {loadingMore && (
            <div className="flex justify-center p-4">
              <div className="text-center text-gray-500 text-sm">Loading more...</div>
            </div>
          )}
          {!hasMore && recentConversations.length > 0 && (
            <div className="text-center py-2 text-gray-500 text-xs">No more comments.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminComments;