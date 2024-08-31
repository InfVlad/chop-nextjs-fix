"use client";
import { useSchemaStore } from "@/providers/schema-store-provider";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { notificationsPh } from "../../../../../../data/notifications/notifications-ph";
import { NotificationList } from "@/components/notifications/notification-list";
import { Notification } from "../../../../../../data/notifications/notifications-t";
import { format, isToday, isYesterday, subDays, isSameMonth } from 'date-fns';

function groupNotifications(notifications: Notification[]): Record<string, Notification[]> {
    const grouped: Record<string, Notification[]> = {
        Today: [],
        Yesterday: [],
        "Last Week": [],
        "This Month": [],
        "Last Month": [],
        Older: []
    };

    notifications.forEach(notification => {
        const notificationDate = new Date(notification.timestamp);

        if (isToday(notificationDate)) {
            grouped.Today.push(notification);
        } else if (isYesterday(notificationDate)) {
            grouped.Yesterday.push(notification);
        } else if (isSameMonth(notificationDate, subDays(new Date(), 30))) {
            grouped["This Month"].push(notification);
        } else {
            grouped.Older.push(notification);
        }
    });

    return grouped;
}

export default function NotificationsContainer() {
    const { user_input_generation } = useSchemaStore((state) => state);
    const router = useRouter();
    const t = useTranslations("");

    const [groupedNotificationsPh, setGroupedNotificationsPh] = useState<Record<string, Notification[]>>({});

    useEffect(() => {
        const sorted = [...notificationsPh].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        const grouped = groupNotifications(sorted);
        setGroupedNotificationsPh(grouped);
    }, []);

    const handleFollow = (userId: number) => {
        console.log(`Followed user with ID ${userId}`);
    };

    const handleAcceptInvite = (userId: number) => {
        console.log(`Accepted invite from user with ID ${userId}`);
    };

    const markAsRead = (notificationId: number) => {
        setGroupedNotificationsPh(prevState => {
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
                    groupedNotifications={groupedNotificationsPh}
                    onMarkAsRead={markAsRead}
                    onFollow={handleFollow}
                    onAcceptInvite={handleAcceptInvite}
                />
                {Object.keys(groupedNotificationsPh).every(group => groupedNotificationsPh[group].length === 0) && (
                    <h2>No activity yet.</h2>
                )}
            </div>
        </div>
    );
}
