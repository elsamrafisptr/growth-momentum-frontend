import axiosInstance from "..";

export const getUserDetailsData = async (token: any): Promise<any> => {
  try {
    const response = await axiosInstance.get("/profile", {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response?.status !== 200) return {};

    return response;
    
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};
