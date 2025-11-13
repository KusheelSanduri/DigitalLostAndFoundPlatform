import { Schema, model, Document, Types } from "mongoose";

export interface IDispute extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  reason: string;
  description: string;
  status: "pending" | "resolved";
  adminRemarks: string;
  createdAt: Date;
  resolvedAt: Date;
}

const disputeSchema = new Schema<IDispute>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    reason: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    adminRemarks: { type: String},
    resolvedAt: { type: Date},
  },
  { timestamps: { createdAt: "createdAt"} }
);

export const Dispute =  model<IDispute>("Dispute", disputeSchema);
