import React, { useState, useEffect } from "react";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaUser, FaEye, FaEyeSlash } from "react-icons/fa";

const PassUpdate = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found. Please log in.");
          toast.warning("No token found. Please log in.");
          return;
        }

        const response = await fetch(`${baseUrl}/common/profile/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [baseUrl]);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (!currentPassword || !newPassword) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.warning("No token found. Please log in.");
        return;
      }

      const response = await fetch(`${baseUrl}/common/password/update-password`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: currentPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsChangingPassword(false);
    } catch (err) {
      toast.error("Error updating password: " + err.message);
    }
  };

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsChangingPassword(false);
  };

  if (loading) {
    return (
      <div className="p-0 sm:p-6">
        <div className="bg-white px-6 py-8 rounded-2xl shadow-sm max-w-full mx-auto">
          <Skeleton height={30} width={200} className="mb-6" />
          <div className="mb-8">
            <Skeleton height={15} width={100} className="mb-1" />
            <div className="relative">
              <Skeleton height={40} />
            </div>
          </div>
          <Skeleton height={30} width={150} className="mb-6" />
          <Skeleton height={15} width={300} className="mb-4" />
          <div className="flex justify-end">
            <Skeleton height={40} width={150} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-0 sm:p-6">
        <div className="bg-white px-6 py-8 rounded-2xl shadow-sm text-red-500 max-w-2xl mx-auto">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-0 sm:p-6">
      <ToastContainer/>
      <div className="bg-white px-6 py-8 rounded-2xl shadow-sm  mx-auto">
        {/* Title */}
        <p className="robotosemibold text-[24px] mb-6">Login & Password</p>

        {/* Username Section */}
        <div className="mb-8">
          <label className="block text-[14px]  text-[#333333] robotomedium  mb-1">
            User name
          </label>
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={user?.username || "Testing2"}
              readOnly
              className="w-full border-[#E9E9E9] border bg-[#FBFBFB] rounded-[8px]  pl-10 pr-3 py-[8px] text-sm focus:outline-none focus:ring-0 "
            />
          </div>
        </div>

        {/* Change Password Section */}
        <div>
          <p className="robotosemibold text-[24px] mb-6">Change Password</p>

          <p className="text-[14px] text-[#333333CC] robotomedium mb-4">
            Change your account password anytime for secure access.
          </p>

          {!isChangingPassword ? (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsChangingPassword(true)}
                className="bg-[#043677] robotomedium cursor-pointer  text-white px-6 py-2 rounded-md text-sm hover:bg-[#0b3a85] transition-colors"
              >
                Change Password
              </button>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword}>
              {/* Current Password */}
              <div className="mb-4">
                <label className="block text-[14px] text-[#333333] robotomedium mb-1">
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full border-[#E9E9E9] border bg-[#FBFBFB] rounded-[8px]  px-3 py-[8px] pr-10 text-sm focus:outline-none focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrent ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-[14px] text-[#333333] robotomedium  mb-1">
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full border-[#E9E9E9] border bg-[#FBFBFB] rounded-[8px] px-3 py-[8px] pr-10 text-sm focus:outline-none focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNew ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="mb-6">
                <label className="block text-[14px] text-[#333333] robotomedium  mb-1">
                  Confirm new password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter password again"
                    className="w-full border-[#E9E9E9] border bg-[#FBFBFB] rounded-[8px] px-3 py-[8px] pr-10 text-sm focus:outline-none focus:ring-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 text-sm robotomedium text-[#0D47A1] cursor-pointer  border border-[#043677] rounded-md hover:bg-[#043677] hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#043677] robotomedium cursor-pointer  text-white px-6 py-2 rounded-md text-sm hover:bg-[#0b3a85] transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassUpdate;