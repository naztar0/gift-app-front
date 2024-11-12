import { JSX } from 'react';
import { Player as Lottie } from '@lottiefiles/react-lottie-player';
import { GiftLottie } from '@/components/GiftLottie';
import './index.css';


export const GiftScreen = (
  { transaction, title, subtitle }: { transaction: ITransaction, title: string, subtitle: string | JSX.Element }
) => {
  return (
    <div className="gift-screen">
      <div className="gift-screen-lottie">
        <Lottie
          className="gift-screen-effect"
          src="/lottie/effect-gift-purchased.json"
          autoplay
        />
        <GiftLottie gift={transaction.gift} autoplay />
      </div>
      <span className="title">{title}</span>
      <span className="subtitle">{subtitle}</span>
    </div>
  );
};
