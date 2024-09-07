"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { profilePh } from '../../../../../../data/profile/profile-ph';
import { LineChart } from 'lucide-react';
import { PersonIcon } from '@radix-ui/react-icons';
import { Button } from "@/components/ui/button";
<<<<<<< HEAD
import { Settings } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useLocalePath from '@/hooks/use-local-path';
=======
import TopicButtons from '@/components/topic-buttons';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileStats } from '@/components/profile/profile-stats';
// import { ProfileInfo } from '@/components/profile/profile-info';
import { ProfileActivity } from '@/components/profile/profile-activity';
>>>>>>> 22635ac6597d58007ac06701049d205895ef03df

export default function ProfilePage() {
  const userProfile = profilePh[0];

  const pathname = usePathname();
  const locale = pathname.split('/')[1];
  const {getLocalizedPath} = useLocalePath();

  const joinedDate = format(new Date(userProfile.created_at), "MMMM yyyy");
  const lastActiveDate = format(new Date(userProfile.updated_at), "MMM d, yyyy 'at' h:mm a");

  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const randomAchievements = userProfile.achievements.slice(0, 4); // Display 4 random achievements

  return (
<<<<<<< HEAD
    <div className="flex justify-center h-2/3 text-foreground p-4 max-w-md">
      <div className="flex flex-col space-6 w-full rounded-md">
        <div className='flex flex-row ml-4 items-center'>
          {/* Profile Picture */}
          <div className="">
            <Avatar className='h-20 w-20'>
              <AvatarImage src="https://github.com/alvropena.png" alt="@alvropena" />
              <AvatarFallback>AP</AvatarFallback>
            </Avatar>
          </div>
=======
    <div className="flex justify-center h-2/3 text-foreground p-4">
      <div className="flex flex-col space-6 w-full max-w-xl rounded-md">
>>>>>>> 22635ac6597d58007ac06701049d205895ef03df

        {/* Profile Header Component */}
        <ProfileHeader
          username={userProfile.username}
          name={userProfile.name}
          bio={userProfile.bio}
          location={userProfile.location}
          joinedDate={joinedDate}
          profilePicture={userProfile.profile_picture}
          verified={userProfile.verified}
          getLocalizedPath={getLocalizedPath}
        />

        {/* Profile Stats Component */}
        <ProfileStats
          streak={userProfile.streak}
          followers={userProfile.followers}
          following={userProfile.following}
          getLocalizedPath={getLocalizedPath}
        />

        <div className='flex flex-row w-full mt-4'>
          <Link href={getLocalizedPath('/profile/edit')} className="flex-1 mx-4">
            <Button className="py-2 w-full" variant="default">
              <PersonIcon className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>
          </Link>
          <Link href={getLocalizedPath('/profile/analytics')} className="flex-1 mx-4">
            <Button className="py-2 w-full" variant="default">
              <LineChart className='mr-2 h-4 w-4' />
              View Analytics
            </Button>
          </Link>
        </div>

        {/* Profile Topics Component */}
        <div className="mt-4 w-full">
          <div>
            <TopicButtons
              selectedTopic={selectedTopic}
              handleTopicClick={handleTopicClick}
              topics={[
                { id: "geography", label: "🌍 Geography" },
                { id: "history", label: "📜 History" },
                { id: "soccer", label: "⚽ Soccer" },
                { id: "art-history", label: "🖼️ Art History" },
                { id: "basketball", label: "🏀 Basketball" },
                { id: "formula1", label: "🏎️ Formula 1" },
                { id: "music", label: "🎵 Music" },
              ]}
              title="Recent"
              showChevron={false}  // Hides the chevrons and makes buttons fill width
            />
          </div>
        </div>

        {/* Profile Info Component */}
        {/* <ProfileInfo
          location={userProfile.location}
          joinedDate={joinedDate}
          lastActiveDate={lastActiveDate}
          achievements={randomAchievements}
        /> */}

        {/* Profile Activity Component */}
        <ProfileActivity activities={userProfile.activities} />
      </div>
    </div>
  );
}
