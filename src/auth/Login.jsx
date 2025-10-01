import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuScanLine } from "react-icons/lu";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");

  // form data persist rahe
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const apiData = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        'https://ubktowingbackend-production.up.railway.app/api/common/auth/admin/login',
        apiData
      );
      toast.success('Login successful! Redirecting...', {
        position: 'top-right',
        autoClose: 2000,
      });
      // Reset form
      setFormData({
        email: '',
        password: '',
      });
      // Redirect or handle success (e.g., navigate to dashboard)
      // For now, just show success message
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred during login.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f1f1f2] min-h-screen flex flex-col justify-center px-4">
      {/* Header */}
      <div className="text-center">
        <p className="text-[32px] robotosemibold">Welcome Back</p>
        <p className="text-[24px] robotoregular text-[#333333CC] pt-[16px]">
          Secure access to your fleet anytime, anywhere
        </p>
      </div>

      {/* Card */}
      <div className="flex justify-center mt-[20px]">
        <div className="bg-white px-[20px] py-[32px] w-full max-w-[600px] rounded-[8px]">
          <p className="robotosemibold text-[28px] text-center">Sign in</p>
          <p className="text-[18px] robotoregular text-[#333333CC] text-center">
            Choose your preferred login method
          </p>

          {/* Tabs */}
          <div className="flex justify-center  mt-[24px] mb-[32px]">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center gap-2 px-6 py-2 w-[50%] justify-center content-center  transition-all duration-300 ${
                activeTab === "email"
                  ? "bg-[#043677] text-white"
                  : "bg-[#00000000] text-[#333]"
              }`}
            >
              <FiMail /> Email
            </button>

            <button
              onClick={() => setActiveTab("qr")}
              className={`flex items-center gap-2 bg-[#000000] justify-center py-2 w-[50%]  transition-all duration-300 ${
                activeTab === "qr"
                  ? "bg-[#043677] text-white"
                  : "bg-[#00000000] text-[#333]"
              }`}
            >
              <span className="text-lg"><LuScanLine /></span> OR Code
            </button>
          </div>

          {/* Email Form */}
          {activeTab === "email" && (
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <p className="robotomedium text-[#333333CC]">
                  Email or User Name
                </p>
                <div className="flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px] rounded">
                  <FiMail className="text-[20px]" />
                  <input
                    className="focus:outline-none ms-2 w-full bg-transparent"
                    type="text"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="w-full my-[20px]">
                <p className="robotomedium text-[#333333CC]">Password</p>
                <div className="flex items-center h-[47px] bg-[#FAFAFB] px-[16px] mt-[8px] rounded">
                  <FiLock className="text-[20px]" />
                  <input
                    className="focus:outline-none ms-2 w-full bg-transparent"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="ml-2 text-gray-500 cursor-pointer"
                  >
                    {showPassword ? (
                      <FaRegEyeSlash className="text-[20px]" />
                    ) : (
                      <FaRegEye className="text-[20px]" />
                    )}
                  </button>
                </div>
              </div>

              <p className="text-[#043677] robotomedium text-right cursor-pointer">
                Forgot Password?
              </p>

              <button 
                type="submit"
                className="bg-[#043677] mt-[32px] w-full h-[47px] robotosemibold rounded-[8px] text-[#ffffff] flex items-center justify-center cursor-pointer"
                disabled={isLoading}
              >
                {isLoading && (
                  <FiLoader className="animate-spin text-[20px] mr-2" />
                )}
                Sign in
              </button>
            </form>
          )}

          {/* QR Code */}
          {activeTab === "qr" && (
            <div className="flex flex-col items-center">
              <img
                src="/qr.png" // 👈 apni QR image ka path do
                alt="QR Code"
                className="w-40 h-40 my-6"
              />
              <p className="text-[#333333CC] robotoregular text-[16px]">
                Scan the QR Code to login to the app
              </p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;