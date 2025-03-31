'use client'; // Ensure this is at the top

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Earn Less than ₹100/day", value: 70, color: "#ff7f50" },
  { name: "Earn Above ₹100/day", value: 30, color: "#4682b4" },
];

const WomenLaborSection = () => {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold text-gray-800">
        She Builds. She Serves. She Starves.
      </h2>
      <div className="flex justify-center items-center mt-6">
        <div style={{ width: "100%", maxWidth: "400px", height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={100} fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default WomenLaborSection;
