import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Gift } from './gift';
import { GiftPopup } from '@/components/GiftPopup';
import { GiftsEmpty } from '@/components/GiftsEmpty';
import { Skeleton } from '@/components/Skeleton';
import { useInfiniteScroll } from '@/hooks/infScroll';
import { getUserGiftsPage } from '@/selectors/paginationSelector';
import { useGetUserGiftsQuery } from '@/store/api/users';
import { setUserGiftsPage } from '@/store/reducers/pagination';
import './gifts.css';


export const Gifts = ({ user }: { user: IUser }) => {
  const { t } = useTranslation();

  const { data, isLoading } = useInfiniteScroll(
    useGetUserGiftsQuery,
    getUserGiftsPage,
    setUserGiftsPage,
    'Transfer',
    { pageSize: 12, id: user._id, refresh: true },
  );

  const [current, setCurrent] = useState<ITransaction | null>(null);

  return (
    <>
    <div className="user-gifts-list animate">
      <Skeleton show={isLoading} count={6} height={136}>
        {data?.length ? (
          data.map((transfer) => (
            <Gift key={transfer._id} transaction={transfer.transaction} setCurrent={setCurrent} />
          ))
        ) : (
          <GiftsEmpty text={t('user.empty')} />
        )}
      </Skeleton>
    </div>
    <GiftPopup transaction={current} setTransaction={setCurrent} from={current?.user} />
    </>
  );
};
