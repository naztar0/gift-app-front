import { useEffect, useCallback, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeLanguage } from 'i18next';
import { useLaunchParams, miniApp } from '@telegram-apps/sdk-react';
import { Menu } from '@/components/Menu';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { getTheme, getLanguage } from '@/selectors/settingsSelector';
import { getShowMenu } from '@/selectors/navigationSelector';
import { setTheme, setFps } from '@/store/reducers/settings';
import { setProfile } from '@/store/reducers/profile';
import { useGetMeQuery } from '@/store/api/users';
import { AppTheme } from '@/helpers/constants/theme';
import { maxSplit, getFps } from '@/helpers/utils';


export const AppRoot = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(getTheme);
  const currentLanguage = useAppSelector(getLanguage);
  const showMenu = useAppSelector(getShowMenu);

  const navigate = useNavigate();
  const launchParams = useLaunchParams();

  const { data: profileData } = useGetMeQuery();

  useEffect(() => {
    const startParam = launchParams.startParam || new URLSearchParams(window.location.search).get('tgWebAppStartParam');
    if (!startParam) {
      if (window.location.pathname === '/') {
        navigate('/store', { replace: true });
      }
      return;
    }
    const [action, payload] = maxSplit(startParam, '_', 1);
    delete launchParams.startParam;
    if (action === 'gifts') {
      navigate('/gifts', { replace: true });
    } else if (action === 'transactions') {
      navigate(`/transactions/${payload}`, { replace: true });
    } else if (action === 'receive') {
      navigate(`/receive/${payload}`, { replace: true });
    }
  }, [launchParams.startParam, navigate]);

  useEffect(() => {
    const appThemeDark = currentTheme === AppTheme.Dark;
    const systemThemeDark = miniApp.isDark();
    document.body.classList.toggle('dark', appThemeDark);
    document.body.classList.toggle('light', !appThemeDark);
    document.body.classList.toggle('system', systemThemeDark === appThemeDark);

    const styles = window.getComputedStyle(document.body);
    miniApp.setBottomBarColor(styles.getPropertyValue('--bottom-bar-bg-color') as any);
    miniApp.setHeaderColor(styles.getPropertyValue('--header-bg-color') as any);
  }, [currentTheme]);

  const updateTheme = useCallback(() => {
    dispatch(setTheme(miniApp.isDark() ? AppTheme.Dark : AppTheme.Light));
    miniApp.backgroundColorRGB.unsub(updateTheme);
  }, [dispatch]);

  useEffect(() => {
    if (miniApp.backgroundColorRGB() && currentTheme === undefined) {
      updateTheme();
    } else if (currentTheme === undefined) {
      miniApp.backgroundColorRGB.sub(updateTheme);
    }
    return () => miniApp.backgroundColorRGB.unsub(updateTheme);
  }, [currentTheme, updateTheme]);

  useEffect(() => {
    changeLanguage(currentLanguage).catch();
  }, [currentLanguage]);

  useEffect(() => {
    if (profileData) {
      dispatch(setProfile(profileData));
    }
  }, [profileData, dispatch]);

  useEffect(() => {
    getFps().then((fps) => {
      dispatch(setFps(fps));
    });
  }, []);

  return (
    <div className="app">
      {children}
      {showMenu && <Menu />}
    </div>
  );
};