import { cookies } from "next/headers";

export const getAuthToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("access_token")?.value;
};

export const getRefreshToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("refresh_token")?.value;
};
