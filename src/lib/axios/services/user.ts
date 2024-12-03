import axiosInstance from "..";

export const getUserById = async (userId: string, token: any): Promise<any> => {
  try {
    const response = await axiosInstance.get("/users/" + userId, {
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
