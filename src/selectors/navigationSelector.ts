import { RootState } from '@/store';

export const getShowBackButton = (state: RootState) => state.navigation.showBackButton;
export const getShowMenu = (state: RootState) => state.navigation.showMenu;
