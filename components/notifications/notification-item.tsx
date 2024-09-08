import { FollowNotification } from "./variants/follow-notification";
import { ReminderNotification } from "./variants/reminder-notification";
import { AchievementNotification } from "./variants/achievement-notification";
import { NotificationType } from "../../data/notification/notification-type";

interface NotificationItemProps {
    notification: NotificationType;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onFollow }: NotificationItemProps) {
    switch (notification.type) {
        case "follow":
            return <FollowNotification notification={notification} onMarkAsRead={onMarkAsRead} onFollow={onFollow} />;
        case "reminder":
            return <ReminderNotification notification={notification} onMarkAsRead={onMarkAsRead} />;
        case "achievement":
            return <AchievementNotification notification={notification} onMarkAsRead={onMarkAsRead} />;
        default:
            return null;
    }
}
