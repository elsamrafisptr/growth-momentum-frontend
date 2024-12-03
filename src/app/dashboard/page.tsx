import Dashboard from "@/components/layouts/Dashboard";
import axiosInstance from "@/lib/axios";
import { getUserDetailsData } from "@/lib/axios/services/profile";
import { getAuthToken } from "@/services/helpers";
import React from "react";

const DashboardPage = async () => {
  const token = getAuthToken();

  let profile = await getUserDetailsData(token);
  profile = profile?.data?.profile || {};

  let preferences = profile.preferences || [];
  if (typeof preferences === "string") {
    preferences = preferences
      .replace(/[{}]/g, "")
      .split(",")
      .map((item) => item.trim().replace(/"/g, ""));
  }

  const recommendations = await axiosInstance.get("/recommendations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <Dashboard
      profile={{ ...profile, preferences }}
      recommendations={recommendations.data.recommendations}
    />
  );
};

export default DashboardPage;
