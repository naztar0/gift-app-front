import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { switchInlineQuery } from '@telegram-apps/sdk-react';
import { Page } from '@/components/Page';
import { Header } from '@/components/Transactions/header';
import { Gift } from '@/components/Transactions/gift';
import { GiftsEmpty } from '@/components/GiftsEmpty';
import { GiftPopup } from '@/components/GiftPopup';
import { Skeleton } from '@/components/Skeleton';
import { useInfiniteScroll } from '@/hooks/infScroll';
import { useGetTransactionsQuery } from '@/store/api/transactions';
import { getTransactionsPage } from '@/selectors/paginationSelector';
import { setTransactionsPage } from '@/store/reducers/pagination';
import './index.css';


export const GiftsPage = () => {
  const { t } = useTranslation();
  const [selectedTransaction, setSelectedTransaction] = useState<ITransaction | null>(null);

  const { data, isLoading } = useInfiniteScroll(
    useGetTransactionsQuery,
    getTransactionsPage,
    setTransactionsPage,
    'Transaction',
    { pageSize: 12 },
  );

 const sendGift = useCallback(() => {
    if (selectedTransaction) {
      switchInlineQuery(selectedTransaction._id, ['users']);
    }
  }, [selectedTransaction]);

  return (
    <Page>
      <Header/>
      <div className="transactions-list">
        <Skeleton show={isLoading} count={9} height={164}>
          {data?.length > 0 ? (
            data.map((transaction) => (
              <Gift key={transaction._id} transaction={transaction} setCurrent={setSelectedTransaction}/>
            ))
          ) : (
            <GiftsEmpty text={t('gifts.empty')} />
          )}
        </Skeleton>
      </div>
      <GiftPopup transaction={selectedTransaction} setTransaction={setSelectedTransaction} onClick={sendGift}/>
    </Page>
  );
};
