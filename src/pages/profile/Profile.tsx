import { useLoaderData } from '@tanstack/react-router';

const Profile = () => {
  const responseProfile = useLoaderData({ from: '/profile' });
  console.log(responseProfile);
  return <div>profile</div>;
};
export { Profile };
