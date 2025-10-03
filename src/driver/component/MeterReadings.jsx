// import React from "react";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Card } from "react-bootstrap";

// const data = [
//   { date: "March 24", value: 15 },
//   { date: "March 24", value: 42 },
//   { date: "March 24", value: 67 },
//   { date: "March 24", value: 64 },
//   { date: "March 24", value: 28 },
//   { date: "March 24", value: 20 },
//   { date: "March 24", value: 16 },
//   { date: "March 24", value: 61 },
//   { date: "March 24", value: 29 },
//   { date: "March 24", value: 38 },
//   { date: "March 24", value: 53 },
// ];

// const MeterReadings = () => {
//   return (
//     <div className="container mt-4">
//       <Card className="p-3 shadow-sm">
//         <h5 className="mb-3 fw-bold">Latest Meter Readings</h5>
//         <ResponsiveContainer width="100%" height={400}>
//           <ScatterChart
//             margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
//           >
//             <CartesianGrid />
//             <XAxis dataKey="date" />
//             <YAxis dataKey="value" />
//             <Tooltip />
//             <Legend />
//             <Scatter name="Kilometers" data={data} fill="#8884d8" />
//           </ScatterChart>
//         </ResponsiveContainer>
//       </Card>
//     </div>
//   );
// };

// export default MeterReadings;




import React, { useState } from "react";
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

  // Chart data
  const submissionsData = {
    labels: ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"],
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

  const recentComments = [
    {
      id: 1,
      user: "Ali Jama",
      avatar: "https://i.pravatar.cc/150?img=12",
      action: "commented on Driver: Huzaifa",
      message: "Waiting for response, Check status",
      time: "11 days ago",
    },
    {
      id: 2,
      user: "Ali Jama",
      avatar: "https://i.pravatar.cc/150?img=13",
      action: "commented on Vehicle: Ex-098666",
      message: "Fuel updated...",
      time: "11 days ago",
    },
    {
      id: 3,
      user: "Ali Jama",
      avatar: "https://i.pravatar.cc/150?img=14",
      action: "commented on Vehicle: Ex-098666",
      message: "Fuel updated...",
      time: "11 days ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white ">
        <div className="px-6 py-3">
          <h4 className="font-semibold text-lg">Dashboard</h4>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
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
      <h2 className="text-4xl font-bold text-blue-500 mb-0">0%</h2>
      <p className="text-gray-500 text-sm">This Week</p>
    </div>
    <div className="text-right">
      <div className="flex items-center text-blue-500 mb-1">
        <TrendingUp size={16} className="mr-1" />
        <span className="font-semibold">19</span>
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
      <h2 className="text-4xl font-bold text-red-500 mb-0">0%</h2>
      <p className="text-gray-500 text-sm">This Week</p>
    </div>
    <div className="text-right">
      <div className="flex items-center text-blue-500 mb-1">
        <TrendingUp size={16} className="mr-1" />
        <span className="font-semibold">19</span>
      </div>
      <p className="text-gray-400 text-xs">Change From Last Week</p>
    </div>
  </div>
</div>



          </div>
        </div>

        {/* Recent Comments Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-semibold">Recent Comments</h5>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition">
            <div>
              {recentComments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`flex items-start p-3 ${
                    index !== recentComments.length - 1
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeterReadings;
