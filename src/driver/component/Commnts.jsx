import React from "react";

const Commnts = () => {
  const comments = [
    {
      id: 1,
      userImg: "https://via.placeholder.com/50",
      comment: "This is a sample comment. Really helpful!",
      username: "Haris Aziz",
      timeAgo: "2 days ago",
    },
    {
      id: 2,
      userImg: "https://via.placeholder.com/50",
      comment: "Another feedback here, looks good!",
      username: "Ali Khan",
      timeAgo: "5 days ago",
    },
  ];

  return (
    <div className=" mx-auto mt-6 space-y-4">
      {comments.map((c) => (
        <div
          key={c.id}
          className="flex items-end justify-between p-4 bg-white rounded-xl shadow"
        >
          {/* Left side */}
          <div className="flex items-start gap-3">
            <img
              src={c.userImg}
              alt={c.username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-800">{c.comment}</p>
              <p className="text-sm text-gray-500">@{c.username}</p>
            </div>
          </div>

          {/* Right side */}
          <span className="text-sm text-gray-400">{c.timeAgo}</span>
        </div>
      ))}
    </div>
  );
};

export default Commnts;
