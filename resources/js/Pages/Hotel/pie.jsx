import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import Navbar from '@/Components/Navbar';
// ลงทะเบียน Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.room_number),
    datasets: [
      {
        label: 'จำนวนการจองต่อห้อง',
        data: data.map(item => item.booking_count),
        backgroundColor: ['#f87171', '#60a5fa', '#fbbf24', '#34d399', '#a78bfa'],
        hoverBackgroundColor: ['#ef4444', '#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'],
      },
    ],
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 ">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
          ห้องพักที่มีการจองมากที่สุด
        </h2>
        <Pie data={chartData} />
        <ul className="mt-4 space-y-2">
          {data.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-600">
              <span className="font-medium">{item.room_number}</span>
              <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                {item.booking_count} การจอง
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};

export default PieChart;
