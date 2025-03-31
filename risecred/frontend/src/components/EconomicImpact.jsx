import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { motion } from "framer-motion";
import { useState } from "react";

const data = [
  { name: "Lost Productivity", value: 500000, details: "Lost productivity due to unfair labor practices results in reduced efficiency and increased costs." },
  { name: "Legal Costs", value: 150000, details: "Companies face hefty legal fines and lawsuits due to non-compliance with fair labor laws." },
  { name: "Reputation Damage", value: 200000, details: "Unethical labor practices lead to brand damage and loss of customer trust." },
  { name: "Credibility Rise", value: 80000, details: "Fair labor policies enhance credibility, attracting ethical consumers and investors." },
  { name: "Fair Labor ROI", value: 120000, details: "Investing in fair labor leads to increased employee retention and productivity." },
];

const EconomicImpact = () => {
  const [selectedBar, setSelectedBar] = useState(null);

  return (
    <motion.div className="p-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">The Economic Cost of Unethical Labor Practices</h2>
      <ResponsiveContainer width="80%" height={350}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip cursor={{ fill: "#f0f0f0" }} />
          <Legend />
          <Bar 
            dataKey="value" 
            fill="#2196F3" 
            barSize={50} 
            radius={[5, 5, 0, 0]} 
            onClick={(data) => setSelectedBar(data)}
            className="cursor-pointer"
          />
        </BarChart>
      </ResponsiveContainer>

      {selectedBar && (
        <motion.div 
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4" 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          onClick={() => setSelectedBar(null)}
        >
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-left"
            initial={{ scale: 0.8 }} 
            animate={{ scale: 1 }}
          >
            <h3 className="text-xl font-bold mb-2">{selectedBar.name}</h3>
            <p className="text-gray-700">{selectedBar.details}</p>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default EconomicImpact;
