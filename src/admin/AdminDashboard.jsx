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
import axios from 'axios';
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
        data: Array(7).fill(stats?.inspections?.lastWeek / 7),
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

  const Shimmer = () => (
    <div className="animate-pulse">
      <div className="h-full w-full bg-gray-200 rounded-lg" />
    </div>
  );

  const ShimmerCard = () => (
    <div className="animate-pulse flex flex-col justify-between h-full">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="flex justify-between">
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-12 mx-auto mt-2"></div>
        </div>
        <div className="text-center">
          <div className="h-8 bg-gray-200 rounded w-16 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-12 mx-auto mt-2"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <p className="robotosemibold text-[20px] sm:text-[24px]">Dashboard</p>
      <p className="mt-[16px] sm:mt-[24px] mb-[16px] robotomedium text-[18px] sm:text-[20px]">Inspections</p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Inspection Submissions with Chart */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow" style={{ height: '200px', minHeight: '230px' }}>
          <h3 className="text-[14px] sm:text-[16px] robotomedium text-gray-700">Inspection Submissions</h3>
          <div className="mt-3 sm:mt-4 h-[calc(100%-2.5rem)]">
            {loading ? (
              <Shimmer />
            ) : stats ? (
              <Line data={data} options={options} />
            ) : (
              <div className="flex items-center justify-center h-full">Failed to load data</div>
            )}
          </div>
        </div>

        {/* Inspection Item Pass Rate */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col justify-between" style={{ height: '200px', minHeight: '230px' }}>
          {loading ? (
            <ShimmerCard />
          ) : (
            <>
              <h3 className="text-[14px] sm:text-[16px] robotomedium text-gray-700">Inspection Item Pass Rate</h3>
              <div className="flex  flex-row justify-between mt-3 sm:mt-4">
                <div className="text-center mb-2 sm:mb-0">
                  <div className="text-[20px] sm:text-[24px] font-bold text-[#007BC4]">
                    {stats?.inspections?.passedPercentage || 0}%
                  </div>
                  <div className="text-[10px] sm:text-[12px] robotomedium text-gray-500">This Week</div>
                </div>
                <div className="text-center">
                  <span className="text-[#007BC4] text-[20px] sm:text-[24px] font-semibold">
                    {stats?.inspections?.passedChangePercent ? `▲ ${stats.inspections.passedChangePercent}` : '▲ 0'}
                  </span>
                  <div className="text-[10px] sm:text-[12px] robotomedium text-gray-500">Change From Last Week</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Inspection Item Failure Rate */}
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow flex flex-col justify-between" style={{ height: '200px', minHeight: '230px' }}>
          {loading ? (
            <ShimmerCard />
          ) : (
            <>
              <h3 className="text-[14px] sm:text-[16px] robotomedium text-gray-700">Inspection Item Failure Rate</h3>
              <div className="flex flex-row justify-between mt-3 sm:mt-4">
                <div className="text-center mb-2 sm:mb-0">
                  <div className="text-[20px] sm:text-2xl font-bold text-red-600">
                    {stats?.inspections?.failedPercentage || 0}%
                  </div>
                  <div className="text-[10px] sm:text-[12px] robotomedium text-gray-500">This Week</div>
                </div>
                <div className="text-center">
                  <span className="text-[#007BC4] text-[20px] sm:text-[24px] font-semibold">
                    {stats?.inspections?.failedChangePercent ? `▲ ${stats.inspections.failedChangePercent}` : '▲ 0'}
                  </span>
                  <div className="text-[10px] sm:text-[12px] robotomedium text-gray-500">Change From Last Week</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="my-6 sm:my-10">
        {loading ? (
          <div className="bg-white p-3 sm:p-4 rounded-lg shadow animate-pulse">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-3 sm:mb-4"></div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center p-2 border-b border-gray-200">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-full mr-2"></div>
                  <div className="flex-1">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="h-3 sm:h-4 bg-gray-200 rounded w-12 sm:w-16 ml-2"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AdminComments />
        )}
      </div>
      <div className="bg-white p-3 sm:p-4 rounded-lg shadow w-full md:w-[30%]">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-5 sm:h-6 bg-gray-200 rounded w-1/4 mb-3 sm:mb-4"></div>
            <div className="flex flex-row justify-between">
              <div className="text-center mb-2 sm:mb-0">
                <div className="h-7 sm:h-8 bg-gray-200 rounded w-14 sm:w-16 mx-auto"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-10 sm:w-12 mx-auto mt-2"></div>
              </div>
              <div className="text-center">
                <div className="h-7 sm:h-8 bg-gray-200 rounded w-14 sm:w-16 mx-auto"></div>
                <div className="h-3 sm:h-4 bg-gray-200 rounded w-10 sm:w-12 mx-auto mt-2"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3 className="text-base sm:text-lg robotomedium text-gray-700">Vehicle Assignments</h3>
            <div className="mt-3 sm:mt-4 flex flex-row justify-between">
              <div className="text-center mb-2 sm:mb-0">
                <div className="text-xl sm:text-2xl font-bold text-green-600">
                  {stats?.vehicles?.assigned || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">Assigned</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-orange-600">
                  {stats?.vehicles?.unassigned || 0}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">Unassigned</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;