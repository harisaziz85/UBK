import React, { useState, useEffect, useRef, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MeterReadings = () => {
  const [activeTab, setActiveTab] = useState("thisWeek");
  const [stats, setStats] = useState(null);
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
      const response = await fetch(`${baseUrl}/common/comment/driver/received?page=${pageNum}&limit=10`, {
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
      }
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setLoadingMore(false);
    }
  }, [baseUrl, loadingMore]);

  useEffect(() => {
    const div = commentsRef.current;
    if (!div) return;
    const handleScroll = () => {
      if (loadingMore || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = div;
      if (scrollHeight - scrollTop - clientHeight < 100) {
        fetchComments(page);
      }
    };
    div.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      div.removeEventListener("scroll", handleScroll);
    };
  }, [loadingMore, hasMore, page, fetchComments]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("No token found. Please log in.");
          setLoading(false);
          return;
        }

        // Fetch stats
        const statsResponse = await fetch(`${baseUrl}/common/stats`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData.data.inspections);
        }

        await fetchComments(1);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, fetchComments]);

  // Chart data
  const inspections = stats || {
    thisWeek: 0,
    lastWeek: 0,
    changePercent: "0",
    passedPercentage: "0.00",
    failedPercentage: "100.00",
    passedChangePercent: "0",
    failedChangePercent: "0",
    daily: [
      { day: "Sun", count: 0 },
      { day: "Mon", count: 0 },
      { day: "Tue", count: 0 },
      { day: "Wed", count: 0 },
      { day: "Thu", count: 0 },
      { day: "Fri", count: 0 },
      { day: "Sat", count: 0 },
    ],
  };

  const submissionsData = inspections ? {
    labels: inspections.daily.map(d => d.day),
    datasets: [
      {
        data: inspections.daily.map(d => d.count),
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#60A5FA",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  } : {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.1)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#60A5FA",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Header Skeleton */}
        <div className="bg-white">
          <div className=" px-0 sm:px-6 py-3">
            <Skeleton height={24} width={100} />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="px-0 sm:px-6 py-6">
          {/* Inspections Section Skeleton */}
          <div className="mb-6">
            <Skeleton height={20} width={120} className="mb-3" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inspection Submissions Card Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <Skeleton height={16} width={150} className="mb-3" />
                <div className="flex gap-4 mb-3 text-sm">
                  <Skeleton height={20} width={80} />
                  <Skeleton height={20} width={80} />
                </div>
                <div className="h-32">
                  <Skeleton height={128} />
                </div>
              </div>

              {/* Inspection Item Pass Rate Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <Skeleton height={16} width={150} className="mb-4" />
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <Skeleton height={32} width={50} />
                    <Skeleton height={12} width={80} className="mt-1" />
                  </div>
                  <div className="text-right">
                    <Skeleton height={16} width={60} className="mb-1" />
                    <Skeleton height={12} width={120} />
                  </div>
                </div>
              </div>

              {/* Inspection Item Failure Rate Skeleton */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <Skeleton height={16} width={150} className="mb-4" />
                <div className="flex items-end justify-between mt-auto">
                  <div>
                    <Skeleton height={32} width={50} />
                    <Skeleton height={12} width={80} className="mt-1" />
                  </div>
                  <div className="text-right">
                    <Skeleton height={16} width={60} className="mb-1" />
                    <Skeleton height={12} width={120} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Comments Section Skeleton */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Skeleton height={20} width={120} />
            </div>
            <div className="bg-white rounded-xl shadow-sm">
              <div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-start p-3 border-b border-gray-200">
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
          </div>
        </div>
      </div>
    );
  }

  const changeSign = inspections.changePercent.startsWith('-') ? '-' : '+';
  const changeValue = Math.abs(parseFloat(inspections.changePercent)).toFixed(2);

  // Pass change
  const passChangeSign = inspections.passedChangePercent?.startsWith('-') ? '-' : '+';
  const passChangeValue = Math.abs(parseFloat(inspections.passedChangePercent || "0")).toFixed(2);

  // Fail change
  const failChangeSign = inspections.failedChangePercent?.startsWith('-') ? '-' : '+';
  const failChangeValue = Math.abs(parseFloat(inspections.failedChangePercent || "0")).toFixed(2);


  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className=" ">
        <div className=" px-0 sm:px-6 py-3">
          <h4 className="robotosemibold text-[24px]">Dashboard</h4>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-0 sm:px-6 py-6">
        {/* Inspections Section */}
        <div className="mb-6">
          <h5 className="font-semibold mb-3">Inspections</h5>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Inspection Submissions Card */}
            <div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition">
              <h6 className="font-semibold mb-3">Inspection Submissions</h6>

              {/* Tab Navigation */}
              <div className="flex gap-4 mb-3 text-sm">
                <button
                  onClick={() => setActiveTab("lastWeek")}
                  className={`${
                    activeTab === "lastWeek"
                      ? "text-blue-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  Last week
                </button>
                <button
                  onClick={() => setActiveTab("thisWeek")}
                  className={`${
                    activeTab === "thisWeek"
                      ? "text-blue-500 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  This week
                </button>
              </div>

              {/* Chart */}
              <div className="h-32">
                <Line data={submissionsData} options={chartOptions} />
              </div>
            </div>



{/* Inspection Item Pass Rate */}
<div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between">
  <h6 className="font-semibold mb-4">Inspection Item Pass Rate</h6>
  
  <div className="flex items-end justify-between mt-auto">
    <div>
      <h2 className="text-4xl font-bold text-[#007BC4] mb-0">{inspections.passedPercentage}%</h2>
      <p className="text-gray-500 text-sm">This Week</p>
    </div>

    <div className="text-right">
      <div className={`flex items-center mb-1 ${passChangeSign === '+' ? 'text-[#007BC4]' : 'text-red-500'}`}>
        {passChangeSign === '+' ? (
          <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0.5L21.3923 18.5H0.607696L11 0.5Z" fill="#007BC4"/>
</svg>

        ) : (
         <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0.5L21.3923 18.5H0.607696L11 0.5Z" fill="#007BC4"/>
</svg>

        )}
        <span className="robotomedium text-[24px]">{passChangeSign}{passChangeValue}%</span>
      </div>

      <p className="text-gray-400 text-xs">Change From Last Week</p>
    </div>


  </div>
</div>


{/* Inspection Item Failure Rate */}
<div className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between">
  <h6 className="font-semibold mb-4">Inspection Item Failure Rate</h6>
  
  <div className="flex items-end justify-between mt-auto">
    <div>
      <h2 className="text-4xl font-bold text-red-500 mb-0">{inspections.failedPercentage}%</h2>
      <p className="text-gray-500 text-sm">This Week</p>
    </div>
    <div className="text-right">
        <div className={`flex items-center mb-1 ${failChangeSign === '+' ? 'text-red-500' : 'text-green-500'}`}>
          {failChangeSign === '+' ? (
      <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0.5L21.3923 18.5H0.607696L11 0.5Z" fill="#007BC4"/>
</svg>

          ) : (
          <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11 0.5L21.3923 18.5H0.607696L11 0.5Z" fill="#007BC4"/>
</svg>

          )}
          <span className="robotomedium text-[24px]">{failChangeSign}{failChangeValue}%</span>
        </div>
      <p className="text-gray-400 text-xs">Change From Last Week</p>
    </div>
  </div>
</div>



          </div>
        </div>




        {/* Recent Comments Section */}
        {recentConversations.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-semibold">Recent Comments</h5>
            </div>

            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <div ref={commentsRef} className="max-h-96 overflow-y-auto">
                {recentConversations.map((comment, index) => (
                  <div
                    key={comment.id}
                    className={`flex items-start p-3 ${
                      index !== recentConversations.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }`}
                  >
                    <img
                      src={comment.avatar}
                      alt={comment.user}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1 ml-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm mb-1">
                            <span className="font-semibold">{comment.user}</span>{" "}
                            <span className="text-gray-500">
                              {comment.action}
                            </span>
                          </p>
                          <p className="text-gray-500 text-sm">
                            {comment.message}
                          </p>
                        </div>
                        <span className="text-gray-400 text-xs whitespace-nowrap">
                          {comment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {loadingMore && (
                  <div className="p-3 text-center">
                    Loading more...
                  </div>
                )}
                {!hasMore && recentConversations.length > 0 && (
                  <div className="p-3 text-center text-gray-500 text-sm">No more comments</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeterReadings;