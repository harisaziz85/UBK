import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  // State for loading
  const [isLoading, setIsLoading] = useState(false);
  // Navigation hook
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Combine firstName and lastName into name
    const name = `${formData.firstName} ${formData.lastName}`.trim();

    // Prepare data for API
    const apiData = {
      name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        'https://ubktowingbackend-production.up.railway.app/api/common/auth/admin/signup',
        apiData
      );
      toast.success('Signup successful...', {
        position: 'top-right',
        autoClose: 3000,
      });
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      });
      // Redirect to login after a short delay to show toast
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred during signup.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f1f1f2] min-h-screen flex flex-col justify-center px-4">
      <div className="text-center">
        <p className="text-[32px] robotosemibold">Welcome Back</p>
        <p className="text-[24px] robotoregular text-[#333333CC] pt-[16px]">
          Secure access to your fleet anytime, anywhere
        </p>
      </div>

      <div className="flex justify-center mt-[20px]">
        <div className="bg-white px-[20px] py-[32px] w-full max-w-[600px]">
          <p className="robotosemibold text-[32px] text-center">Sign up</p>
          <p className="text-[18px] robotoregular text-[#333333CC] text-center">
            Provide details to create your account
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row mt-[24px] gap-6 mb-[32px]">
              <div className="w-full md:w-1/2">
                <p className="robotomedium text-[#333333CC]">First Name</p>
                <div className="flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]">
                  <FiUser className="text-[20px]" />
                  <input
                    className="focus:outline-none ms-2 w-full bg-transparent"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <p className="robotomedium text-[#333333CC]">Last Name</p>
                <div className="flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]">
                  <FiUser className="text-[20px]" />
                  <input
                    className="focus:outline-none ms-2 w-full bg-transparent"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <p className="robotomedium text-[#333333CC]">Email or User Name</p>
              <div className="flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]">
                <FiMail className="text-[20px]" />
                <input
                  className="focus:outline-none ms-2 w-full bg-transparent"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div className="w-full my-[20px]">
              <p className="robotomedium text-[#333333CC]">Password</p>
              <div className="flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px]">
                <FiLock className="text-[20px]" />
                <input
                  className="focus:outline-none ms-2 w-full bg-transparent"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="focus:outline-none cursor-pointer"
                >
                  {showPassword ? <FiEye className="text-[20px]" /> : <FiEyeOff className="text-[20px]" />}
                </button>
              </div>
            </div>

            <p className="text-[#333333CC] robotomedium">
              Already have an Account?{' '}
              <Link to="/login" className="ms-2 text-[#043677] robotosemibold cursor-pointer">
                Login
              </Link>
            </p>

            <button
              type="submit"
              className="bg-[#043677] mt-[48px] w-full h-[47px] robotosemibold rounded-[8px] text-[#ffffff] cursor-pointer flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading && (
                <FiLoader className="animate-spin text-[20px] mr-2" />
              )}
              Sign up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;