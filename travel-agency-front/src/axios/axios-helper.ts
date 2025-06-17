import { logoutUser } from "@/features/users/users-slice";
import { store } from "@/store";
import axios from "axios";

export let apiUrl: string = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:3000";
} else {
  apiUrl = "https://mon-site.com";
}

const axiosHelper = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json, text/plain, */* ",
  },
});

axiosHelper.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log("no token found : ", token);
  }
  return config;
});

axiosHelper.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.error;

    if (status === 401 && message === "Token expired") {
      store.dispatch(logoutUser());
    }

    return Promise.reject(error);
  }
);
// // Interceptor :
// axiosHelper.interceptors.response.use(
//   (response) => response, //If everything is fine
//   (error) => {
//     //Else
//     console.log(error);
//     if (error.response && error.response.status === 400) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("selection");
//       window.location.href = "/login";
//     }
//   }
// );

export { axiosHelper };
