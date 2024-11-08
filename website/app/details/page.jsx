'use client';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSearchParams } from 'next/navigation';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import Sidebar from '../_components/Sidebar';
import Image from 'next/image';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, zoomPlugin);

// Generate random stress level data
const generateRandomData = (days) => {
  const data = [];
  for (let i = 0; i < days; i++) {
    data.push(Math.floor(Math.random() * 100) + 1);
  }
  return data;
};

// Generate dates from October 1, 2024, to today
const generateDates = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split('T')[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
};

const Detail = () => {
  const searchParams = useSearchParams();
  const rollNo = searchParams.get('rollNo');
  const studentName = searchParams.get('name');
  const profileImage = '/anish234.jpg'; 

  const today = new Date();
  const startDate = new Date('2024-10-01');
  const dates = generateDates(startDate, today);

  // State to toggle between daily/hourly view
  const [selectedDate, setSelectedDate] = useState(null);
  const [dailyData, setDailyData] = useState(generateRandomData(dates.length));

  // Generate random hourly data for selected date
  const hourlyData = selectedDate ? generateRandomData(24) : [];

  // Find peak value indexes for daily data
  const peakIndex = dailyData.indexOf(Math.max(...dailyData));
  
  // Data for Line Chart based on selection
  const data = {
    labels: selectedDate ? Array.from({ length: 24 }, (_, i) => `${i}:00`) : dates,
    datasets: [
      {
        label: selectedDate ? 'Hourly Stress Level' : 'Daily Stress Level',
        data: selectedDate ? hourlyData : dailyData,
        borderColor: '#4ade80',
        backgroundColor: 'rgba(74, 222, 128, 0.5)',
        fill: true,
        pointBackgroundColor: (ctx) => {
          const isToday = ctx.label === today.toISOString().split('T')[0];
          const isPeak = ctx.dataIndex === peakIndex;
          return isToday ? '#ff0000' : isPeak ? '#ff8800' : '#4ade80';
        },
        pointRadius: (ctx) => (ctx.dataIndex === peakIndex ? 6 : 3),
        pointHoverBackgroundColor: '#4ade80', // Pointer color for hover
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: { color: '#ffffff' },
      },
      title: {
        display: true,
        text: selectedDate ? `Stress Level on ${selectedDate}` : 'Stress Level Over Time',
        color: '#ffffff',
      },
      zoom: {
        pan: { enabled: true, mode: 'x' },
        zoom: {
          wheel: { enabled: true, speed: 0.000001 }, 
          pinch: { enabled: true },
          mode: 'x',
          limits: {
            x: { min: 'original', max: 'original' }, 
          },
        },
      },
    },
    scales: {
      x: { 
        ticks: { 
          color: '#ffffff',
          callback: (val, index) => {
            return dates[index]?.slice(5); // Show date in "MM-DD" format for readability
          },
        },
      },
      y: { beginAtZero: true, min: 0, max: 100, ticks: { color: '#ffffff' } },
    },
    maintainAspectRatio: false,
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const chart = elements[0].element;
        const clickedIndex = chart.index;
        const clickedDate = dates[clickedIndex];
        
        // Set the selected date for hourly view
        setSelectedDate(clickedDate);
      }
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        event.native.target.style.cursor = 'pointer';
      } else {
        event.native.target.style.cursor = 'default';
      }
    },
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 p-6 flex flex-col h-full">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 pl-1/4 py-8 px-4">
        <div className="flex items-center mb-6">
          <Image src={profileImage} alt="Profile Image" width={100} height={100} className="rounded-full mr-4" />
          <div>
            <h2 className="text-3xl font-bold">Stress Report for {studentName}</h2>
            <p className="text-lg text-gray-400">Roll No: {rollNo}</p>
          </div>
        </div>

        {/* Stress Level Graph */}
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <Line data={data} options={options} height={400} />
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className="mt-4 bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600"
            >
              Back to Daily View
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
