import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import { IoMail } from "react-icons/io5";
import APIClientPrivate from "../utils/axios";
import Loader from "./Loader";

const Profile = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [letter, setLetter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found. Please log in.");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await APIClientPrivate.get("/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response.data);
        setLetter(response.data.email);
      } catch (err) {
        setError("Failed to fetch profile data. Please try again.");
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Drawer
      title="My Profile"
      placement="right"
      width={300}
      closable
      destroyOnClose
      onClose={onClose}
      open={open}
      drawerStyle={{
        backgroundColor: "white",
        color: "white",
        borderLeft: "2px solid #6b7280",
      }}
      headerStyle={{
        backgroundColor: "white",
        color: "black",
      }}
      closeIcon={<span style={{ color: "black" }}>×</span>}
    >
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <Loader size="md" text="Loading profile..." />
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        profileData && (
          <div className="text-white text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-600 mx-auto mb-6 flex justify-center items-center">
              <p className="text-[42px] font-bold">
                {letter.charAt(0).toUpperCase()}
              </p>
            </div>
            <p className="text-md flex text-black items-center justify-center gap-2">
              Name : {profileData.name}
            </p>
            <p className="text-md flex text-black items-center justify-center gap-2">
              <IoMail /> {profileData.email}
            </p>
           
          </div>
        )
      )}
    </Drawer>
  );
};

export default Profile;
