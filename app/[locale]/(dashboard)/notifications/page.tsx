"use client";
import { useSchemaStore } from "../../../../providers/schema-store-provider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { NotificationData } from "../../../../data/notification/notification-data";
import { NotificationType } from "../../../../data/notification/notification-type";
import { NotificationList } from "../../../../components/notifications/notification-list";
import { format, isToday, isYesterday, subDays, isSameMonth } from 'date-fns';

function groupNotifications(notifications: NotificationType[]): Record<string, NotificationType[]> {
    const grouped: Record<string, NotificationType[]> = {
        Today: [],
        Yesterday: [],
        "Last Week": [],
        "This Month": [],
        "Last Month": [],
        Older: []
    };

    notifications.forEach(notification => {
        const notificationDate = new Date(notification.timestamp);
        const formattedDate = format(notificationDate, 'MM/dd - hh:mm a');

        if (isToday(notificationDate)) {
            grouped.Today.push(notification);
        } else if (isYesterday(notificationDate)) {
            grouped.Yesterday.push(notification);
        } else if (isSameMonth(notificationDate, subDays(new Date(), 30))) {
            grouped["This Month"].push({ ...notification, formattedDate });
        } else {
            grouped.Older.push({ ...notification, formattedDate });
        }
    });

    return grouped;
}

export default function NotificationsContainer() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    const [groupedNotifications, setGroupedNotifications] = useState<Record<string, NotificationType[]>>({});

    useEffect(() => {
        const sorted = [...NotificationData].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const grouped = groupNotifications(sorted);
        setGroupedNotifications(grouped);
    }, []);

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    const markAsRead = (notificationId: number) => {
        setGroupedNotifications(prevState => {
            const updatedState = { ...prevState };
            Object.keys(updatedState).forEach(group => {
                updatedState[group] = updatedState[group].map(notification =>
                    notification.id === notificationId ? { ...notification, read: true } : notification
                );
            });
            return updatedState;
        });
    };

    return (
        <div className="flex justify-center h-fit bg-background text-foreground p-8">
            <div className="flex flex-col space-y-6 w-full max-w-xl">
                <h1 className="text-2xl font-semibold">{t("Notifications")}</h1>
                <NotificationList
                    groupedNotifications={groupedNotifications}
                    onMarkAsRead={markAsRead}
                    onFollow={handleFollow}
                />
                {Object.keys(groupedNotifications).every(group => groupedNotifications[group].length === 0) && (
                    <h2>No activity yet.</h2>
                )}
            </div>
        </div>
    );
}
