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
        }
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

      <div className="w-full h-full flex p-5 md:p-12 mt-20 md:mt-0">
        <div className="flex flex-col gap-4 items-center">
          {/* Recommendations For You */}
          <div className="flex flex-col gap-4 w-full">
            <h1 className="font-bold text-2xl">Recommendations For You</h1>

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div
                className={cn(
                  "grid gap-6",
                  isMobile ? "grid-cols-1" : "grid-cols-3"
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
            <div className="flex flex-col gap-4 w-full">
              <h1 className="font-bold text-2xl">
                Recommendations of Your Genre{" "}
                <p className="font-light text-base">(Coming Soon)</p>
              </h1>
            </div>

            {/* Most Favourite Courses */}
            <div className="flex flex-col gap-4 w-full pb-12">
              <h1 className="font-bold text-2xl">
                Most Favourite Courses{" "}
                <p className="font-light text-base">(Coming Soon)</p>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
