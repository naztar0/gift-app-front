import { Page } from '@/components/Page';
import { Header } from '@/components/Store/header';
import { Gift } from '@/components/Store/gift';
import { Skeleton } from '@/components/Skeleton';
import { useInfiniteScroll } from '@/hooks/infScroll';
import { getGiftsPage } from '@/selectors/paginationSelector';
import { useGetGiftsQuery } from '@/store/api/gifts';
import { setGiftsPage } from '@/store/reducers/pagination';
import './index.css';


export const StorePage = () => {
  const { data, isLoading } = useInfiniteScroll(
    useGetGiftsQuery,
    getGiftsPage,
    setGiftsPage,
    'Gift',
    { pageSize: 4 },
  );

  return (
    <Page>
      <Header />
      <div className="store-list">
        <Skeleton show={isLoading} count={4} height={252}>
          {data.map((gift) => (
            <Gift key={gift._id} gift={gift} />
          ))}
        </Skeleton>
      </div>
    </Page>
  );
};
