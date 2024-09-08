import { format, isToday, isYesterday } from "date-fns";
import { NotificationAchievementType } from "../types/notification-achievement-type";
import { getFormattedDate } from "../../../lib/format-date";

export function NotificationAchievement({ notification, onMarkAsRead }: NotificationAchievementType) {
    if (notification.type !== 'achievement') {
        return null;
    }

    const getFormattedDate = () => {
        const notificationDate = new Date(notification.timestamp);
        if (isToday(notificationDate)) return format(notificationDate, 'p');
        if (isYesterday(notificationDate)) return format(notificationDate, 'p');
        return format(notificationDate, 'MM/dd hh:mm a');
    };

    return (
        <div className="relative flex flex-col p-2 border-b" onClick={() => onMarkAsRead(notification.id)}>
            <div className="flex justify-between items-center">
                <small className="text-gray-500">{getFormattedDate()}</small>
            </div>
            <div className="mt-1">
                <p>{notification.message}</p>
            </div>
        </div>
    );
}
