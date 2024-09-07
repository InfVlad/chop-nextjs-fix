export interface UserProfile {
    id: string;
    name: string;
    username: string;
    birthday: string;
    gender: string;
    bio: string;
    profile_picture: string;
    location: string;
    email: string;
    verified: boolean;
    social_media_handles: string[];
    phone_number: string;
    password_hashed: string;
    providers: string[];
    created_at: string;
    updated_at: string;
    streak: number;
    followers: number;
    following: number;
    achievements: string[];
    activities: { action: string; timestamp: string }[];
}
