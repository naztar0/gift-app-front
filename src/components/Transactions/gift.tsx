import { Dispatch, SetStateAction } from 'react';
import { Trans } from 'react-i18next';
import { GiftLottie } from '@/components/GiftLottie';
import './gift.css';


export const Gift = (
  { transaction, setCurrent }: { transaction: ITransaction, setCurrent: Dispatch<SetStateAction<ITransaction | null>> }
) => {
  return (
    <div className="transactions-gift">
      <span className="name">{transaction.gift.name}</span>
      <GiftLottie gift={transaction.gift} autoplay delay />
      <button className="send" onClick={() => setCurrent(transaction)}>
        <span><Trans i18nKey="gifts.send" /></span>
      </button>
    </div>
  );
};
