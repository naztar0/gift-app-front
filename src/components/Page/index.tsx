import { PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backButton, mainButton, secondaryButton } from '@telegram-apps/sdk-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getAnimationActive } from '@/selectors/animationSelector';
import { setShowMenu } from '@/store/reducers/navigation';
import './index.css';


interface ButtonParams {
  text: string
  onClick: () => void
}

export function Page({ children, back=false, menu=true, mainButtonParams, secondaryButtonParams }: PropsWithChildren<{
  /**
   * True if it is allowed to go back from this page.
   * @default false
   */
  back?: boolean
  /**
    * True if a navigation menu should be shown.
   * @default true
   * */
  menu?: boolean
  mainButtonParams?: ButtonParams
  secondaryButtonParams?: ButtonParams
}>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const animationActive = useAppSelector(getAnimationActive);
  const [out, setOut] = useState<boolean | null>(null);

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  useEffect(() => {
    dispatch(setShowMenu(menu));
  }, [menu]);

  useEffect(() => {
    if (!mainButtonParams) {
      mainButton.setParams({
        isEnabled: false,
        isVisible: false,
      });
      return;
    }
    mainButton.setParams({
      text: mainButtonParams.text,
      isEnabled: true,
      isVisible: true,
    });
    mainButton.onClick(mainButtonParams.onClick);
    return () => {
      mainButton.offClick(mainButtonParams.onClick);
    }
  }, [mainButtonParams]);

  useEffect(() => {
    if (!secondaryButtonParams) {
      secondaryButton.setParams({
        isEnabled: false,
        isVisible: false,
      });
      return;
    }
    secondaryButton.setParams({
      text: secondaryButtonParams.text,
      isEnabled: true,
      isVisible: true,
      position: 'bottom',
    });
    secondaryButton.onClick(secondaryButtonParams.onClick);
  }, [secondaryButtonParams]);

  useEffect(() => {
    if (out !== null) {
      return;
    }
    setOut(!animationActive);
  }, [animationActive, out]);

  return (
    <main className={`page ${menu ? 'with-menu' : ''} ${animationActive ? 'hidden' : ''} ${out ? 'out' : 'in'}`}>
      {children}
    </main>
  );
}