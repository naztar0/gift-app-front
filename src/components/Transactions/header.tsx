import { Trans } from 'react-i18next';


export const Header = () => {
  return (
    <header className="page-header">
      <div className="title">
        <span><Trans i18nKey="gifts.title" /></span>
      </div>
      <span className="subtitle compact"><Trans i18nKey="gifts.subtitle" /></span>
    </header>
  );
};
