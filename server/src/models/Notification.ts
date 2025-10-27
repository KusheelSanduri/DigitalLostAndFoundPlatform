import mongoose, { Document, Schema, model } from "mongoose";

/**
 * Notification interface
 */
export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: "info" | "warning" | "alert" | "success";
  isRead: boolean;
  link?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Notification schema
 */
const NotificationSchema = new Schema<INotification>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["info", "warning", "alert", "success"],
      default: "info",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Create and export model
 */
export const Notification = 
  mongoose.models.Notification || model<INotification>("Notification", NotificationSchema);
