import { useEffect } from 'react';
import { Page } from '@/components/Page';
import { User } from '@/components/User';
import { Settings } from '@/components/Settings';
import { getProfile } from '@/selectors/profileSelector';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { useGetMeQuery } from '@/store/api/users';
import { setProfile } from '@/store/reducers/profile';
import './index.css';


export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(getProfile);

  const { data: profileData } = useGetMeQuery(null, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (profileData) {
      dispatch(setProfile(profileData));
    }
  }, [profileData, dispatch]);

  return (
    <Page>
      <Settings />
      <User user={profile} history />
    </Page>
  );
};
