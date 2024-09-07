import { NotificationItem } from "./notification-item";
import { Notification } from "../../../data/notifications/notifications-t";

interface NotificationListProps {
    groupedNotifications: Record<string, Notification[]>;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
    onAcceptInvite: (userId: number) => void;
}

export function NotificationList({ groupedNotifications, onMarkAsRead, onFollow, onAcceptInvite }: NotificationListProps) {
    return (
        <>
            {Object.keys(groupedNotifications).map(group => (
                groupedNotifications[group].length > 0 && (
                    <div key={group}>
                        <h2 className="text-xl font-bold">{group}</h2>
                        {groupedNotifications[group].map(notification => (
                            <NotificationItem
                                key={notification.id}
                                notification={notification}
                                onMarkAsRead={onMarkAsRead}
                                onFollow={onFollow}
                                onAcceptInvite={onAcceptInvite}
                            />
                        ))}
                    </div>
                )
            ))}
        </>
    );
}
