import USDTIcon from '@/assets/icons/usdt.svg?react';
import TONIcon from '@/assets/icons/ton.svg?react';
import ETHIcon from '@/assets/icons/eth.svg?react';
import './index.css';


type UiType = 'button' | 'default';

export const Currency = ({ currency, ui }: { currency: CurrencyType, ui: UiType }) => {
  return (
    <div className={`currency-icon ${currency.toLowerCase()} ${ui}`}>
      {currency === 'USDT' && <USDTIcon />}
      {currency === 'TON' && <TONIcon />}
      {currency === 'ETH' && <ETHIcon />}
    </div>
  );
};
