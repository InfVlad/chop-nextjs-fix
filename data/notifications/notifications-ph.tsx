import { Notification } from "./notifications-t";

export const notificationsPh: Notification[] = [
    {
        "id": 1,
        "message": "JohnDoe has started following you!",
        "type": "follow",
        "userId": 123,
        "username": "JohnDoe",
        "followed": "your_username",
        "timestamp": "2024-08-30T10:15:00Z",
        "read": false,
        "priority": "low"
    },
    {
        "id": 2,
        "message": "You’ve reached a 10-day study streak! Keep it going!",
        "type": "achievement",
        "userId": null,
        "username": null,
        "relatedId": null,
        "relatedType": null,
        "timestamp": "2024-08-30T11:00:00Z",
        "read": false,
        "priority": "high"
    },
    {
        "id": 3,
        "message": "JaneSmith has challenged you to a quiz on World Capitals!",
        "type": "challenge",
        "userId": 1617,
        "username": "JaneSmith",
        "relatedId": 101,
        "relatedType": "quiz",
        "timestamp": "2024-08-30T12:00:00Z",
        "read": false,
        "priority": "medium"
    },
    {
        "id": 4,
        "message": "AlexBrown is now following you!",
        "type": "follow",
        "userId": 456,
        "username": "AlexBrown",
        "followed": "your_username",
        "timestamp": "2024-08-29T11:00:00Z",
        "read": true,
        "priority": "low"
    },
    {
        "id": 5,
        "message": "EmilyWhite has followed you!",
        "type": "follow",
        "userId": 789,
        "username": "EmilyWhite",
        "followed": "your_username",
        "timestamp": "2024-08-25T12:30:00Z",
        "read": false,
        "priority": "low"
    },
    {
        "id": 6,
        "message": "ChrisBlue is following you now!",
        "type": "follow",
        "userId": 1011,
        "username": "ChrisBlue",
        "followed": "your_username",
        "timestamp": "2024-08-15T14:00:00Z",
        "read": true,
        "priority": "low"
    },
    {
        "id": 7,
        "message": "SamanthaGreen has started following you!",
        "type": "follow",
        "userId": 1213,
        "username": "SamanthaGreen",
        "followed": "your_username",
        "timestamp": "2024-07-30T15:45:00Z",
        "read": true,
        "priority": "low"
    },
    {
        "id": 8,
        "message": "Don't forget to complete your study session today!",
        "type": "reminder",
        "reminderType": "study",
        "timestamp": "2024-08-30T16:00:00Z",
        "read": false,
        "priority": "medium"
    },
    {
        "id": 9,
        "message": "Reminder: Complete your study session to keep your streak alive!",
        "type": "reminder",
        "reminderType": "study",
        "timestamp": "2024-08-29T17:00:00Z",
        "read": true,
        "priority": "medium"
    },
    {
        "id": 10,
        "message": "Stay on track! Complete your study session today.",
        "type": "reminder",
        "reminderType": "study",
        "timestamp": "2024-08-23T18:00:00Z",
        "read": false,
        "priority": "medium"
    },
    {
        "id": 11,
        "message": "Keep learning! Don't forget your study session.",
        "type": "reminder",
        "reminderType": "study",
        "timestamp": "2024-08-10T19:00:00Z",
        "read": true,
        "priority": "medium"
    },
    {
        "id": 12,
        "message": "Friendly reminder: Complete your study session for today.",
        "type": "reminder",
        "reminderType": "study",
        "timestamp": "2024-07-25T20:00:00Z",
        "read": true,
        "priority": "medium"
    },
    {
        "id": 13,
        "message": "MichaelYellow has invited you to join a study session!",
        "type": "invite",
        "userId": 1415,
        "username": "MichaelYellow",
        "relatedId": 202,
        "relatedType": "study_session",
        "timestamp": "2024-08-30T18:30:00Z",
        "read": false,
        "priority": "high"
    }
];
