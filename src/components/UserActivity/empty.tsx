import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { mainButton } from '@telegram-apps/sdk-react';
import './empty.css';


export const Empty = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    mainButton.setParams({
      text: t('common.open_store'),
      isEnabled: true,
      isVisible: true,
    });
    const onClick = () => navigate('/store');
    mainButton.onClick(onClick);
    return () => {
      mainButton.offClick(onClick);
    }
  }, []);

  return (
    <div className="user-history-empty">
      <img src="/images/balloons.png" alt="No gifts" />
      <span className="title"><Trans i18nKey="user_activity.empty.title" /></span>
      <span className="subtitle"><Trans i18nKey="user_activity.empty.subtitle" /></span>
    </div>
  );
};
