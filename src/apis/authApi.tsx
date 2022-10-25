import { loginDataType, registerDataType } from "../types/authType";
import axiosClient from "./axiosClient";

const authApi = {
  login: async (data: loginDataType) => {
    return await axiosClient.post(`users/login`, data);
  },
  logout: () => {},
  register: async (data: registerDataType) => {
    return await axiosClient.post("users", data);
  },
};

export default authApi;
