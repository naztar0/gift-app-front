import type { ComponentType, JSX } from 'react';

import { StorePage } from '@/pages/Store';
import { StoreGiftPage } from '@/pages/StoreGift';
import { GiftsPage } from '@/pages/Gifts';
import { UserPage } from '@/pages/User';
import { ProfilePage } from '@/pages/Profile';
import { HistoryPage } from '@/pages/History';
import { LeaderboardPage } from '@/pages/Leaderboard';
import { GiftPurchasedPage } from '@/pages/GiftPurchased';
import { GiftReceivedPage } from '@/pages/GiftReceived';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/store', Component: StorePage },
  { path: '/store/:id', Component: StoreGiftPage },
  { path: '/gifts', Component: GiftsPage },
  { path: '/users/:id', Component: UserPage },
  { path: '/profile', Component: ProfilePage },
  { path: '/history', Component: HistoryPage },
  { path: '/leaderboard', Component: LeaderboardPage },
  { path: '/transactions/:id', Component: GiftPurchasedPage },
  { path: '/receive/:id', Component: GiftReceivedPage },
];
