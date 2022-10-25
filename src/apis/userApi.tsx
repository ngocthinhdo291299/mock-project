import axiosClient from "./axiosClient";

const userApi = {
  getCurrent: async () => {
    return await axiosClient.get("user");
  },
  follow: async (username: string) => {
    return await axiosClient.post(`profiles/${username}/follow`);
  },
  unfollow: async (username: string) => {
    return await axiosClient.delete(`profiles/${username}/follow`);
  },
  update: async (data: {
    user: { email?: string; bio?: string; image?: string };
  }) => {
    return await axiosClient.put("user", data);
  },
  getProfile: async (username: string) => {
    return await axiosClient.get(`profiles/${username}`);
  },
};

export default userApi;
