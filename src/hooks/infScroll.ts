import { useEffect, useCallback, useState, RefObject } from 'react';
import { TagDescription, TypedUseQuery } from '@reduxjs/toolkit/query/react';
import { TypedUseQueryHookResult } from '@reduxjs/toolkit/query/react';
import { UnknownAction } from '@reduxjs/toolkit';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { RootState } from '@/store';
import { api, TagType } from '@/store/api';


const CHECK_SCROLL_INTERVAL = 200;
const THRESHOLD_SCROLL = 100;
const PAGE_TIMEOUT = 6e4;

export function useInfiniteScroll<T>(
  useGetDataListQuery: TypedUseQuery<T[], any, any>,
  pageSelector: (state: RootState) => IPageState,
  pageSetter: (page: Partial<IPageState>) => UnknownAction,
  tag: TagDescription<TagType>,
  { pageSize = 10, refresh = false, ref, ...queryParams }: {
    pageSize?: number;
    refresh?: boolean;
    ref?: RefObject<HTMLElement>;
    [_: string]: any;
  }
) {
  const dispatch = useAppDispatch();
  const { page, timestamp } = useAppSelector(pageSelector);

  const [skip, setSkip] = useState(true);

  const { data = [], isLoading, isFetching }: TypedUseQueryHookResult<T[], any, any> =
    useGetDataListQuery({ page, pageSize, ...queryParams }, { skip });

  useEffect(() => {
    return () => {
      dispatch(pageSetter({ timestamp: Date.now() }));
    }
  }, []);

  useEffect(() => {
    if (Date.now() - timestamp > PAGE_TIMEOUT) {
      dispatch(pageSetter({ page: 1 }));
    }
    setSkip(false);
  }, [timestamp]);

  useEffect(() => {
    return () => {
      if (refresh) {
        dispatch(api.util.invalidateTags([tag]));
        dispatch(pageSetter({ page: 1 }));
      }
    }
  }, [refresh]);

  const readMore = useCallback(() => {
    if (!isFetching && data.length / pageSize === page) {
      dispatch(pageSetter({ page: page + 1 }));
    }
  }, [isFetching, data]);

  const checkScroll = useCallback(() => {
    if (ref?.current) {
      const { scrollTop, offsetHeight, scrollHeight } = ref.current;
      if (scrollTop + offsetHeight + THRESHOLD_SCROLL >= scrollHeight) {
        readMore();
      }
    } else {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (innerHeight + scrollTop > offsetHeight - THRESHOLD_SCROLL) {
        readMore();
      }
    }
  }, [readMore]);

  useEffect(() => {
    const interval = setInterval(checkScroll, CHECK_SCROLL_INTERVAL);
    return () => clearInterval(interval);
  }, [checkScroll]);

  return { data, page, readMore, isLoading, isFetching };
}
