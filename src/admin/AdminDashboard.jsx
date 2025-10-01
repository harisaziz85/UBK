import React from 'react'
import AdminComments from './components/AdminComments'
import InspectionSubmissions from './components/InspectionSubmissions'

const AdminDashboard = () => {
  return (
    <div>
      <p className='robotosemibold text-[24px]'>Dashboard</p>
      <p className='robotomedium text-[20px]'>Inspections</p>

      {/* Inspection Submissions + Pass Rate + Fail Rate in one row */}
      <div className="flex gap-4">
        {/* Inspection Submissions Card */}
        <div className="w-1/3">
          <InspectionSubmissions />
        </div>

        {/* Pass Rate Card */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-[16px] font-semibold text-gray-800">Pass Rate</p>
          <p className="text-[28px] font-bold text-green-600">95%</p>
        </div>

        {/* Fail Rate Card */}
        <div className="w-1/3 bg-white shadow-md rounded-lg p-4 flex flex-col items-center justify-center">
          <p className="text-[16px] font-semibold text-gray-800">Fail Rate</p>
          <p className="text-[28px] font-bold text-red-600">5%</p>
        </div>
      </div>

      <div className='bg-white'>
        Vehicle Assignments
        <div className="flex ">
          <div>
            <p>9</p>
            <p>Assigned</p>
          </div>
          <div>
            <p>9</p>
            <p>Unassigned</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        Vehicle Assignments
        <div className="flex ">
          <div>
            <p>9</p>
            <p>Assigned</p>
          </div>
          <div>
            <p>9</p>
            <p>Unassigned</p>
          </div>
        </div>
      </div>

      <AdminComments />

      <div className='bg-white'>
        Vehicle Assignments
        <div className="flex ">
          <div>
            <p>9</p>
            <p>Assigned</p>
          </div>
          <div>
            <p>9</p>
            <p>Unassigned</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
