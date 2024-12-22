import Dashboard from "@/components/layouts/Dashboard";
import axiosInstance from "@/lib/axios";
import { getUserDetailsData } from "@/lib/axios/services/profile";
import { getAuthToken } from "@/services/helpers";
import React from "react";

const DashboardPage = async () => {
  // const token = getAuthToken();
  // console.log("token", token);

  // let profile = await getUserDetailsData(token);
  // profile = profile?.data?.profile || {};
  // console.log("profile", profile);

  // let preferences = profile.preferences || [];
  // if (typeof preferences === "string") {
  //   preferences = preferences
  //     .replace(/[{}]/g, "")
  //     .split(",")
  //     .map((item) => item.trim().replace(/"/g, ""));
  // }

  // let recommendations = [];
  // if (Object.keys(profile).length > 0) {
  //   const recommendationsResponse = await axiosInstance.get(
  //     "/recommendations",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   recommendations = recommendationsResponse.data.recommendations || [];
  // }

  return <Dashboard />;
};

export default DashboardPage;
