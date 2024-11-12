import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Page } from '@/components/Page';
import { User } from '@/components/User';
import { useGetUserQuery } from '@/store/api/users';
import { getLeaderboard } from '@/store/api/leaderboard';
import { getProfile } from '@/selectors/profileSelector';
import { useAppSelector } from '@/hooks';
import { useTryCached } from '@/hooks/tryCached';
import './index.css';


export const UserPage = () => {
  const id = useParams().id!;
  const navigate = useNavigate();
  const profile = useAppSelector(getProfile);

  useEffect(() => {
    if (profile?._id === id) {
      navigate('/profile');
    }
  }, [profile, id]);

  const { data: userData } = useTryCached(id, useGetUserQuery, getLeaderboard);

  return (
    <Page back>
      <User user={userData} />
    </Page>
  );
};
