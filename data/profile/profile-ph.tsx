import { UserProfile } from "./profile-t";

export const profilePh: UserProfile[] = [{
    "id": "1a2b3c4d5e6f7g8h9i0j",
    "name": "Alvaro Peña",
    "username": "alvropena",
    "birthday": "2001-05-26",
    "gender": "male",
    "bio": "can't rush greatness.",
    "profile_picture": "https://example.com/profiles/alvaropena22.jpg",
    "location": "San Francisco, CA",
    "email": "me@alvropena.com",
    "verified": true,
    "social_media_handles": ["@alvaropena_twitter", "@alvaropena_github"],
    "phone_number": "+1-123-456-7890",
    "password_hashed": "$2a$12$D9xq0jH9HZyjgKplG9/eZ.rOJD45jQZV6mW4Pqr4CpQq5L3VQ.",
    "providers": ["github", "google"],
    "created_at": "2024-04-01T12:34:56Z",
    "updated_at": "2024-08-31T10:00:00Z",
    "streak": 1,
    "followers": 100,
    "following": 0,
    "achievements": [
        "Completed 100 study sessions",
        "Mastered Geography",
        "Top 1% in History Quizzes",
        "Daily Streak of 50 Days",
        "Winner of 10 Challenges"
    ],
    "activities": [
        { "action": "Completed a Geography quiz", "timestamp": "2024-08-30T14:00:00Z" },
        { "action": "Searched for History resources", "timestamp": "2024-08-29T10:00:00Z" },
        { "action": "Joined a Soccer discussion", "timestamp": "2024-08-28T18:00:00Z" }
    ]
}];
