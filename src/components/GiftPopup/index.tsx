import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { mainButton } from '@telegram-apps/sdk-react';
import { GiftLottie } from '@/components/GiftLottie';
import { Avatar } from '@/components/Avatar';
import { Currency } from '@/components/Currency';
import { UserLink } from '@/components/UserLink';
import { GiftParticles } from '@/components/GiftParticles';
import { formatDate, formatNumberT } from '@/helpers/utils';
import CloseIcon from '@/assets/icons/close.svg?react';
import './index.css';


export const GiftPopup = ({ transaction, setTransaction, from, onClick }: {
  transaction: ITransaction | null,
  setTransaction: Dispatch<SetStateAction<ITransaction | null>>,
  from?: IUser,
  onClick?: () => void,
}) => {
  const { t } = useTranslation(undefined, { keyPrefix: 'gift_popup' });

  const [show, setShow] = useState(false);

  const close = useCallback(() => {
    setShow(false);
    setTimeout(() => setTransaction(null), 300);
  }, [setTransaction]);

  useEffect(() => {
    if (!show) {
      mainButton.setParams({
        isEnabled: false,
        isVisible: false,
      });
      return;
    }
    mainButton.setParams({
      text: from ? t('close'): t('send_gift_to_contact'),
      isEnabled: true,
      isVisible: true,
    });
    const onClickCallback = () => {
      if (from) { close() }
      else if (onClick) { onClick() }
    }
    mainButton.onClick(onClickCallback);
    return () => {
      mainButton.offClick(onClickCallback);
    };
  }, [show, onClick, from, close]);

  useEffect(() => {
    if (transaction) {
      setShow(true);
    }
  }, [transaction]);

  if (!transaction) {
    return null;
  }

  return (
    <>
      <div className={`gift-popup-overlay ${show ? 'in' : 'out'}`} onClick={close} />
      <div className={`gift-popup ${show ? 'in' : 'out'}`}>
        <GiftParticles centerY={(150 / 2) + 16} delay={400} />
        <button className="gift-popup-close" onClick={close}>
          <CloseIcon />
        </button>
        <div className="gift-popup-lottie">
          <GiftLottie gift={transaction.gift} autoplay/>
        </div>
        <div className="gift-popup-title">
          <span>{from ? transaction.gift.name : t('send_gift')}</span>
        </div>
        <div className="gift-popup-table">
          <div className="row">
            <span className="cell label">{from ? t('from') : t('gift')}</span>
            <div className="cell value">{from ? (
              <>
                <Avatar user={from}/>
                <UserLink user={from} onClick={close} />
              </>
            ) : (
              <span>{transaction.gift.name}</span>
            )}</div>
          </div>
          <div className="row">
            <span className="cell label">{t('date')}</span>
            <div className="cell value">
              <span>{formatDate(transaction.createdAt, t('at'))}</span>
            </div>
          </div>
          <div className="row">
            <span className="cell label">{t('price')}</span>
            <div className="cell value">
              <Currency currency={transaction.currency} ui="default"/>
              <span>{`${transaction.price} ${transaction.currency}`}</span>
            </div>
          </div>
          <div className="row">
            <span className="cell label">{t('availability')}</span>
            <div className="cell value">
              <span>{`${formatNumberT(transaction.availability)} of ${formatNumberT(transaction.gift.quantity)}`}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
