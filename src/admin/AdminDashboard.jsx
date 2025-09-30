import React from 'react'
import AdminComments from './components/AdminComments'

const AdminDashboard = () => {
  return (
    <div>
      <p className='robotosemibold text-[24px]'>Dashboard</p>
      <p className='robotomedium text-[20px]'>Inspections</p>
      <AdminComments/>



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