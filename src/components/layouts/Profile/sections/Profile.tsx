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
    <div className="p-12 flex flex-col gap-6">
      <div className="w-full h-fit rounded-lg border border-gray-300 bg-white">
        <div className="w-full p-6 flex justify-between">
          <article className="flex gap-4">
            <Avatar className="w-24 h-24 rounded-lg">
              <AvatarImage src={user?.profile_image || "/default-avatar.png"} />
              <AvatarFallback className="rounded-lg bg-green-300 text-2xl font-semibold">
                {user?.username?.[0] || "U"}
              </AvatarFallback>
            </Avatar>
            <span className="flex flex-col justify-center">
              <h2 className="font-semibold text-2xl">{user?.username}</h2>
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
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="w-full flex flex-col gap-4">
            <span className="flex gap-2 items-center">
              <h1 className="font-semibold">My Learning Preferences</h1>
              <button onClick={() => alert("check")}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </span>
            <article className="flex flex-wrap gap-2">
              {profile?.preferences?.map((val: string, index: number) => (
                <div
                  key={index}
                  className="px-2 text-sm rounded py-0.5 bg-gray-300 w-fit"
                >
                  {val}
                </div>
              ))}
            </article>
          </div>
          <div className="w-full flex flex-col gap-4">
            <span className="flex gap-2 items-center">
              <h1 className="font-semibold">Current Career</h1>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
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
