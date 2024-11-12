import { getLanguage } from '@/selectors/settingsSelector';
import { AppLanguage } from '@/helpers/constants/language';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { toggleLanguage } from '@/store/reducers/settings';


export const Language = () => {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector(getLanguage);

  return (
    <button className="settings-switch" onClick={() => dispatch(toggleLanguage())}>
      <div className={`switcher ${currentLanguage === AppLanguage.RU ? 'right' : 'left'}`}/>
      <div className={`icon ${currentLanguage === AppLanguage.EN ? 'active' : ''}`}>
        <span>EN</span>
      </div>
      <div className={`icon ${currentLanguage === AppLanguage.RU ? 'active' : ''}`}>
        <span>RU</span>
      </div>
    </button>
  );
}