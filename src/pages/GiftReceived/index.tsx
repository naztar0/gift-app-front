import { useParams, useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Page } from '@/components/Page';
import { GiftScreen } from '@/components/GiftScreen';
import { GiftNotification } from '@/components/GiftNotification';
import { Skeleton } from '@/components/Skeleton';
import { useTransferTransactionQuery } from '@/store/api/transactions';
import './index.css';


export const GiftReceivedPage = () => {
  const { t } = useTranslation(undefined, { keyPrefix: 'gift_received' });
  const id = useParams().id!;
  const navigate = useNavigate();
  const { data: transfer, isLoading } = useTransferTransactionQuery(id);

  return (
    <Page
      menu={false}
      mainButtonParams={{ text: t('main_button'), onClick: () => navigate('/profile') }}
    >
      {!transfer && !isLoading && (
        <div>Failed to load gift</div>
      )}
      <Skeleton show={isLoading} className="gift-purchased-skeleton">
        {transfer && (
          <>
            <GiftScreen
              transaction={transfer.transaction}
              title={t('title')}
              subtitle={(
                <Trans
                  i18nKey="gift_received.subtitle"
                  values={{ name: transfer.transaction.gift.name }}
                  components={{ b: <b /> }}
                />
              )}
            />
            <GiftNotification
              transaction={transfer.transaction}
              title={t('notification.title')}
              subtitle={t('notification.subtitle', {
                name: transfer.transaction.gift.name,
                fullName: `${transfer.transaction.user.firstName} ${transfer.transaction.user.lastName}`.trim()
              })}
              button={{ text: t('notification.button'), onClick: () => navigate('/profile') }}
            />
          </>
        )}
      </Skeleton>
    </Page>
  );
};
