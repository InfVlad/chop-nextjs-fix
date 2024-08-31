"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { profilePh } from '../../../../../../data/profile/profile-ph';
import { format } from 'date-fns';
import { BadgeCheck, HeartIcon, SettingsIcon } from "lucide-react";
import CategoryButtons from '@/components/category-buttons';

export default function ProfilePage() {
  const userProfile = profilePh[0];

  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const getLocalizedPath = (path: string) => `/${locale}${path}`;

  const joinedDate = format(new Date(userProfile.created_at), "MMMM yyyy");
  const lastActiveDate = format(new Date(userProfile.updated_at), "MMM d, yyyy 'at' h:mm a");

  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Function to randomly select achievements
  const getRandomAchievements = (achievements: string[], count: number) => {
    const shuffled = [...achievements].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomAchievements = getRandomAchievements(userProfile.achievements, 3); // Display 3 random achievements

  return (
    <div className="flex justify-center h-2/3 text-foreground p-4">
      <div className="flex flex-col space-6 w-full max-w-xl rounded-md">
        <div className='flex flex-row ml-4 items-center'>
          <div className="">
            <Avatar className='h-20 w-20'>
              <AvatarImage src={userProfile.profile_picture} alt={`@${userProfile.username}`} />
              <AvatarFallback>{userProfile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </div>

          <div className="ml-4">
            <h2 className="text-2xl font-bold flex items-center">
              {userProfile.username}
              {userProfile.verified && <BadgeCheck className="ml-2 text-primary" />}
            </h2>
            <p className="text-muted-foreground">{userProfile.name}</p>
            <p className="text-sm">{userProfile.bio}</p>
          </div>
          <Link href={getLocalizedPath('/profile/edit')} className="flex-1 mx-4">
            <Button className="py-2" variant="secondary" size="icon">
              <SettingsIcon />
            </Button>
          </Link>
        </div>

        <div className="mt-4">
          <CategoryButtons
            selectedCategory={selectedCategory}
            handleCategoryClick={handleCategoryClick}
          />
        </div>

        <div className="mt-4 flex justify-around border-t pt-4">
          <div className="text-center">
            <span className="block text-lg font-bold">{userProfile.streak}</span>
            <span className="text-sm text-muted-foreground">Streak</span>
          </div>
          <Link href={getLocalizedPath('/profile/followers')} className="flex flex-col items-center justify-center">
            <div className="text-center cursor-pointer">
              <span className="block text-lg font-bold">{userProfile.followers}</span>
              <span className="text-sm text-muted-foreground">Followers</span>
            </div>
          </Link>
          <Link href={getLocalizedPath('/profile/following')} className="flex flex-col items-center justify-center">
            <div className="text-center cursor-pointer">
              <span className="block text-lg font-bold">{userProfile.following}</span>
              <span className="text-sm text-muted-foreground">Following</span>
            </div>
          </Link>
        </div>

        <div className="mt-6 p-4 flex-grow border-secondary rounded-lg">
          <div className="mt-4 space-y-2">
            <p><strong>Location:</strong> {userProfile.location}</p>
            <p><strong>Joined:</strong> {joinedDate}</p>
            <p><strong>Active:</strong> {lastActiveDate}</p>

            {/* Achievements Section */}
            <div>
              <h3 className="text-lg font-semibold">Achievements</h3>
              <ul className="list-disc list-inside">
                {randomAchievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>

            {/* Activity Feed Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Activity Feed</h3>
              <div className="space-y-4">
                {userProfile.activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-background border rounded-lg">
                    {/* Avatar */}
                    <Avatar className='h-12 w-12'>
                      <AvatarImage src={userProfile.profile_picture} alt={`@${userProfile.username}`} />
                      <AvatarFallback>{userProfile.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>

                    {/* Activity Details */}
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{userProfile.name}</span>
                        {userProfile.verified && <BadgeCheck className="text-primary" />}
                        <span className="text-muted-foreground">@{userProfile.username}</span>
                        <span className="text-muted-foreground">&bull;</span>
                        <span className="text-muted-foreground">{format(new Date(activity.timestamp), "MMM d, yyyy 'at' h:mm a")}</span>
                      </div>
                      <p>{activity.action}</p>
                    </div>

                    {/* Heart Icon */}
                    <div>
                      <HeartIcon className="text-muted-foreground cursor-pointer hover:text-red-500 transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
