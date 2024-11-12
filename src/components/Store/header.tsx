import { Trans } from 'react-i18next';
import GiftIcon from '@/assets/icons/present.svg?react';


export const Header = () => {
  return (
    <header className="page-header">
      <div className="container">
        <div className="title">
          <GiftIcon />
          <span><Trans i18nKey="store.title" /></span>
        </div>
        <span className="subtitle"><Trans i18nKey="store.subtitle" /></span>
      </div>
    </header>
  );
};
