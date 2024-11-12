import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Gifts } from './gifts';
import { Avatar } from '@/components/Avatar';
import { useAppSelector } from '@/hooks';
import { getAnimationElementId, getAnimationActive } from '@/selectors/animationSelector';
import { formatNumberT } from '@/helpers/utils';
import HistoryIcon from '@/assets/icons/history.svg?react';
import PremiumIcon from '@/assets/icons/premium.svg?react';
import './index.css';


export const User = ({ user, history }: { user?: IUser, history?: boolean }) => {
  const animationActive = useAppSelector(getAnimationActive);
  const animationElementId = useAppSelector(getAnimationElementId);

  if (!user?._id) {
    return null;
  }

  return (
    <>
    <div className="user-profile">
      <div className="user-container">
        <div className="user-avatar">
          <Avatar user={user} hidden={!!animationElementId} />
          <div className={`user-rank rank-${user.rank} ${animationActive ? 'fixed' : ''}`}>
            <span>{`#${user.rank}`}</span>
          </div>
        </div>
        <div className="user-info animate">
          <div className="name">
            <span>{`${user.firstName} ${user.lastName}`}</span>
            {user.isPremium && <PremiumIcon />}
          </div>
          <span className="gifts animate">
            <Trans
              i18nKey="user.gifts_received"
              count={user.giftCount}
              values={{ gifts: formatNumberT(user.giftCount) }}
            />
          </span>
        </div>
      </div>
      {history && (
        <Link to="/history" className="user-history animate">
          <HistoryIcon />
          <span><Trans i18nKey="user.recent_actions" /></span>
        </Link>
      )}
    </div>
    <Gifts user={user} key={user._id} />
    </>
  );
};
