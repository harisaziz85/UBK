import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Adminprofile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Please Select");
  const fileInputRef = useRef(null);
  const options = ["10", "25", "50", "100"];

  const baseURL = "https://ubktowingbackend-production.up.railway.app/api";

  // Fetch Profile Data
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${baseURL}/common/profile/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.user) {
        const { name, email, phone, profileImage } = response.data.user;
        const [firstName, ...lastNameParts] = (name || "").split(" ");
        setProfile({
          firstName: firstName || "",
          lastName: lastNameParts.join(" ") || "",
          email: email || "",
          phone: phone || "",
        });
        setProfileImage(profileImage || null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Update Profile
  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      await axios.put(
        `${baseURL}/common/profile/update`,
        {
          name: `${profile.firstName} ${profile.lastName}`.trim(),
          email: profile.email,
          phone: profile.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Image Handlers
  const handlePickFile = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/gif", "image/jpeg", "image/tiff"];
      if (validTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file (PNG, GIF, JPG, or TIFF).");
      }
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
    fileInputRef.current.value = "";
  };

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  return (
    <div className="p-6">
      <div className="bg-white px-6 py-8 rounded-2xl shadow-sm">
        {/* Title */}
        <p className="font-semibold text-[24px] mb-6">User Profile</p>

        {/* Photo Section */}
        <p className="font-medium text-[16px] text-[#333333CC] mb-2">Photo</p>
        <div className="gap-4 mb-6">
          {profileImage ? (
            <img
              src={profileImage}
              alt="profile"
              className="w-[80px] h-[80px] rounded-full border border-[#CCCCCC] object-cover"
            />
          ) : (
            <div className="w-[80px] h-[80px] rounded-full border border-[#CCCCCC] flex items-center justify-center bg-gray-100">
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
          <br />
          <div className="flex items-center gap-2">
            <label className="bg-[#0D47A1] text-white px-4 py-2 rounded-md text-sm cursor-pointer">
              Pick Files
              <input
                type="file"
                accept="image/png,image/gif,image/jpeg,image/tiff"
                ref={fileInputRef}
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
            <div className="border border-dashed bg-[#F5F5F5] rounded-md px-6 py-2 text-gray-400 text-sm cursor-pointer">
              Drop Files here
            </div>
            <button
              onClick={handleImageRemove}
              className="border border-[#CCCCCC] px-4 py-2 rounded-md text-sm bg-[#F5F5F5]"
              disabled={!profileImage}
            >
              Remove
            </button>
          </div>
        </div>
        <p className="text-[12px] robotoregular text-[#333333B2] mb-6">
          Only PNG, GIF, JPG, and TIFF files are accepted.
        </p>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={profile.firstName}
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
              className="w-full border border-[#CCCCCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0"
            />
          </div>
          <div>
            <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={profile.lastName}
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
              className="w-full border border-[#CCCCCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[14px] text-[#333333CC] robotoregular mb-1">
            Email
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
            className="w-full border border-[#CCCCCC] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-0"
          />
        </div>
    

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-[#0D47A1] text-white px-6 py-2 rounded-md text-sm"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Adminprofile;