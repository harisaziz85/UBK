// src/components/AdminComments.jsx
import React from "react";

const AdminComments = () => {
  const comments = [
    {
      id: 1,
      avatar: "https://via.placeholder.com/40",
      name: "Ali Jama",
      comment: "Waiting for response, Check status",
      driver: "Huzaifa",
      timestamp: "11 days ago",
    },
    {
      id: 2,
      avatar: "https://via.placeholder.com/40",
      name: "Ali Jama",
      comment: "Fuel updated...",
      vehicle: "Ex-098666",
      timestamp: "11 days ago",
    },
    {
      id: 3,
      avatar: "https://via.placeholder.com/40",
      name: "Lorem ipsum",
      comment: "Test",
      timestamp: "11 days ago",
    },
    {
      id: 4,
      avatar: "https://via.placeholder.com/40",
      name: "Lorem ipsum",
      comment: "Test",
      timestamp: "11 days ago",
    },
    {
      id: 5,
      avatar: "https://via.placeholder.com/40",
      name: "Lorem ipsum",
      comment: "Test",
      timestamp: "11 days ago",
    },
    {
      id: 6,
      avatar: "https://via.placeholder.com/40",
      name: "Lorem ipsum",
      comment: "Test",
      timestamp: "11 days ago",
    },
  ];

  return (
    <div className="w-[100%] bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Recent Comments</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center p-2 border-b border-gray-200 hover:bg-gray-50"
          >
            <img
              src={comment.avatar}
              alt={`${comment.name} avatar`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="flex-1">
              <p className="text-sm font-medium">{comment.name}</p>
              {comment.driver && (
                <span className="text-xs text-gray-500">commented on Driver: {comment.driver}</span>
              )}
              {comment.vehicle && (
                <span className="text-xs text-gray-500">commented on Vehicle: {comment.vehicle}</span>
              )}
              <p className="text-sm text-gray-700">{comment.comment}</p>
            </div>
            <span className="text-xs text-gray-500 ml-2">{comment.timestamp}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminComments;