import { Dispatch, SetStateAction } from 'react';
import { Trans } from 'react-i18next';
import { GiftLottie } from '@/components/GiftLottie';
import { Avatar } from '@/components/Avatar';
import { formatNumberK } from '@/helpers/utils';
import './gift.css';


export const Gift = (
  { transaction, setCurrent }: { transaction: ITransaction, setCurrent: Dispatch<SetStateAction<ITransaction | null>> }
) => {
  return (
    <div className="user-gift" onClick={() => setCurrent(transaction)}>
      <div className="container">
        <div className="info">
          <Avatar user={transaction.user} />
          <span className="quantity">
            <Trans
              i18nKey="user.gift_quantity"
              count={transaction.gift.quantity}
              values={{ quantity: formatNumberK(transaction.gift.quantity)}}
            />
            </span>
        </div>
        <GiftLottie gift={transaction.gift} autoplay delay noClick />
      </div>
      <span className="name">{transaction.gift.name}</span>
    </div>
  );
};
