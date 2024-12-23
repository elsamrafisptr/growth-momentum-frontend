"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import axiosInstance from "@/lib/axios";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No access token found in session storage");
      }

      const profileResponse = await axiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userId = profileResponse?.data?.profile?.user_id;
      let preferences = profileResponse?.data?.profile?.preferences || [];

      if (typeof preferences === "string") {
        preferences = preferences
          .replace(/[{}]/g, "")
          .split(",")
          .map((item) => item.trim().replace(/"/g, ""));
      }

      const profileWithPreferences = {
        ...profileResponse?.data?.profile,
        preferences,
      };
      setProfile(profileWithPreferences);

      if (!userId)
        throw new Error("User ID is missing in the profile response.");

      const userResponse = await axiosInstance.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userResponse?.status === 200) {
        setUser(userResponse?.data);
      } else {
        throw new Error("Failed to fetch user data");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile || !user) return <div>No profile or user data available</div>;

  return (
    <div className="mt-24 flex flex-col gap-6 px-5 md:mt-0 md:p-12">
      <div className="h-fit w-full rounded-lg border border-gray-300 bg-white">
        <div className="flex w-full justify-between p-6">
          <article className="flex gap-4">
            <Avatar className="h-24 w-24 rounded-lg">
              <AvatarImage src={user?.profile_image || "/default-avatar.png"} />
              <AvatarFallback className="rounded-lg bg-green-300 text-2xl font-semibold">
                {user?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold">{user?.username}</h2>
              <p>{user?.email}</p>
              <p>{user?.roles}</p>
            </span>
          </article>
          <article className="flex flex-col justify-center text-right">
            <span>{profile?.age || "N/A"}</span>
            <span>{profile?.gender || "N/A"}</span>
            <span>{profile?.activity_level || "N/A"}</span>
          </article>
        </div>
        <Separator className="px-6" />
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          <div className="flex w-full flex-col gap-4">
            <span className="flex items-center gap-2">
              <h1 className="font-semibold">My Learning Preferences</h1>
            </span>
            <article className="flex flex-wrap gap-2">
              {profile?.preferences?.map((val: string, index: number) => (
                <div
                  key={index}
                  className="w-fit rounded bg-gray-300 px-2 py-0.5 text-sm"
                >
                  {val}
                </div>
              ))}
            </article>
          </div>
          <div className="flex w-full flex-col gap-4">
            <span className="flex items-center gap-2">
              <h1 className="font-semibold">Current Career</h1>
            </span>
            <article className="flex flex-wrap gap-2">
              {profile?.job_type} of {profile?.job_name}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
