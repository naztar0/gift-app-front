import { useEffect, useState, useCallback } from 'react';
import { Player as Lottie } from '@lottiefiles/react-lottie-player';
import type { AnimationItem } from 'lottie-web';
import { useNavigate } from 'react-router-dom';
import { Trans } from 'react-i18next';
import './index.css';


interface MenuItem {
  title: string;
  icon: string;
  link: string;
}

const menuItems: MenuItem[] = [
  {
    title: 'store',
    icon: '/lottie/menu/tab-store.json',
    link: '/store',
  },
  {
    title: 'gifts',
    icon: '/lottie/menu/tab-gifts.json',
    link: '/gifts',
  },
  {
    title: 'leaderboard',
    icon: '/lottie/menu/tab-leaderboard.json',
    link: '/leaderboard',
  },
  {
    title: 'profile',
    icon: '/lottie/menu/tab-profile.json',
    link: '/profile',
  },
];

interface MenuButtonProps {
  item: MenuItem;
  isActive: boolean;
  index: number;
  onButtonClick: (index: number) => void;
}

const MenuButton = ({ item, isActive, index, onButtonClick }: MenuButtonProps) => {
  const [lottieRef, setLottieRef] = useState<AnimationItem | null>(null);

  useEffect(() => {
    if (lottieRef && isActive) {
      lottieRef.stop();
      lottieRef.play();
    }
  }, [isActive, lottieRef]);

  return (
    <button
      className={`menu-item ${isActive ? 'active' : ''}`}
      onClick={() => onButtonClick(index)}
    >
      <Lottie
        className="menu-icon"
        src={item.icon}
        loop={false}
        lottieRef={setLottieRef}
      />
      <span><Trans i18nKey={`menu.${item.title}`} /></span>
    </button>
  );
};

MenuButton.displayName = 'MenuButton';

export const Menu = () => {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const index = menuItems.findIndex((item) => item.link === window.location.pathname);
    if (index !== -1) {
      setActive(index);
    }
  }, [window.location.pathname]);

  const onButtonClick = useCallback((index: number) => {
    navigate(menuItems[index].link);
  }, [navigate]);

  return (
    <div className="tab-bar">
      <div className="tab-bar-buttons">
        {menuItems.map((item, index) => (
          <MenuButton
            key={`menu-item-${index}`}
            item={item}
            index={index}
            isActive={index === active}
            onButtonClick={onButtonClick}
          />
        ))}
      </div>
    </div>
  );
};