import cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { retrieveLaunchParams, miniApp } from '@telegram-apps/sdk-react';
import { AppTheme } from '@/helpers/constants/theme';
import { AppLanguage } from '@/helpers/constants/language';


interface SettingsState {
  theme: AppTheme | undefined;
  language: AppLanguage;
  fps: number;
}

const getTheme = () => {
  const theme = cookies.get('theme');
  if (theme) {
    return Number(theme) as AppTheme;
  }
  if (miniApp.backgroundColorRGB() !== undefined) {
    return miniApp.isDark() ? AppTheme.Dark : AppTheme.Light;
  }
};

const getLanguage = () => {
  const language = cookies.get('language');
  if (language) {
    return language as AppLanguage;
  }
  try {
    return retrieveLaunchParams().initData?.user?.languageCode === 'ru' ? AppLanguage.RU : AppLanguage.EN;
  } catch {
    return AppLanguage.EN;
  }
};

const getFps = () => {
  const fps = cookies.get('fps');
  if (fps) {
    return Number(fps);
  }
  return 60;
};

const setCookieValue = (key: string, value: string | number) => {
  cookies.set(key, value.toString(), { expires: 365 });
};

const initialState: SettingsState = {
  theme: getTheme(),
  language: getLanguage(),
  fps: getFps(),
} satisfies SettingsState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppTheme>) => {
      state.theme = action.payload;
      setCookieValue('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === AppTheme.Light ? AppTheme.Dark : AppTheme.Light;
      setCookieValue('theme', state.theme);
    },
    setLanguage: (state, action: PayloadAction<AppLanguage>) => {
      state.language = action.payload;
      setCookieValue('language', action.payload);
    },
    toggleLanguage: (state) => {
      state.language = state.language === AppLanguage.EN ? AppLanguage.RU : AppLanguage.EN;
      setCookieValue('language', state.language);
    },
    setFps: (state, action: PayloadAction<number>) => {
      state.fps = action.payload;
      cookies.set('fps', action.payload.toString());
    },
  },
});

export const { setTheme, toggleTheme, setLanguage, toggleLanguage, setFps } = settingsSlice.actions;

export default settingsSlice.reducer;
