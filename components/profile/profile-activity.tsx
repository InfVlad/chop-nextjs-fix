import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { BadgeCheck, HeartIcon } from "lucide-react";
import { format } from 'date-fns';

function formatActivityTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const currentYear = new Date().getFullYear();
    const activityYear = date.getFullYear();

    return currentYear === activityYear ? format(date, "MMM d") : format(date, "MMM d, yyyy");
}

function formatNumber(num: number): string {
    if (num < 1000) {
        return num.toString();
    } else if (num < 1000000) {
        return (num / 1000).toFixed(1) + 'k';
    } else {
        return (num / 1000000).toFixed(1) + 'm';
    }
}

function ActivityItem({ activity }) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(activity.likes || 0); // Assuming activity.likes exists

    const handleHeartClick = () => {
        if (!liked) {
            setLikes(likes + 1);
        } else {
            setLikes(likes - 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="flex items-start space-x-4 p-4 bg-background border-b">
            <Avatar className='h-12 w-12'>
                <AvatarImage src={activity.profile_picture} alt={`@${activity.username}`} />
                <AvatarFallback>
                    {activity.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
            </Avatar>

            <div className="flex-grow">
                <div className="flex items-center space-x-2">
                    <span className="font-bold">{activity.name}</span>
                    {activity.verified && <BadgeCheck className="text-blue-500" />} {/* Updated to text-blue-500 */}
                    <span className="text-muted-foreground">@{activity.username}</span>
                    <span className="text-muted-foreground">&bull;</span>
                    <span className="text-muted-foreground">{formatActivityTimestamp(activity.timestamp)}</span>
                </div>
                <p>{activity.action}</p>
            </div>

            <div
                className="flex items-center space-x-1 cursor-pointer group"
                onClick={handleHeartClick}
            >
                <HeartIcon className={`transition-colors ${liked ? "text-red-500 fill-current" : "text-muted-foreground group-hover:text-red-500"}`} />
                <span className={`text-sm transition-colors ${liked ? "text-red-500" : "text-muted-foreground group-hover:text-red-500"}`}>{formatNumber(likes)}</span>
            </div>
        </div>
    );
}

export function ProfileActivity({ activities }) {
    return (
        <div>
            <h3 className="text-xl font-semibold my-4">Activity</h3>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <ActivityItem key={index} activity={activity} />
                ))}
            </div>
        </div>
    );
}
