import { Trans } from 'react-i18next';


export const Header = () => {
  return (
    <header className="page-header">
      <span className="title"><Trans i18nKey="user_activity.title" /></span>
      <span className="subtitle"><Trans i18nKey="user_activity.subtitle" /></span>
    </header>
  );
};
