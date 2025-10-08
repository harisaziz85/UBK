import React from 'react'
import { LuUser } from "react-icons/lu";
import { GoKey } from "react-icons/go";
const Adminpassup = () => {
  return (
    <div className='bg-white rounded-[12px] p-[20px]'>

<p className="robotosemibold text-[24px] mb-[32px]">Login & Password</p>
<p className='robotomedium text-[16x]'>User name</p>
<div className='bg-[#FBFBFB] h-[40px] mt-[8px] mb-[40px] gap-5  flex items-center rounded-[8px] px-[10px] border border-[#E9E9E9]'>
<LuUser className='text-[#292D32]' />
<input type="text " className='w-full focus:outline-none' />
</div>
<p className="robotosemibold text-[20px] mb-[16px]">Change Password</p>
<p className='robotomedium text-[#333333CC] text-[14px]'>Change your account password anytime for secure access.</p>
<p className='robotomedium text-[16x] mt-[24px]'>Current Password</p>
<div className='bg-[#FBFBFB] h-[40px] mt-[16px] mb-[24px] gap-5  flex items-center rounded-[8px] px-[10px] border border-[#E9E9E9]'>
<GoKey className='text-[#292D32]' />
<input type="text " className='w-full focus:outline-none' />
</div>
<p className='robotomedium text-[16x]'>New Password</p>
<div className='bg-[#FBFBFB] h-[40px] mt-[8px] mb-[24px] gap-5  flex items-center rounded-[8px] px-[10px] border border-[#E9E9E9]'>
<GoKey className='text-[#292D32]' />
<input type="text " className='w-full focus:outline-none' />
</div>
<p className='robotomedium text-[16x]'>Confirm New Password</p>
<div className='bg-[#FBFBFB] h-[40px] mt-[8px] mb-[24px] gap-5  flex items-center rounded-[8px] px-[10px] border border-[#E9E9E9]'>
<GoKey className='text-[#292D32]' />
<input type="text " className='w-full focus:outline-none' />
</div>
<div className="flex gap-5 mt-[45px]">
  <button className='h-[44px] text-[14px] robotomedium text-[#043677] bg-[#04367700] border border-[#043677] w-[196px] rounded-[6px]'> Cancel</button>
  <button className='h-[44px] text-[14px] robotomedium text-[#ffffff] bg-[#043677] w-[196px] rounded-[6px]'>Update Password</button>

</div>

    </div>
  )
}

export default Adminpassup