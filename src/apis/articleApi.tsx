import { requestBodyCreateArticleType } from "../types/settingsType";
import axiosClient from "./axiosClient";

const articleApi = {
  get: async () => {
    return await axiosClient.get("articles");
  },
  getBySlug: async (slug: string) => {
    return await axiosClient.get(`articles/${slug}`);
  },
  getFeed: async () => {
    return await axiosClient.get("articles/feed");
  },
  create: async (data: requestBodyCreateArticleType) => {
    return await axiosClient.post("articles", data);
  },
  update: async (slug: string, data: requestBodyCreateArticleType) => {
    return await axiosClient.put(`articles/${slug}`, data);
  },
  delete: async (slug: string) => {
    return await axiosClient.delete(`articles/${slug}`);
  },
  addComment: async (requestBody: any, slug: string | undefined) => {
    return await axiosClient.post(`articles/${slug}/comments`, requestBody);
  },
  getComments: async (slug: string) => {
    return await axiosClient.get(`articles/${slug}/comments`);
  },
  deleteComment: async (slug: string, id: string) => {
    return await axiosClient.delete(`articles/${slug}/comments/${id}`);
  },
  favorite: async (slug: string) => {
    return await axiosClient.post(`articles/${slug}/favorite`);
  },
  unFavorite: async (slug: string) => {
    return await axiosClient.delete(`articles/${slug}/favorite`);
  },
  favoritedArticle: async (username: string) => {
    return await axiosClient.get(`articles?favorited=${username}`);
  },
  byAuthor: async (username: string) => {
    return await axiosClient.get(`articles?author=${username}`);
  },
  filterByTag: async (tag: string) => {
    return await axiosClient.get(`articles?tag=${tag}`);
  },
  getTag: async () => {
    return await axiosClient.get("tags");
  },
};
export default articleApi;
