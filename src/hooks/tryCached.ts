import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApiEndpointQuery, TypedUseQuery } from '@reduxjs/toolkit/query/react';


export function useTryCached<T extends { _id: string }>(
  id: string,
  useGetDataItemQuery: TypedUseQuery<T, any, any>,
  dataItemListEndpoint: ApiEndpointQuery<any, any>,
) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [skip, setSkip] = useState(true);

  const { data: dataItem, isLoading: isLoadingItem, isFetching: isFetchingItem } = useGetDataItemQuery(id, { skip });

  const cachedData = useSelector((state) =>
    dataItemListEndpoint.select(undefined)(state as any),
    { devModeChecks: { stabilityCheck: 'never' } },
  );

  useEffect(() => {
    if (cachedData.status === 'fulfilled') {
      const data = (cachedData.data as T[]).find((item) => item._id === id);
      if (data) {
        setData(data);
      } else {
        setSkip(false);
      }
    } else if (cachedData.status !== 'pending') {
      setSkip(false);
    }
  }, [cachedData.status, cachedData.data]);

  useEffect(() => {
    if (dataItem) {
      setData(dataItem);
    }
  }, [dataItem]);

  return { data, isLoading: isLoadingItem, isFetching: isFetchingItem };
}
