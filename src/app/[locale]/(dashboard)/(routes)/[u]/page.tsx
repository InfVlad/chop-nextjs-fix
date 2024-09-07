import { useRouter } from 'next/router';

const UserProfile = () => {
  const router = useRouter();
  const { u } = router.query; // u is the dynamic username or user ID, locale is the language

  return (
    <div>
      <h1>Profile of {u}</h1>
      {/* You can render more profile details here */}
    </div>
  );
};

export default UserProfile;
