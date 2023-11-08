import axios from "axios";

const instance = axios.create({
   baseURL: process.env.REACT_APP_SERVER_URL,
});
instance.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      const token = localStorage.getItem("persist:auth");
      console.log(token);
      return config;
   },
   function (error) {
      // Do something with request error
      console.log("Co loi o axiosConfig " + error);
      return Promise.reject(error);
   }
);
export default instance;
