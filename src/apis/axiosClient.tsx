import axios from "axios";
import { getLocal } from "../helpers";

const axiosClient = axios.create({
  baseURL: "https://conduit.productionready.io/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;

axiosClient.interceptors.request.use(
  function (config) {
    if (getLocal("token")) {
      config.headers = {
        Authorization: "Bearer " + getLocal("token"),
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data.errors);
  }
);
