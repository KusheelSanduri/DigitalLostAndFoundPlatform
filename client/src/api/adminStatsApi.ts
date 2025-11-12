import axiosClient from "./axiosClient";

export const adminStatsApi = {
  getStats: () => axiosClient.get("/api/admin/stats"),
};
