import { INotification, Notification } from "../models/Notification";
import { Types } from "mongoose";

export class NotificationService {
    static async createNotification(
        userId: Types.ObjectId,
        title: string,
        message: string,
        type: "info" | "warning" | "alert" | "success" = "info",
        link?: string
    ): Promise<INotification> {
        return await Notification.create({ userId, title, message, type, link });
    }

    static async getUserNotifications(userId: Types.ObjectId, onlyUnread = false) {
        const filter: any = { userId };
        if (onlyUnread) filter.isRead = false;
        return Notification.find(filter).sort({ createdAt: -1 });
    }

    static async markAsRead(notificationId: Types.ObjectId) {
        return Notification.findByIdAndUpdate(notificationId, { isRead: true }, { new: true });
    }

    static async markAllAsRead(userId: Types.ObjectId) {
        const result = await Notification.updateMany({ userId, isRead: false }, { isRead: true });
        return result.modifiedCount;
    }

    static async deleteNotification(notificationId: Types.ObjectId) {
        const result = await Notification.deleteOne({ _id: notificationId });
        return result.deletedCount === 1;
    }

    static async clearUserNotifications(userId: Types.ObjectId) {
        const result = await Notification.deleteMany({ userId });
        return result.deletedCount;
    }

    static async sendBulkNotifications(
        userIds: Types.ObjectId[],
        data: { title: string; message: string; type?: "info" | "warning" | "alert" | "success"; link?: string }
    ): Promise<INotification[]> {
        const notifications = userIds.map((userId) => ({
            userId,
            title: data.title,
            message: data.message,
            type: data.type || "info",
            link: data.link,
        }));

        return Notification.insertMany(notifications);
    }
}
