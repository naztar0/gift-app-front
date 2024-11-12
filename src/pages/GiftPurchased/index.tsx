import cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { switchInlineQuery } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { GiftScreen } from '@/components/GiftScreen';
import { GiftNotification } from '@/components/GiftNotification';
import { Skeleton } from '@/components/Skeleton';
import { useGetTransactionQuery } from '@/store/api/transactions';
import './index.css';


export const GiftPurchasedPage = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'gift_purchased' });
  const id = useParams().id!;
  const navigate = useNavigate();
  const { data, isLoading } = useGetTransactionQuery(id);

  const sendGift = useCallback(() => {
    switchInlineQuery(id, ['users']);
  }, []);

  useEffect(() => {
    cookies.set('closeMiniApp', '1');
  }, []);

  return (
    <Page
      back
      menu={false}
      mainButtonParams={{ text: t('main_button'), onClick: sendGift }}
      secondaryButtonParams={{ text: t('secondary_button'), onClick: () => navigate('/store') }}
    >
      {!data && !isLoading && (
        <div>Failed to load gift</div>
      )}
      <Skeleton show={isLoading} className="gift-purchased-skeleton">
        {data && (
          <>
            <GiftScreen
              transaction={data}
              title={t('title')}
              subtitle={(
                <span>
                  <Trans
                    i18nKey="gift_purchased.subtitle"
                    values={{ name: data.gift.name, price: data.gift.price, currency: data.gift.currency }}
                    components={{ b: <b /> }}
                  />
                </span>
              )}
            />
            <GiftNotification
              transaction={data}
              title={t('notification.title')}
              subtitle={t('notification.subtitle')}
              button={{ text: t('notification.button'), onClick: sendGift }}
            />
          </>
        )}
      </Skeleton>
    </Page>
  );
};
