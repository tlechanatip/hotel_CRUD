import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // เรียกข้อมูลจาก API Backend
    fetch("http://localhost:8000/api/bookings") // สมมติว่ามี API Endpoint นี้
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data
          .sort((a, b) => b.booking_count - a.booking_count) // เปลี่ยนเป็น booking_count
          .slice(0, 5); // เอาแค่ 5 ห้องที่จองเยอะที่สุด

        const labels = sortedData.map((item) => item.room_number); // ใช้ room_number
        const values = sortedData.map((item) => item.booking_count); // ใช้ booking_count

        setChartData({
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
          ],
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h2>Top 5 Booked Rooms</h2>
      {chartData.labels ? (
        <Pie data={chartData} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default PieChart;
