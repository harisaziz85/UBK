import React, { useState, useEffect } from "react";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Adminprofile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const baseUrl = "https://ubktowingbackend-production.up.railway.app/api";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No token found. Please log in.");
          toast.warning("No token found. Please log in.");
          return;
        }

        const response = await axios.get(`${baseUrl}/common/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.data || !response.data.user) {
          throw new Error("Failed to fetch profile");
        }

        const user = response.data.user;
        setFirstName(user.name.split(" ")[0] || "");
        setLastName(user.name.split(" ").slice(1).join(" ") || "");
        setEmail(user.email || "");
        setImagePreview(user.profileImage || null);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [baseUrl]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/gif", "image/jpeg", "image/tiff"];
      if (validTypes.includes(file.type)) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        toast.error("Please upload a valid image file (PNG, GIF, JPG, or TIFF).");
      }
    }
  };

  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.warning("No token found. Please log in.");
        return;
      }

      const formData = new FormData();
      const fullName = `${firstName} ${lastName}`.trim();
      formData.append("name", fullName);
      formData.append("email", email);
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const response = await axios.put(`${baseUrl}/common/profile/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data) {
        throw new Error("Failed to update profile");
      }

      const hasPasswordInput = currentPassword || newPassword || confirmPassword;
      if (hasPasswordInput) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          toast.warning("Please fill in all password fields to change password.");
        } else if (newPassword !== confirmPassword) {
          toast.warning("New passwords do not match. Please try again.");
        } else {
          const passwordResponse = await axios.post(`${baseUrl}/common/password/update-password`, {
            oldPassword: currentPassword,
            newPassword,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (passwordResponse.data) {
            toast.success("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          } else {
            throw new Error("Failed to update password");
          }
        }
      } else {
        toast.success("Profile updated successfully");
      }

      setIsEditing(false);
      // Refetch profile to confirm updates
      const fetchProfile = async () => {
        try {
          const refetchResponse = await axios.get(`${baseUrl}/common/profile/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          const user = refetchResponse.data.user;
          setFirstName(user.name.split(" ")[0] || "");
          setLastName(user.name.split(" ").slice(1).join(" ") || "");
          setEmail(user.email || "");
          setImagePreview(user.profileImage || null);
        } catch (err) {
          toast.error("Error fetching updated profile: " + err.message);
        }
      };
      fetchProfile();
    } catch (err) {
      toast.error("Error updating profile: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="bg-white px-6 py-8 rounded-2xl shadow-sm">
          <Skeleton height={30} width={200} className="mb-6" />
          <p className="font-medium text-[16px] text-[#333333CC] mb-2">
            <Skeleton height={15} width={50} />
          </p>
          <div className="flex flex-col items-start gap-4 mb-6">
            <div className="flex-col items-center gap-4">
              <Skeleton circle height={80} width={80} />
              <Skeleton height={40} width={172} className="mt-4" />
            </div>
            <Skeleton height={15} width={250} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <Skeleton height={15} width={100} className="mb-1" />
              <Skeleton height={40} />
            </div>
            <div>
              <Skeleton height={15} width={80} className="mb-1" />
              <Skeleton height={40} />
            </div>
          </div>
          <div className="mb-6">
            <Skeleton height={15} width={50} className="mb-1" />
            <Skeleton height={40} />
          </div>
          <div className="flex justify-end">
            <Skeleton height={40} width={80} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-0 sm:p-6">
      <ToastContainer />
      <div className="bg-white px-6 py-8 rounded-2xl shadow-sm">
        {/* Title */}
        <p className="font-semibold text-[24px] mb-6">Admin Profile</p>

        {/* Photo Section */}
        <p className="font-medium text-[16px] text-[#333333CC] mb-2">Photo</p>
        <div className="flex flex-col items-start gap-4 mb-6">
          <div className="flex-col items-center gap-4">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="profile"
                className="w-[80px] h-[80px] rounded-full border border-[#CCCCCC] object-cover"
              />
            ) : (
              <div
                className="w-[80px] h-[80px] rounded-full border border-[#CCCCCC] flex items-center justify-center bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}
            {isEditing && (
              <div className="flex flex-col sm:flex-row mt-4 items-center gap-2">
                <label className="bg-[#043677] w-[172px] justify-center text-center text-white px-4 py-2 rounded-md text-sm cursor-pointer">
                  Pick Files
                  <input
                    type="file"
                    accept="image/png,image/gif,image/jpeg,image/tiff"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                {imagePreview && (
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="cursor-pointer w-[172px] justify-center text-center text-[#333333CC] text-sm bg-[#F5F5F5] border-[#CCCCCC] py-[8px] px-[14px]"
                  >
                    Remove
                  </button>
                )}
              </div>
            )}
          </div>
          {isEditing && (
            <p className="text-[12px] robotoregular text-[#333333B2]">
              Only PNG, GIF, JPG, and TIFF files are accepted.
            </p>
          )}
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditing}
              className={`w-full border border-[#CCCCCC] rounded-[4px] px-[16px] py-[12px] text-sm focus:outline-none focus:ring-0 ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditing}
              className={`w-full border border-[#CCCCCC] rounded-[4px] px-[16px] py-[12px] text-sm focus:outline-none focus:ring-0 ${
                !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
              }`}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={`w-full border border-[#CCCCCC] rounded-[4px] px-[16px] py-[12px] text-sm focus:outline-none focus:ring-0 ${
              !isEditing ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {isEditing && (
          <>
            <div className="mb-4">
              <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full border border-[#CCCCCC] rounded-[4px] px-[16px] py-[12px] pr-10 text-sm focus:outline-none focus:ring-0"
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

            <div className="mb-4">
              <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full border border-[#CCCCCC] rounded-[4px] px-[16px] py-[12px] pr-10 text-sm focus:outline-none focus:ring-0"
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

            <div className="mb-6">
              <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full border border-[#CCCCCC] rounded-[4px] px-[16px] py-[12px] pr-10 text-sm focus:outline-none focus:ring-0"
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
          </>
        )}

        {/* Edit/Save Button */}
        <div className="flex justify-end">
          <button
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            className="bg-[#0D47A1] cursor-pointer text-white px-6 py-2 rounded-md text-sm hover:bg-[#0b3a85] disabled:opacity-50"
            disabled={isEditing && (!firstName.trim() || !email.trim())}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adminprofile;