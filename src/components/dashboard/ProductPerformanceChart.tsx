
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface ProductPerformanceChartProps {
  darkMode: boolean;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

const ProductPerformanceChart: React.FC<ProductPerformanceChartProps> = ({ darkMode, data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          innerRadius={40}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`${value}%`, 'Pourcentage']}
          contentStyle={{ 
            backgroundColor: darkMode ? '#1f2937' : '#fff',
            borderColor: darkMode ? '#374151' : '#e5e7eb',
            color: darkMode ? '#f3f4f6' : '#111827'
          }}
        />
        <Legend 
          verticalAlign="bottom" 
          height={36} 
          formatter={(value) => <span style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ProductPerformanceChart;
