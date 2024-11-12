import { Avatar } from '@/components/Avatar';
import BuyGiftIcon from '@/assets/icons/action_buy.svg?react';
import SendGiftIcon from '@/assets/icons/action_send.svg?react';
import './image.css';


export const Image = ({ activity }: { activity: IGiftActivity }) => {
  return (
    <div className="gift-activity-avatar">
      {activity.type === 'transaction' ? (
        <>
        <Avatar user={activity.user} />
        <BuyGiftIcon className="buy" />
        </>
      ) : (
        <>
        <Avatar user={activity.sender} />
        <SendGiftIcon className="send" />
        </>
      )}
    </div>
  );
};
