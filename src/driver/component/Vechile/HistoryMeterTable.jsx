import React, { useState } from 'react';
import { Search, ChevronDown, Filter, Calendar } from 'lucide-react';
import logo from '../../../assets/image 104.png';
import AddMeterPopup from './AddMeterPopup';

const MeterHistoryTable = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const entries = [
    { name: 'EX06-02', date: '08/29/2025', value: '508,740 km', ago: '2,953 km ago', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
    { name: 'EX06-02', date: '08/29/2025', value: '508,740 km', ago: '2,953 km ago', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
    { name: 'EX06-02', date: '08/29/2025', value: '508,740 km', ago: '', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
    { name: 'EX06-02', date: '08/29/2025', value: '508,740 km', ago: '2,953 km ago', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
    { name: 'EX06-02', date: '08/29/2025', value: '508,740 km', ago: '2,953 km ago', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
    { name: 'EX06-47', date: '08/29/2025', value: '508,740 km', ago: '2,953 km ago', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
    { name: 'EX06-02', date: '08/29/2025', value: '508,740 km', ago: '2,953 km ago', type: 'Primary', void: '--', note: 'Motive (Keep Trucking)', status: '--', reason: '--' },
  ];

  return (
    <div className="p-4 lg:p-0 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Meter History</h1>
        <button onClick={() => setIsPopupOpen(true)} className=" cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
          <span>+ Add Meter Entry</span>
        </button>
      </div>

      {/* Other existing content */}
      {isPopupOpen && <AddMeterPopup onClose={() => setIsPopupOpen(false)} />}


      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-4 gap-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-1">
          <div className="relative flex-1 max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[52px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
        </div>
        <div className="text-sm text-gray-500 mt-2 lg:mt-0 flex items-center gap-2">
          <span>1-14 of 14</span>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button className="p-1 hover:bg-gray-200 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-200 bg-[#04367714] roboto-medium text-[#333333E5]">
              <th className="text-left py-3 px-4 font-medium text-gray-600 flex items-center gap-2 whitespace-nowrap">
                <input type="checkbox" className="rounded border-[#808080] w-[20px] h-[20px]" />
                Name
              </th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Meter Date</th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Meter Value</th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Meter Type</th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Void</th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Meter Type</th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Void Status</th>
              <th className="text-left py-3 px-4 whitespace-nowrap">Auto-void Reason</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => (
              <tr key={index} className="border-b border-[#E6E6E6] hover:bg-[#04367714]">
                <td className="py-4 px-4 flex items-center gap-2 whitespace-nowrap">
                  <img src={logo} alt={`${entry.name} logo`} className="w-6 h-6 rounded-[4px] object-cover" />
                  <span className=" roboto-medium text-[#333333E5] whitespace-nowrap">{entry.name}</span>
                </td>

               <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">
  <div className="flex items-center gap-2 whitespace-nowrap">
    <span className="whitespace-nowrap">{entry.date}</span>
    <Calendar size={16} className="text-gray-400 flex-shrink-0" />
  </div>
</td>


                <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">
                  {entry.value}
                  {entry.ago && <span className="text-gray-500 ml-2 whitespace-nowrap">{entry.ago}</span>}
                </td>
                <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">{entry.type}</td>
                <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">{entry.void}</td>
                <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">{entry.note}</td>
                <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">{entry.status}</td>
                <td className="py-4 px-4 roboto-medium text-[#333333E5] whitespace-nowrap">{entry.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default MeterHistoryTable;