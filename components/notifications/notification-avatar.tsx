import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NotificationAvatarProps {
    userId: number;
    imageUrl: string;
}

export function NotificationAvatar({ userId, imageUrl }: NotificationAvatarProps) {
    return (
        <Avatar>
            <AvatarImage src={imageUrl} alt={`User ${userId}`} />
            <AvatarFallback>{userId.toString().slice(0, 2)}</AvatarFallback>
        </Avatar>
    );
}
