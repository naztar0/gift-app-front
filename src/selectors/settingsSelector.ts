import { RootState } from '@/store';

export const getTheme = (state: RootState) => state.settings.theme;
export const getLanguage = (state: RootState) => state.settings.language;
export const getFps = (state: RootState) => state.settings.fps;
