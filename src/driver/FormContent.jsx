import { Search, ChevronDown, Filter, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import vehicleImage from '../assets/image 104.png'
import { useNavigate } from 'react-router-dom';

const MainContent = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ total: 0, page: 1, limit: 10, forms: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [isTypeOpen, setIsTypeOpen] = useState(false);
   
  const BASE_URL = 'https://ubktowingbackend-production.up.railway.app/api';
  const navigate = useNavigate();

  const types = ['All', 'Consent to Tow', 'Consent to Storage'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let url = `${BASE_URL}/driver/consentForm?page=${currentPage}&limit=10`;

      const token = localStorage.getItem("authToken");
            if (!token) {
              toast.error("Authentication token not found. Please log in.");
              return;
            }
      
      if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
      if (selectedType) url += `&type=${encodeURIComponent(selectedType)}`;
      try {
        const res = await fetch(url, {headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }});
        const json = await res.json();
        setData(json);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, searchTerm, selectedType]);

  return (
    <main className="flex-1 bg-gray-50 p-4 lg:p-6 overflow-auto">
      {/* Header */}
      <div className="mb-6 flex  flex-col sm:flex-row justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">All Forms</h1>
          <p className="text-gray-600">Find and manage your all forms</p>
        </div>

        <div>
          <button onClick={() => navigate('/consent-form')} className=" cursor-pointer w-full mt-[20px] sm:mt-[0px] cursor-pointer lg:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19ZM11.53 13.53C11.38 13.68 11.19 13.75 11 13.75C10.81 13.75 10.62 13.68 10.47 13.53L9.75 12.81V17C9.75 17.41 9.41 17.75 9 17.75C8.59 17.75 8.25 17.41 8.25 17V12.81L7.53 13.53C7.24 13.82 6.76 13.82 6.47 13.53C6.18 13.24 6.18 12.76 6.47 12.47L8.47 10.47C8.54 10.41 8.61 10.36 8.69 10.32C8.71 10.31 8.74 10.3 8.76 10.29C8.82 10.27 8.88 10.26 8.95 10.25C8.98 10.25 9 10.25 9.03 10.25C9.11 10.25 9.19 10.27 9.27 10.3C9.28 10.3 9.28 10.3 9.29 10.3C9.37 10.33 9.45 10.39 9.51 10.45C9.52 10.46 9.53 10.46 9.53 10.47L11.53 12.47C11.82 12.76 11.82 13.24 11.53 13.53Z" fill="white"/>
            <path d="M17.4297 8.81048C18.3797 8.82048 19.6997 8.82048 20.8297 8.82048C21.3997 8.82048 21.6997 8.15048 21.2997 7.75048C19.8597 6.30048 17.2797 3.69048 15.7997 2.21048C15.3897 1.80048 14.6797 2.08048 14.6797 2.65048V6.14048C14.6797 7.60048 15.9197 8.81048 17.4297 8.81048Z" fill="white"/>
            </svg>

            <span>New Consent form</span>
          </button>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="rounded-lg mb-6 p-0 sm:p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
          <div className="flex flex-col sm:flex-row gap-3 flex-1 w-full">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[52px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsTypeOpen(!isTypeOpen)}
                className="flex roboto-medium content-center justify-center items-center gap-2 px-4 py-2 cursor-pointer bg-[#E6E6E633] rounded-[52px] text-[#333333B2] hover:bg-gray-50"
              >
                <span>{selectedType || 'Form Type'}</span>
                <ChevronDown size={18} />
              </button>
              {isTypeOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[120px]">
                  {types.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type === 'All' ? '' : type);
                        setIsTypeOpen(false);
                        setCurrentPage(1);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-[#04367714] roboto-medium text-[#333333E5]">
                <th className="text-left whitespace-nowrap py-3 px-4 font-medium text-gray-600 flex items-center gap-2">
                  <input type="checkbox" className="rounded border-[#808080] w-[20px] h-[20px]" />
                  Forms Number
                </th>
                <th className="text-left py-3 px-4 roboto-medium text-[#333333E5]">Type</th>
                <th className="text-left py-3 px-4 roboto-medium text-[#333333E5]">Date</th>
                <th className="text-left py-3 px-4 roboto-medium text-[#333333E5]">Driver</th>
                <th className="text-left py-3 px-4 roboto-medium text-[#333333E5]">Vehicle</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="border-b border-[#E6E6E6]">
                    <td className="py-4 px-4 flex items-center gap-2">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : data.forms.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-500">
                    No forms found
                  </td>
                </tr>
              ) : (
                data.forms.map((form, index) => (
                  <tr key={form._id || index} className="border-b border-[#E6E6E6] hover:bg-[#04367714]">
                    <td className="py-4 px-4 flex items-center gap-2">
                      <input type="checkbox" className="rounded border-[#808080] w-[20px] h-[20px]" />
                      <span className="roboto-medium text-[#333333E5]">{form._id.substring(0, 7)}</span>
                    </td>
                    <td className="py-4 px-4 roboto-medium text-[#333333E5]">{form.type}</td>
                    <td className="py-4 px-4 roboto-medium text-[#333333E5]">{new Date(form.consentDateTime).toLocaleDateString('en-US')}</td>
                    <td className="py-4 px-4 roboto-medium text-[#333333E5]">{form.createdBy.name}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {/* <img src={vehicleImage} alt="Vehicle" className="w-8 h-8 rounded object-cover border" /> */}
                        <span className="text-gray-700">{form.vehicle.plate}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!loading && data.total > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
            <p className="text-gray-600 text-sm">
              Showing {(currentPage - 1) * data.limit + 1} to {Math.min(currentPage * data.limit, data.total)} of {data.total} results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-[#CCCCCC61] rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, Math.ceil(data.total / data.limit)) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 border  rounded ${currentPage === page ? 'bg-[#043677] text-white' : 'hover:bg-gray-100'}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage >= Math.ceil(data.total / data.limit)}
                className="px-3 py-1 border-[#CCCCCC61] border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;