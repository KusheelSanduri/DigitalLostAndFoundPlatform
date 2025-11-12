import { Schema, model, Document, Types } from "mongoose";

export interface IDispute extends Document {
  userId: Types.ObjectId;
  itemId: Types.ObjectId;
  reason: string;
  description?: string;
  evidence?: string[];
  status: "pending" | "resolved";
  adminRemarks?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

const disputeSchema = new Schema<IDispute>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    itemId: { type: Schema.Types.ObjectId, ref: "Item", required: true },
    reason: { type: String, required: true },
    description: { type: String },
    evidence: [{ type: String }],
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    adminRemarks: { type: String },
    resolvedAt: { type: Date },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

export const Dispute =  model<IDispute>("Dispute", disputeSchema);
