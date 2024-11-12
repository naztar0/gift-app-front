import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/components/Page';
import { Header } from '@/components/UserActivity/header';
import { UserActivityItem } from '@/components/UserActivity/item';
import { Empty } from '@/components/UserActivity/empty';
import { Skeleton } from '@/components/Skeleton';
import { useInfiniteScroll } from '@/hooks/infScroll';
import { useGetActivityQuery } from '@/store/api/users';
import { getUserActivityPage } from '@/selectors/paginationSelector';
import { setUserActivityPage } from '@/store/reducers/pagination';
import './index.css';


export const HistoryPage = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useInfiniteScroll(
    useGetActivityQuery,
    getUserActivityPage,
    setUserActivityPage,
    'UserActivity',
    { pageSize: 20 },
  );

  const groupedActivities = useMemo<Record<string, IUserActivity[]>>(() => {
    if (!data) return {};

    return data.reduce((groups: Record<string, IUserActivity[]>, activity: IUserActivity) => {
      const date = new Date(activity.createdAt);
      const dateKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
      return groups;
    }, {});
  }, [data]);

  // Get sorted date keys
  const dateKeys = Object.keys(groupedActivities).sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  return (
    <Page back menu={false}>
      {isLoading || data?.length > 0 ? <Header /> : null}
      <Skeleton show={isLoading} count={12} list height={54}>
        {data.length > 0 ? (
          <div className="activity-list">
            {dateKeys.map((dateKey) => {
              const dateActivities = groupedActivities[dateKey];
              const [, month, day] = dateKey.split('-');
              return (
                <div key={dateKey}>
                  <div className="list-title date-group">
                    <span>{`${day} ${t(`common.dates.month_${month}`)}`}</span>
                  </div>
                  {dateActivities.map((activity) => (
                    <UserActivityItem key={activity._id} activity={activity}/>
                  ))}
                </div>
              );
            })}
          </div>
        ) : (
          <Empty/>
        )}
      </Skeleton>
    </Page>
  );
}