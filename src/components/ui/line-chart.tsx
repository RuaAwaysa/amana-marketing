"use client";
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

interface LineChartProps {
  data: any[];
  xAxisKey: string;
  yAxisKey: string;
  title: string;
}

const CustomLineChart: React.FC<LineChartProps> = ({
  data,
  xAxisKey,
  yAxisKey,
  title,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
          <XAxis dataKey={xAxisKey} stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4A5568" }}
            labelStyle={{ color: "#F9FAFB" }}
          />
          <Legend wrapperStyle={{ color: "#F9FAFB" }} />
          <Line type="monotone" dataKey={yAxisKey} stroke="#3B82F6" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
