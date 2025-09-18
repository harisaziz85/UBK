import React from 'react'
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  return (
    <div className='bg-[#f1f1f2] min-h-screen flex flex-col justify-center px-4'>
      <div className='text-center'>
        <p className='text-[32px] robotosemibold'>Welcome Back</p>
        <p className='text-[24px] robotoregular text-[#333333CC] pt-[16px]'>
          Secure access to your fleet anytime, anywhere
        </p>
      </div>

      <div className="flex justify-center mt-[20px]">
        <div className='bg-white px-[20px] py-[32px] w-full max-w-[600px]'>
          <p className="robotosemibold text-[32px] text-center">Sign up</p>
          <p className='text-[18px] robotoregular text-[#333333CC] text-center'>
            Provide details to create your account
          </p>

          <div>
            <div className='flex flex-col md:flex-row mt-[24px] gap-6 mb-[32px]'>
              <div className='w-full md:w-1/2'>
                <p className="robotomedium text-[#333333CC]">First Name</p>
                <div className='flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]'>
                  <FiUser className='text-[20px]' />
                  <input className='focus:outline-none ms-2 w-full bg-transparent' type="text" />
                </div>
              </div>

              <div className='w-full md:w-1/2'>
                <p className="robotomedium text-[#333333CC]">Last Name</p>
                <div className='flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]'>
                  <FiUser className='text-[20px]' />
                  <input className='focus:outline-none ms-2 w-full bg-transparent' type="text" />
                </div>
              </div>
            </div>

            <div className='w-full'>
              <p className="robotomedium text-[#333333CC]">Email or User Name</p>
              <div className='flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]'>
                <FiMail className='text-[20px]' />
                <input className='focus:outline-none ms-2 w-full bg-transparent' type="text" />
              </div>
            </div>

            <div className='w-full my-[20px]'>
              <p className="robotomedium text-[#333333CC]">Password</p>
              <div className='flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]'>
                <FiLock className='text-[20px]' />
                <input className='focus:outline-none ms-2 w-full bg-transparent' type="password" />
              </div>
            </div>

            <p className=' text-[#333333CC] robotomedium'>
              Already have an Account? <span className="ms-2 text-[#043677] robotosemibold">Login</span>
            </p>

            <button className='bg-[#043677] mt-[48px] w-full h-[47px] robotosemibold rounded-[8px] text-[#ffffff]'>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup;
