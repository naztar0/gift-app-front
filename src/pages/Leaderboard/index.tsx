import { useState, useCallback, useRef } from 'react';
import { Page } from '@/components/Page';
import { Item } from '@/components/UserLeaderboard/item';
import { Search } from '@/components/UserLeaderboard/search';
import { Skeleton } from '@/components/Skeleton';
import { useInfiniteScroll } from '@/hooks/infScroll';
import { useGetLeaderboardQuery } from '@/store/api/leaderboard';
import { getLeaderboardPage} from '@/selectors/paginationSelector';
import { setLeaderboardPage } from '@/store/reducers/pagination';
import { useAppDispatch } from '@/hooks';
import { api } from '@/store/api';
import './index.css';


export const LeaderboardPage = () => {
  const dispatch = useAppDispatch();

  const [search, setSearch] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data: leaderboard, isLoading } = useInfiniteScroll(
    useGetLeaderboardQuery,
    getLeaderboardPage,
    setLeaderboardPage,
    'Leaderboard',
    { search, pageSize: 20, refresh: true, ref: scrollRef },
  );

  const setSearchDispatch = useCallback((value: string) => {
    setSearch(value);
    dispatch(api.util.invalidateTags(['Leaderboard']));
    dispatch(setLeaderboardPage({ page: 1 }));
  }, [dispatch]);

  return (
    <Page>
      <div className="leaderboard-page">
        <Search setSearch={setSearchDispatch} />
        <div className="leaderboard-list" ref={scrollRef}>
          <Skeleton show={isLoading} count={10} height={54} list>
            {leaderboard.map((user) => (
              <Item key={user._id} user={user} />
            ))}
          </Skeleton>
        </div>
        <div className="leaderboard-me">
          <Item user="me" />
        </div>
      </div>
    </Page>
  );
};
