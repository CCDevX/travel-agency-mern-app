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
