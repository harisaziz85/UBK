// src/components/CostGraph.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

const data = [
  { date: "Apr 25", time: "0h", value: 0 },
  { date: "Apr 25", time: "0h", value: 0 },
  { date: "Apr 25", time: "0h", value: 0 },
  { date: "Apr 25", time: "12", value: 60 },
  { date: "Apr 25", time: "0h", value: 0 },
  { date: "Apr 25", time: "0h", value: 0 },
  { date: "Apr 25", time: "0h", value: 0 },
];

const CostGraph = () => {
  return (
    <div className="container mx-auto mt-4">
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3 fw-bold">Cost Trend</h5>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={(value) => (value === "12" ? "12" : "")}
            />
            <YAxis
              domain={[0, 70]}
              tickFormatter={(value) =>
                value === 0
                  ? "0h"
                  : value === 20
                  ? "1d"
                  : value === 40
                  ? "2d"
                  : value === 60
                  ? "6d"
                  : ""
              }
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeDasharray="5 5"
              dot={true}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default CostGraph;