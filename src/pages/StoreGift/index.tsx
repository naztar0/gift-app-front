import cookies from 'js-cookie';
import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { openTelegramLink, closeMiniApp } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { Currency } from '@/components/Currency';
import { Skeleton } from '@/components/Skeleton';
import { useGetGiftQuery, useGetGiftActivityQuery, useBuyGiftQuery, getGifts } from '@/store/api/gifts';
import { GiftLottie, setBackgroundCallback } from '@/components/GiftLottie';
import { GiftActivityItem } from '@/components/GiftActivity/item';
import { useInfiniteScroll } from '@/hooks/infScroll';
import { useTryCached } from '@/hooks/tryCached';
import { getGiftActivityPage } from '@/selectors/paginationSelector';
import { setGiftActivityPage } from '@/store/reducers/pagination';
import './index.css';


const checkClose = () => {
  if (cookies.get('closeMiniApp') === '1') {
    cookies.remove('closeMiniApp');
    closeMiniApp();
  }
};

export const StoreGiftPage = () => {
  const { t } = useTranslation();
  const id = useParams().id!;
  const [skipBuy, setSkipBuy] = useState(true);
  const [closeCheckInterval, setCloseCheckInterval] = useState<NodeJS.Timeout | null>(null);

  const { data: gift, isLoading: isLoadingGift } = useTryCached(id, useGetGiftQuery, getGifts);

  const { data: invoice } = useBuyGiftQuery(id, { skip: skipBuy });
  const { data: activity, isLoading: isLoadingActivity } = useInfiniteScroll(
    useGetGiftActivityQuery,
    getGiftActivityPage,
    setGiftActivityPage,
    'GiftActivity',
    { id, pageSize: 20, refresh: true },
  );

  const setBackground = useCallback(setBackgroundCallback(gift), [gift?.color]);

  useEffect(() => {
    if (invoice) {
      openTelegramLink(invoice.url);
      setCloseCheckInterval(setInterval(checkClose, 1e3));
    }
  }, [invoice]);

  useEffect(() => {
    return () => {
      if (closeCheckInterval) {
        clearInterval(closeCheckInterval);
      }
    };
  }, []);

  return (
    <Page
      back
      menu={false}
      mainButtonParams={{
        text: t('store_gift.main_button'),
        onClick: () => setSkipBuy(false)
      }}
    >
      {isLoadingGift || !gift ? (
        <div className="gift-page-skeleton animate">
          <Skeleton className="top" />
          <Skeleton className="middle" />
          <Skeleton className="bottom" />
        </div>
      ) : (gift && (
        <div className="gift-page-top">
          <div className="gift-image-box">
            <div className="gift-image" ref={setBackground}>
              <GiftLottie gift={gift} autoplay />
            </div>
          </div>
          <div className="gift-description-box animate">
            <div className="title">
              <span className="name">{gift.name}</span>
              <div className="quantity">
                <span>
                  <Trans i18nKey="store_gift.quantity" values={{sold: gift.sold, quantity: gift.quantity}}/>
                </span>
              </div>
            </div>
            <span className="subtitle">
              <Trans i18nKey="store_gift.subtitle"/>
            </span>
            <div className="price">
              <Currency currency={gift.currency} ui="default"/>
              <span>{`${gift.price} ${gift.currency}`}</span>
            </div>
          </div>
        </div>
      ))}
      <div className="divider animate"/>
      <div className="list-title animate">
        <span>
          <Trans i18nKey="store_gift.recently_actions"/>
        </span>
      </div>
      <Skeleton show={isLoadingActivity} count={3} height={58} list className="animate">
        {activity?.map((item) => (
          <GiftActivityItem key={item._id} activity={item}/>
        ))}
      </Skeleton>
    </Page>
  );
};
