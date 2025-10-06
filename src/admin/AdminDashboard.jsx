import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios'; // Added missing import
import AdminComments from './components/AdminComments';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://ubktowingbackend-production.up.railway.app/api/common/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const data = stats && {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Last week',
        data: Array(7).fill(stats?.inspections?.lastWeek / 7), // Average distribution
        borderColor: '#3B82F6',
        backgroundColor: '#3B82F6',
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: '#3B82F6',
      },
      {
        label: 'This week',
        data: stats?.inspections?.daily.map(d => d.count),
        borderColor: '#F59E0B',
        backgroundColor: '#F59E0B',
        fill: false,
        pointRadius: 5,
        pointBackgroundColor: '#F59E0B',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Submissions',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days',
        },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Inspection Submissions with Chart */}
        <div className=" bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Inspection Submissions</h3>
          <div className="mt-4 h-64">
            {loading ? (
              <div className="flex items-center justify-center h-full">Loading...</div>
            ) : stats ? (
              <Line data={data} options={options} />
            ) : (
              <div className="flex items-center justify-center h-full">Failed to load data</div>
            )}
          </div>
        </div>

        {/* Inspection Item Pass Rate */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between" >
          <h3 className="text-lg font-semibold text-gray-700">Inspection Item Pass Rate</h3>
          <div className='flex justify-between'>

          <div className="mt-4 text-center">
            <div className="text-sm text-gray-500">This Week</div>

            <div className="text-2xl font-bold text-blue-600">
              {loading ? '...' : `${stats?.inspections?.passedPercentage || 0}%`}
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm text-gray-500"> Change From Last Week</div>

            <span className="text-blue-600 font-semibold">
              {loading ? '...' : stats?.inspections?.changePercent ? `▲ ${stats.inspections.changePercent}` : '▲ 0'}
            </span>
          </div></div>
        </div>

        {/* Inspection Item Failure Rate */}
        <div className="bg-white p-4 rounded-lg shadow flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-700">Inspection Item Failure Rate</h3>
          <div className='flex justify-between'>
          <div className="mt-4 text-center">
            <div className="text-sm text-gray-500">This Week</div>

            <div className="text-2xl font-bold text-red-600">
              {loading ? '...' : `${stats?.inspections?.failedPercentage || 0}%`}
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm text-gray-500"> Change From Last Week</div>

            <span className="text-red-600 font-semibold">
              {loading ? '...' : stats?.inspections?.changePercent ? `▲ ${stats.inspections.changePercent}` : '▲ 0'}
            </span>
          </div>
          </div>
        </div>
      </div>
      <div className='my-10'>
      <AdminComments/>

      </div>
    </div>
  );
};

export default AdminDashboard;