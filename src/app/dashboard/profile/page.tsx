import Profile from "@/components/layouts/Profile";
import { getUserDetailsData } from "@/lib/axios/services/profile";
import { getUserById } from "@/lib/axios/services/user";
import { getAuthToken } from "@/services/helpers";

const ProfilePage = async () => {
  const token = getAuthToken();

  let profile = await getUserDetailsData(token);
  const user = await getUserById(profile.data.profile.user_id, token);
  
  let preferences = profile.data.profile.preferences;
  if (typeof preferences === "string") {
    preferences = preferences
      .replace(/[{}]/g, "")
      .split(",")
      .map((item) => item.trim().replace(/"/g, ""));
  }

  return (
    <Profile
      profile={{ ...profile.data.profile, preferences }}
      user={user.data}
    />
  );
};

export default ProfilePage;
