"use client";

import CardModule, { CardProps } from "@/components/elements/CardModule";
import { useEffect, useState } from "react";
import NewUserModal from "./newUserModal/NewUserModal";
import { NewUserModalProvider } from "@/context/NewUserModalContext";
import axiosInstance from "@/lib/axios";
import useIsMobile from "@/hooks/useIsMobile";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useIsMobile();

  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("No access token found in session storage");
      }

      let profileResponse = await axiosInstance.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let profile = profileResponse?.data?.profile || {};

      let preferences: any = profile.preferences || [];

      if (typeof preferences === "string") {
        preferences = preferences
          .replace(/[{}]/g, "")
          .split(",")
          .map((item) => item.trim().replace(/"/g, ""));
      }

      const profileWithPreferences = { ...profileResponse, preferences };

      if (!profileWithPreferences || !profileWithPreferences.preferences) {
        throw new Error("Invalid profile data received");
      }

      setProfile(profileWithPreferences);

      let recommendationsResponse = await axiosInstance.get(
        "/recommendations",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (recommendationsResponse.status !== 200) {
        throw new Error("Failed to fetch recommendations");
      }

      setRecommendations(recommendationsResponse.data.recommendations || []);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (profile && profile.preferences?.length > 0) {
    }
  }, [profile]);

  return (
    <>
      <NewUserModalProvider profile={profile}>
        <NewUserModal />
      </NewUserModalProvider>

      <div className="mt-20 flex h-full w-full p-5 md:mt-0 md:p-12">
        <div className="flex flex-col items-center gap-4">
          {/* Recommendations For You */}
          <div className="flex w-full flex-col gap-4">
            <h1 className="text-2xl font-bold">Recommendations For You</h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  isMobile ? "grid-cols-1" : "grid-cols-3",
                )}
              >
                {recommendations
                  .slice(0, 21)
                  .map((course: CardProps, index: number) => (
                    <CardModule
                      key={index}
                      title={course.title}
                      short_intro={course.short_intro}
                      url={course.url}
                      category={course.category}
                      sub_category={course.sub_category}
                      skills={course.skills}
                      rating={course.rating}
                      number_of_viewers={course.number_of_viewers}
                      duration={course.duration}
                      level={course.level}
                      preference={course.preference}
                    />
                  ))}
              </div>
            )}

            {/* Recommendations Genre Based */}
            <div className="flex w-full flex-col gap-4">
              <h1 className="text-2xl font-bold">
                Recommendations of Your Genre{" "}
                <p className="text-base font-light">(Coming Soon)</p>
              </h1>
            </div>

            {/* Most Favourite Courses */}
            <div className="flex w-full flex-col gap-4 pb-12">
              <h1 className="text-2xl font-bold">
                Most Favourite Courses{" "}
                <p className="text-base font-light">(Coming Soon)</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
