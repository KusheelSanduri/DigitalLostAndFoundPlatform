import axiosClient from "./axiosClient";

export const disputeApi = {
  getAll: () => axiosClient.get("/api/disputes"),
  updateStatus: (id: string, status: "pending" | "resolved") =>
    axiosClient.patch(`/api/disputes/${id}/status`, { status }),
};
