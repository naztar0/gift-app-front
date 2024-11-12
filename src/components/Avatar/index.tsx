import { useState, useEffect, forwardRef, ForwardedRef } from 'react';
import { utfChar } from '@/helpers/utils';
import { BASE_STORAGE_URL } from '@/config';
import './index.css';


const avatarColorArray = [
  [ '#FF885E', '#FF516A' ], // red
  [ '#FFCD6A', '#FFA85C' ], // orange
  [ '#E0A2F3', '#D669ED' ], // purple
  [ '#A0DE7E', '#54CB68' ], // green
  [ '#53EDD6', '#28C9B7' ], // sea
  [ '#72D5FD', '#2A9EF1' ], // blue
  [ '#FFA8A8', '#FF719A' ], // pink
];

const getBg = (id: number) => {
  const colors = avatarColorArray[Math.abs(id) % 7];
  return `linear-gradient(${colors[0]}, ${colors[1]})`;
};

const getUrl = (userPhotoUrl: string) => {
  if (userPhotoUrl.startsWith('http')) {
    return userPhotoUrl;
  }
  return BASE_STORAGE_URL + userPhotoUrl;
};

export const Avatar = forwardRef(function Avatar({ user, hidden }: { user: IUserShort, hidden?: boolean }, ref: ForwardedRef<any>) {
  const [showPhoto, setShowPhoto] = useState(!!user.photoUrl);

  useEffect(() => {
    setShowPhoto(!!user.photoUrl);
  }, [user.photoUrl]);

  if (showPhoto) {
    return (
      <img
        ref={ref}
        className={`avatar-box ${hidden ? 'hidden' : ''}`}
        src={getUrl(user.photoUrl)}
        alt={user.firstName}
        onError={() => setShowPhoto(false)}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={`avatar-box ${hidden ? 'hidden' : ''}`}
      style={{ background: getBg(user.telegramId) }}
    >
      <span>
        {utfChar(user.firstName) || ''}
      </span>
    </div>
  );
});
