import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NotificationAvatarProps {
    username: string;
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
