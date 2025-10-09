import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Filter, User } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const VehiclesTable = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const baseUrl = 'https://ubktowingbackend-production.up.railway.app/api'; // Replace with actual base URL if needed
                const response = await fetch(`${baseUrl}/driver/vechile/my`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch vehicles');
                }

                const data = await response.json();
                setVehicles(data.vehicles || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.year.toString().includes(searchTerm) ||
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.currentMilage.toString().includes(searchTerm) ||
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="p-4 lg:p-0 bg-gray-50">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Vehicles</h1>
            <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-[52px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-[#04367714] text-[#333333E5] border-b border-gray-200">
                            <th className="py-3 px-4 text-left font-medium">Name</th>
                            <th className="py-3 px-4 text-left font-medium">Year</th>
                            <th className="py-3 px-4 text-left font-medium">Make</th>
                            <th className="py-3 px-4 text-left font-medium">Model</th>
                            <th className="py-3 px-4 text-left font-medium">VIN</th>
                            {/* <th className="py-3 px-4 text-left font-medium">Status</th> */}
                            <th className="py-3 px-4 text-left font-medium">Current Meter</th>
                            <th className="py-3 px-4 text-left font-medium">License Plate</th>
                            {/* <th className="py-3 px-4 text-left font-medium">Watchers</th> */}
                            <th className="py-3 px-4 text-left font-medium"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            Array.from({ length: 10 }).map((_, index) => (
                                <tr key={index} className="border-b border-[#E6E6E6]">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton width={24} height={24} circle />
                                            <Skeleton width={100} />
                                        </div>
                                    </td>
                                    <td className="py-4 px-4"><Skeleton width={60} /></td>
                                    <td className="py-4 px-4"><Skeleton width={80} /></td>
                                    <td className="py-4 px-4"><Skeleton width={80} /></td>
                                    <td className="py-4 px-4"><Skeleton width={100} /></td>
                                    <td className="py-4 px-4"><Skeleton width={80} /></td>
                                    <td className="py-4 px-4"><Skeleton width={100} /></td>
                                    <td className="py-4 px-4"><Skeleton width={80} /></td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-2">
                                            <Skeleton width={20} height={20} />
                                            <Skeleton width={20} height={20} />
                                            <Skeleton width={20} height={20} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            filteredVehicles.map((vehicle) => (
                                <tr key={vehicle._id}
                                    onClick={() => navigate(`/vehicles/${vehicle._id}`)} className="border-b border-[#E6E6E6] hover:bg-[#04367714]">
                                    <td className="py-3 px-4 flex items-center gap-2">
                                        <img src={vehicle.photo} alt={`${vehicle.name} logo`} className="w-6 h-6 rounded-[4px]" />
                                        <span>{vehicle.name}</span>
                                    </td>
                                    <td className="py-4 px-4">{vehicle.year}</td>
                                    <td className="py-4 px-4">{vehicle.make}</td>
                                    <td className="py-4 px-4">{vehicle.model}</td>
                                    <td className="py-4 px-4">{vehicle.vin}</td>

                                    {/* <td className="py-4 px-4">
                                        {vehicle.status === "Active" ? (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <span className="w-2 h-2 rounded-full bg-green-600"></span>
                                                <span className='text-[#333333E5]'>Active</span>
                                            </div>
                                        ) : (
                                            <span className="text-gray-600">{vehicle.status}</span>
                                        )}

                                    </td> */}

                                    <td className="py-4 px-4">{vehicle.currentMilage}</td>
                                    <td className="py-4 px-4">{vehicle.licensePlate}</td>
                                    {/* <td className="py-4 px-4">0 watcher</td> */}
                                    <td className="py-4 px-4 flex items-center justify-between">

                                        {/* <div className="flex items-center gap-2">
                                            <img src={vehicle.operator.image} alt={vehicle.operator.name} className="w-6 h-6 rounded-full" />
                                            <span>{`${vehicle.operator.name} (${vehicle.operator.id})`}</span>
                                        </div> */}
                                        <div className="flex items-center gap-2">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.5013 18.3327H12.5013C16.668 18.3327 18.3346 16.666 18.3346 12.4993V7.49935C18.3346 3.33268 16.668 1.66602 12.5013 1.66602H7.5013C3.33464 1.66602 1.66797 3.33268 1.66797 7.49935V12.4993C1.66797 16.666 3.33464 18.3327 7.5013 18.3327Z" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M7.4987 8.33333C8.41917 8.33333 9.16536 7.58714 9.16536 6.66667C9.16536 5.74619 8.41917 5 7.4987 5C6.57822 5 5.83203 5.74619 5.83203 6.66667C5.83203 7.58714 6.57822 8.33333 7.4987 8.33333Z" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M2.22656 15.7918L6.3349 13.0335C6.99323 12.5918 7.94323 12.6418 8.5349 13.1501L8.8099 13.3918C9.4599 13.9501 10.5099 13.9501 11.1599 13.3918L14.6266 10.4168C15.2766 9.85846 16.3266 9.85846 16.9766 10.4168L18.3349 11.5835" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.08464 15.8327H6.66797C3.33464 15.8327 1.66797 14.9993 1.66797 10.8327V6.66602C1.66797 3.33268 3.33464 1.66602 6.66797 1.66602H13.3346C16.668 1.66602 18.3346 3.33268 18.3346 6.66602V10.8327C18.3346 14.166 16.668 15.8327 13.3346 15.8327H12.918C12.6596 15.8327 12.4096 15.9577 12.2513 16.166L11.0013 17.8327C10.4513 18.566 9.5513 18.566 9.0013 17.8327L7.7513 16.166C7.61797 15.9827 7.30964 15.8327 7.08464 15.8327Z" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M5.83203 6.66602H14.1654" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M5.83203 10.834H10.832" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.3346 8.33268V12.4993C18.3346 16.666 16.668 18.3327 12.5013 18.3327H7.5013C3.33464 18.3327 1.66797 16.666 1.66797 12.4993V7.49935C1.66797 3.33268 3.33464 1.66602 7.5013 1.66602H11.668" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                                <path d="M18.3346 8.33268H15.0013C12.5013 8.33268 11.668 7.49935 11.668 4.99935V1.66602L18.3346 8.33268Z" stroke="#292D32" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="text-sm text-end text-gray-500 mt-2 lg:mt-0">1-{filteredVehicles.length} of {filteredVehicles.length}</div>
        </div>
    );
};

export default VehiclesTable;