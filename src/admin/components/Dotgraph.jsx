// src/components/Dotgraph.jsx
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

const data = [
  { date: "March 24", value: 20 },  // Light purple
  { date: "March 24", value: 40 },  // Light blue
  { date: "March 24", value: 25 },  // Light purple
  { date: "March 24", value: 60 },  // Teal
  { date: "March 24", value: 70 },  // Green
  { date: "March 24", value: 65 },  // Blue
  { date: "March 24", value: 50 },  // Orange
  { date: "March 24", value: 35 },  // Pink
  { date: "March 24", value: 20 },  // Yellow
];

const Dotgraph = () => {
  return (
    <div className="container mt-4">
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3 fw-bold">Latest Meter Readings</h5>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis dataKey="value" domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Scatter
              name="Kilometers"
              data={data}
              fill="#8884d8" // Default fill color, overridden by individual colors
              shape="circle"
            >
              {data.map((entry, index) => (
                <Scatter
                  key={`dot-${index}`}
                  fill={
                    [
                      "rgba(147, 112, 219, 0.6)", // Light purple
                      "rgba(54, 162, 235, 0.6)",  // Light blue
                      "rgba(147, 112, 219, 0.6)", // Light purple
                      "rgba(75, 192, 192, 0.6)",  // Teal
                      "rgba(144, 238, 144, 0.6)", // Green
                      "rgba(0, 0, 255, 0.6)",     // Blue
                      "rgba(255, 165, 0, 0.6)",   // Orange
                      "rgba(255, 105, 180, 0.6)", // Pink
                      "rgba(255, 215, 0, 0.6)",   // Yellow
                    ][index]
                  }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dotgraph;