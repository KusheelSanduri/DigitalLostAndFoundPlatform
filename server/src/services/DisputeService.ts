import { Types } from "mongoose";
import { IDispute, Dispute } from "../models/Dispute";

class DisputeService {
  /*Create a new dispute*/
  async createDispute(
    userId: Types.ObjectId,
    itemId: Types.ObjectId,
    reason: string,
    evidence?: string[]
  ): Promise<IDispute> {
    try {
      const dispute = new Dispute({
        userId,
        itemId,
        reason,
        evidence,
        status: "pending",
        createdAt: new Date(),
      });

      await dispute.save();
      return dispute;
    } catch (error) {
      console.error("Error creating dispute:", error);
      throw new Error("Failed to create dispute.");
    }
  }

  /*Get all disputes filed by a specific user*/
  async getUserDisputes(userId: Types.ObjectId): Promise<IDispute[]> {
    try {
      return await Dispute.find({ userId }).sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error fetching user disputes:", error);
      throw new Error("Failed to fetch user disputes.");
    }
  }

  /*Get all disputes (optional filter by status)*/
  async getAllDisputes(status?: "pending" | "resolved"): Promise<IDispute[]> {
    try {
      const query = status ? { status } : {};
      return await Dispute.find(query)
        .populate("userId", "name email")
        .populate("itemId", "title")
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error fetching all disputes:", error);
      throw new Error("Failed to fetch disputes.");
    }
  }

  /*Update the status of a dispute*/
  async updateDisputeStatus(
    disputeId: Types.ObjectId,
    status: "pending" | "resolved",
    adminRemarks?: string
  ): Promise<IDispute | null> {
    try {
      const dispute = await Dispute.findByIdAndUpdate(
        disputeId,
        {
          $set: {
            status,
            adminRemarks,
            resolvedAt: status === "resolved" ? new Date() : undefined,
          },
        },
        { new: true }
      );

      return dispute;
    } catch (error) {
      console.error("Error updating dispute status:", error);
      throw new Error("Failed to update dispute status.");
    }
  }

  /**
   * Delete a dispute permanently
   */
  async deleteDispute(disputeId: Types.ObjectId): Promise<boolean> {
    try {
      const result = await Dispute.findByIdAndDelete(disputeId);
      return !!result;
    } catch (error) {
      console.error("Error deleting dispute:", error);
      throw new Error("Failed to delete dispute.");
    }
  }
}

export default new DisputeService();
