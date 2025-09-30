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
  { date: "March 24", value: 15 },
  { date: "March 24", value: 42 },
  { date: "March 24", value: 67 },
  { date: "March 24", value: 64 },
  { date: "March 24", value: 28 },
  { date: "March 24", value: 20 },
  { date: "March 24", value: 16 },
  { date: "March 24", value: 61 },
  { date: "March 24", value: 29 },
  { date: "March 24", value: 38 },
  { date: "March 24", value: 53 },
];

const MeterReadings = () => {
  return (
    <div className="container mt-4">
      <Card className="p-3 shadow-sm">
        <h5 className="mb-3 fw-bold">Latest Meter Readings</h5>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid />
            <XAxis dataKey="date" />
            <YAxis dataKey="value" />
            <Tooltip />
            <Legend />
            <Scatter name="Kilometers" data={data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default MeterReadings;
