import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface FailedRequest {
  resolve: (value?: string | PromiseLike<string>) => void;
  reject: (error: any) => void;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string = "") => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 422) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMTY1MDI4MSwianRpIjoiZDVlMjJmODUtNDY0MS00MjNlLTlhOTAtZDUxNmYxN2NjOGM1IiwidHlwZSI6InJlZnJlc2giLCJzdWIiOiIzN2MyM2VmYy1jNzE4LTQ3ZWItOTlhOS1iMTMzMzI2YjdlOTciLCJuYmYiOjE3MzE2NTAyODEsImNzcmYiOiJlMWFjNWJmYS1iNjk2LTRkNDQtYTM2OS0xNjcxYzUzMDNkNDAiLCJleHAiOjE3MzIyNTUwODF9.oZOp-68u2-0Nj1U_GvsBn_1nOrKjnXh79R1jHG5Ul5w`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response: AxiosResponse = await axios.post(
          "http://localhost:5000/api/v1/refresh",
          {},
          { withCredentials: true }
        );

        const newToken = response.data.access_token;

        if (newToken) {
          sessionStorage.setItem("token", newToken);
        }

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        processQueue(null, newToken);

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, "");
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      console.error("Error status:", error.response.status);
      console.error("Error data:", error.response.data);
    } else {
      console.error("Network error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
