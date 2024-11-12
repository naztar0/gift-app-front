import { useMemo } from 'react';
import { Trans } from 'react-i18next';
import { Image } from './image';
import { UserLink } from '@/components/UserLink';
import { getProfile } from '@/selectors/profileSelector';
import { useAppSelector } from '@/hooks';
import './item.css';


export type ActionType = 'buy' | 'send' | 'receive';

export const UserActivityItem = ({ activity }: { activity: IUserActivity }) => {
  const profile = useAppSelector(getProfile);

  const action = useMemo((): ActionType => {
    if (activity.type === 'transaction') {
      return 'buy';
    }
    return activity.sender._id === profile._id ? 'send' : 'receive';
  }, [activity, profile]);

  return (
    <div className="list-item">
      <Image activity={activity} action={action} />
      <div className="list-row">
        <div className="list-row-content">
          <span className="list-row-title"><Trans i18nKey={`user_activity.actions.${action}`} /></span>
          <span className="list-row-description">{activity.gift.name}</span>
        </div>
        <div className="list-row-end">
          {action === 'buy' && (
            <span>
              {`-${activity.gift.price} ${activity.gift.currency}`}
            </span>
          )}
          {action === 'send' && activity.type === 'transfer' && (
            <span>
              <Trans i18nKey="user_activity.to" />
              <UserLink user={activity.recipient} />
            </span>
          )}
          {action === 'receive' && activity.type === 'transfer' && (
            <span>
              <Trans i18nKey="user_activity.from" />
              <UserLink user={activity.sender} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
