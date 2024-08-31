import { useState } from "react";
import { Dot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationAvatar } from "./notification-avatar";
import { isToday, isYesterday, format } from "date-fns";
import { Notification } from "../../../data/notifications/notifications-t";

interface NotificationItemProps {
    notification: Notification;
    onMarkAsRead: (id: number) => void;
    onFollow: (userId: number) => void;
    onAcceptInvite: (userId: number) => void;
}

export function NotificationItem({ notification, onMarkAsRead, onFollow, onAcceptInvite }: NotificationItemProps) {
    const [isFollowing, setIsFollowing] = useState(false);

    const getUserProfileImageUrl = (userId: number): string => {
        return `https://example.com/profiles/${userId}.jpg`;
    };

    const handleFollowClick = () => {
        setIsFollowing(!isFollowing);
        if (!isFollowing) {
            onFollow(notification.userId!);  // Trigger follow action
        }
    };

    const getFormattedDate = () => {
        if (notification.formattedDate) {
            return notification.formattedDate;
        }

        const notificationDate = new Date(notification.timestamp);

        if (isToday(notificationDate)) {
            return format(notificationDate, 'p');
        } else if (isYesterday(notificationDate)) {
            return format(notificationDate, 'p');
        } else {
            return format(notificationDate, 'MM/dd hh:mm a');
        }
    };

    return (
        <div
            key={notification.id}
            className="relative flex flex-col p-2 border-b"
            style={{ height: '80px' }}
            onClick={() => onMarkAsRead(notification.id)}
        >
            <div className="flex justify-between items-center">
                <small className="text-gray-500">
                    {getFormattedDate()}
                </small>
            </div>

            <div className="flex items-center mt-1 space-x-2">
                {!notification.read && <Dot className="text-primary" />}
                {(notification.type === 'follow' || notification.type === 'invite') && notification.userId !== null && (
                    <NotificationAvatar userId={notification.userId} imageUrl={getUserProfileImageUrl(notification.userId)} />
                )}
                <div className="flex-grow">
                    <p className="font-normal">
                        {notification.message}
                    </p>
                </div>
                <div>
                    {notification.type === 'follow' && notification.userId !== null && (
                        <Button onClick={handleFollowClick} className="ml-auto">
                            {isFollowing ? "Following" : "Follow"}
                        </Button>
                    )}
                    {notification.type === 'invite' && notification.userId !== null && (
                        <Button onClick={() => onAcceptInvite(notification.userId)} className="ml-auto">
                            Accept
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
