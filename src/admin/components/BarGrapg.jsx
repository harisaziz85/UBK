// src/components/BarGraph.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "react-bootstrap";

const data = [
  { name: "Aug 2025", cost: 1.5 },
];

const BarGraph = () => {
  return (
    <div className="container mx-auto mt-4">
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3 fw-bold">Cost Per Meter</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 2]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="cost" fill="#8884d8" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default BarGraph;