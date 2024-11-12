import {
  mockTelegramEnv,
  isTMA,
  parseInitData,
  LaunchParams,
  ThemeParams,
  retrieveLaunchParams
} from '@telegram-apps/sdk-react';
import { DEV, DEBUG_THEME, DEBUG_USER_HASH } from '@/config';


const lightTheme: ThemeParams = {
  bgColor: '#ffffff',
  sectionBgColor: '#ffffff',
  secondaryBgColor: '#f0f0f0',
  textColor: '#222222',
  hintColor: '#a8a8a8',
  linkColor: '#2678b6',
  buttonColor: '#50a8eb',
  buttonTextColor: '#ffffff',
  headerBgColor: '#527da3',
  accentTextColor: '#1c93e3',
  sectionHeaderTextColor: '#3a95d5',
  subtitleTextColor: '#82868a',
  destructiveTextColor: '#cc2929',
  sectionSeparatorColor: '#d9d9d9',
  bottomBarBgColor: '#f0f0f0',
};

const darkTheme: ThemeParams = {
  bgColor: '#212d3b',
  sectionBgColor: '#1d2733',
  secondaryBgColor: '#151e27',
  textColor: '#ffffff',
  hintColor: '#7d8b99',
  linkColor: '#5eabe1',
  buttonColor: '#50a8eb',
  buttonTextColor: '#ffffff',
  headerBgColor: '#242d39',
  accentTextColor: '#64b5ef',
  sectionHeaderTextColor: '#79c4fc',
  subtitleTextColor: '#7b8790',
  destructiveTextColor: '#ee686f',
  sectionSeparatorColor: '#0d1218',
  bottomBarBgColor: '#151e27',
};

if (DEV) {
  await (async () => {
    if (await isTMA()) {
      return;
    }

    // Determine which launch params should be applied. We could already
    // apply them previously, or they may be specified on purpose using the
    // default launch parameters transmission method.
    let lp: LaunchParams | undefined;
    try {
      lp = retrieveLaunchParams();
    } catch {
      const initDataRaw = new URLSearchParams([
        ['user', JSON.stringify({
          id: 334668342,
          first_name: 'ℕℤℝ',
          last_name: '',
          username: 'NrTrN',
          language_code: 'en',
          is_premium: true,
          allows_write_to_pm: true,
        })],
        ['query_id', 'AAE2ovITAAAAADai8hOWeDcv'],
        ['auth_date', '1730431147'],
        ['hash', DEBUG_USER_HASH],
      ]).toString();

      lp = {
        themeParams: DEBUG_THEME === 'dark' ? darkTheme : lightTheme,
        initData: parseInitData(initDataRaw),
        initDataRaw,
        version: '8',
        platform: 'tdesktop',
      }
    }

    mockTelegramEnv(lp);
    console.warn(
      '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
    );
  })();
}