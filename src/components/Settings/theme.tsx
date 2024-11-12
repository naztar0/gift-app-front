import { getTheme } from '@/selectors/settingsSelector';
import { AppTheme } from '@/helpers/constants/theme';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { toggleTheme } from '@/store/reducers/settings';
import ThemeLight from '@/assets/icons/theme_light.svg?react';
import ThemeDark from '@/assets/icons/theme_dark.svg?react';


export const Theme = () => {
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector(getTheme);

  return (
    <button className="settings-switch" onClick={() => dispatch(toggleTheme())}>
      <div className={`switcher ${currentTheme === AppTheme.Dark ? 'right' : 'left'}`}/>
      <div className={`icon ${currentTheme === AppTheme.Light ? 'active' : ''}`}>
        <ThemeLight/>
      </div>
      <div className={`icon ${currentTheme === AppTheme.Dark ? 'active' : ''}`}>
        <ThemeDark/>
      </div>
    </button>
  );
}