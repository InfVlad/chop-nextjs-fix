import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import { ProfileHeader } from '../../../components/profile/profile-header';
import { ProfileStats } from '../../../components/profile/profile-stats';
import { ProfileActivity } from '../../../components/profile/profile-activity';
import TopicButtons from '../../../components/topic-buttons';
import { fetchUserProfile } from '../../../lib/fetch-user-profile';  // You need to implement this function
import { Button } from '../../../components/ui/button';
import { LineChart } from 'lucide-react';
import { PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

// The main component that renders the user profile page
export default function ProfilePage() {
  const { username } = useParams();  // Retrieve the dynamic [username] from the URL
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (username) {
      fetchUserProfile(username).then((data) => setUserProfile(data));
    }
  }, [username]);

  if (!userProfile) {
    return <div>User not found</div>;
  }

  const joinedDate = format(new Date(userProfile.created_at), "MMMM yyyy");
  const lastActiveDate = format(new Date(userProfile.updated_at), "MMM d, yyyy 'at' h:mm a");

  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const randomAchievements = userProfile.achievements.slice(0, 4);

  return (
    <div className="flex justify-center h-2/3 text-foreground p-4">
      <div className="flex flex-col space-6 w-full max-w-xl rounded-md">

        {/* Profile Header Component */}
        <ProfileHeader
          username={userProfile.username}
          name={userProfile.name}
          bio={userProfile.bio}
          location={userProfile.location}
          joinedDate={joinedDate}
          profilePicture={userProfile.profile_picture}
          verified={userProfile.verified}
        />

        {/* Profile Stats Component */}
        <ProfileStats
          streak={userProfile.streak}
          followers={userProfile.followers}
          following={userProfile.following}
        />

        <div className='flex flex-row w-full mt-4'>
          <Link href={`/u/${username}/edit`} className="flex-1 mx-4">
            <Button className="py-2 w-full" variant="default">
              <PersonIcon className='mr-2 h-4 w-4' />
              Edit Profile
            </Button>
          </Link>
          <Link href={`/u/${username}/analytics`} className="flex-1 mx-4">
            <Button className="py-2 w-full" variant="default">
              <LineChart className='mr-2 h-4 w-4' />
              View Analytics
            </Button>
          </Link>
        </div>

        {/* Profile Topics Component */}
        <div className="mt-4 w-full">
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
            showChevron={false}
          />
        </div>

        {/* Profile Activity Component */}
        <ProfileActivity activities={userProfile.activities} />
      </div>
    </div>
  );
}
