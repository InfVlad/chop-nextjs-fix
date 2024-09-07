export type NotificationType = 'follow' | 'reminder' | 'invite' | 'achievement' | 'challenge';

export interface Notification {
    id: number;
    message: string;
    type: NotificationType;
    userId: number | null;
    followed?: string;
    reminderType?: string;
    relatedId?: number | null;
    relatedType?: string | null;
    timestamp: string;
    read: boolean;
    priority: 'low' | 'medium' | 'high';
}
