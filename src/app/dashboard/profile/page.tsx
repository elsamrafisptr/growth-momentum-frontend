import Profile from "@/components/layouts/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile | Growth Momentum`,
  description: "Profile data for users",
};

const ProfilePage = async () => {
  return <Profile />;
};

export default ProfilePage;
