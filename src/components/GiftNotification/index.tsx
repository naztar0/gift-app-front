import { useState, useEffect } from 'react';
import { GiftLottie } from '@/components/GiftLottie';
import './index.css';


export const GiftNotification = ({ transaction, title, subtitle, button }: {
  transaction: ITransaction,
  title: string,
  subtitle: string,
  button: { text: string, onClick: () => void }
}) => {
  const [show, setShow] = useState(false);
  const [render, setRender] = useState(true);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (!show && !first) {
      setTimeout(() => setRender(false), 1e3);
    }
  }, [show]);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
      setFirst(false);
    }, 100);
    setTimeout(() => setShow(false), 6e3);
  }, []);

  if (!render) {
    return null;
  }

  return (
    <div className={`gift-notification ${show ? 'in' : 'out'} ${first ? 'first' : ''}`}>
      <GiftLottie gift={transaction.gift} autoplay />
      <div className="gift-notification-content">
        <span className="title">{title}</span>
        <span className="subtitle">{subtitle}</span>
      </div>
      <button
        className="gift-notification-button"
        onClick={button.onClick}
      >
        {button.text}
      </button>
    </div>
  );
};
