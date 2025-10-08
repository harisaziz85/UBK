// src/components/InspectionSubmissions.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Fri", lastWeek: 0, thisWeek: 0 },
  { name: "Sat", lastWeek: 0, thisWeek: 0 },
  { name: "Sun", lastWeek: 0, thisWeek: 0 },
  { name: "Mon", lastWeek: 0, thisWeek: 0 },
  { name: "Tue", lastWeek: 0, thisWeek: 0 },
  { name: "Wed", lastWeek: 0, thisWeek: 0 },
  { name: "Thu", lastWeek: 0, thisWeek: 0 },
];

const InspectionSubmissions = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-md">
      <h2 className="text-[16px] font-semibold text-gray-800 mb-2">
        Inspection Submissions
      </h2>
      <div className="w-full h-[200px]">
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: "12px" }}
            />
            <Line
              type="monotone"
              dataKey="lastWeek"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ fill: "#3B82F6", r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="thisWeek"
              stroke="#FACC15"
              strokeWidth={2}
              dot={{ fill: "#FACC15", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InspectionSubmissions;
