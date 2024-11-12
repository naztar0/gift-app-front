import { useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import { Currency } from '@/components/Currency';
import { GiftLottie, setBackgroundCallback } from '@/components/GiftLottie';
import { setElementId, setProps } from '@/store/reducers/animation';
import { useAppDispatch } from '@/hooks';
import { formatNumberK } from '@/helpers/utils';
import { PAGE_ANIMATION_DURATION } from '@/helpers/constants/animation';
import './gift.css';


export const Gift = ({ gift }: { gift: IGift }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const imageRef = useRef<HTMLDivElement>(null);

  const isSoldOut = useMemo(() => gift.sold >= gift.quantity, [gift.sold, gift.quantity]);

  const setBackground = useCallback(setBackgroundCallback(gift), [gift.color]);

  const onClick = useCallback(() => {
    if (imageRef.current) {
      const elementId = `image-${Date.now()}`;
      imageRef.current.setAttribute('id', elementId);
      dispatch(setProps({
        x: 'center',
        y: 72,
        width: 268,
        height: 268,
      }));
      dispatch(setElementId(elementId));
    }
    setTimeout(() => navigate(`/store/${gift._id}`), PAGE_ANIMATION_DURATION);
  }, []);

  return (
    <div className="store-gift" ref={setBackground}>
      <span className="quantity">
        <Trans
          i18nKey="store.quantity"
          values={{ sold: formatNumberK(gift.sold), quantity: formatNumberK(gift.quantity) }}
        />
      </span>
      <GiftLottie gift={gift} delay autoplay ref={imageRef} />
      <span className="name">{gift.name}</span>
      <button className="buy" disabled={isSoldOut} onClick={onClick}>
        {isSoldOut ? (
          <span><Trans i18nKey="store.sold_out" /></span>
        ) : (
          <>
          <Currency currency={gift.currency} ui="button" />
          <span>{formatNumberK(gift.price)} {gift.currency}</span>
          </>
        )}
      </button>
    </div>
  );
};
