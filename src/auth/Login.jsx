import React, { useState } from "react";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { LuScanLine } from "react-icons/lu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [activeTab, setActiveTab] = useState("email");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const baseurl = "https://ubktowingbackend-production.up.railway.app/api";

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
        `${baseurl}/common/auth/admin/login`,
        apiData
      );

      const { token, user } = response.data;
      localStorage.setItem("authToken", token);

      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
      });

      setFormData({ email: "", password: "" });

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "driver") {
          navigate("/driverdashboard");
        } else {
          toast.error("Unknown role. Please contact admin.");
        }
      }, 2000);
    } catch (err) {
      console.error("Login error:", err);
      toast.error(
        err.response?.data?.message || "An error occurred during login.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
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
          Access and manage your vehicle, anywhere.
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
          <div className="flex justify-center mt-[24px] mb-[32px]">
            <button
              onClick={() => setActiveTab("email")}
              className={`flex items-center gap-2 px-6 py-2 w-[50%] justify-center transition-all duration-300 ${
                activeTab === "email"
                  ? "bg-[#043677] text-white rounded-[8px]"
                  : "bg-transparent text-[#333]"
              }`}
            >
              <FiMail /> Email
            </button>

            <button
              onClick={() => setActiveTab("qr")}
              className={`flex items-center gap-2 py-2 w-[50%] justify-center transition-all duration-300 ${
                activeTab === "qr"
                  ? "bg-[#043677] text-white rounded-[8px]"
                  : "bg-transparent text-[#333]"
              }`}
            >
              <LuScanLine className="text-lg" /> QR Code
            </button>
          </div>

          {/* Email Form */}
          {activeTab === "email" && (
            <form onSubmit={handleSubmit}>
              <div className="w-full">
                <p className="robotomedium text-[#333333CC]">Email</p>
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

                {/* 👇 Added Forgot Password + Sign Up Links */}
                <div className="flex justify-between items-center mt-3 text-[14px]">

                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="text-[#043677] cursor-pointer hover:underline"
                  >
                    Don’t have an account? Sign up
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-[#043677] cursor-pointer hover:underline"
                  >
                    Forgot Password?
                  </button>
                  
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#043677] mt-[32px] w-full h-[47px] robotosemibold rounded-[8px] text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading && (
                  <FiLoader className="animate-spin text-[20px] mr-2" />
                )}
                Sign in
              </button>
            </form>
          )}

          {/* QR Code Tab */}
          {activeTab === "qr" && (
            <div className="flex flex-col items-center">
              <img
                src="/qr.png"
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
