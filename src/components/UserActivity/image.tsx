import { ActionType } from './item';
import { BASE_STORAGE_URL } from '@/config';
import BuyGiftIcon from '@/assets/icons/action_buy.svg?react';
import SendGiftIcon from '@/assets/icons/action_send.svg?react';
import ReceiveGiftIcon from '@/assets/icons/action_receive.svg?react';
import './image.css';


export const Image = ({ activity, action }: { activity: IUserActivity, action: ActionType }) => {
  return (
    <div className="user-activity-image">
      <img src={`${BASE_STORAGE_URL}${activity.gift.previewUrl}`} alt="gift" />
      {action === 'buy' && <BuyGiftIcon className="buy" />}
      {action === 'send' && <SendGiftIcon className="send" />}
      {action === 'receive' && <ReceiveGiftIcon className="receive" />}
    </div>
  );
};
