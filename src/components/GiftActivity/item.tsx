import { Trans } from 'react-i18next';
import { Image } from './image';
import { UserLink } from '@/components/UserLink';
import './item.css';


export const GiftActivityItem = ({ activity }: { activity: IGiftActivity }) => {
  return (
    <div className="list-item gift-activity-item">
      <Image activity={activity} />
      <div className="list-row">
        <div className="list-row-content">
          <span className="list-row-title"><Trans i18nKey={`store_gift.actions.${activity.type}`} /></span>
          <div className="list-row-description">
            {activity.type === 'transaction' ? (
              <span>
                <UserLink user={activity.user}/> <Trans i18nKey="store_gift.bought_gift" />
              </span>
            ) : (
              <span>
                <UserLink user={activity.sender}/> <Trans i18nKey="store_gift.sent_gift" /> <UserLink user={activity.recipient!}/>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
