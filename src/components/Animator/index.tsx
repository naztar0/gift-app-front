import { useEffect, ReactNode } from 'react';
import { getAnimationElementId, getAnimationProps } from '@/selectors/animationSelector';
import { setElementId, setActive } from '@/store/reducers/animation';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { PAGE_ANIMATION_DURATION } from '@/helpers/constants/animation';


export const Animator = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const animationElementId = useAppSelector(getAnimationElementId);
  const animationProps = useAppSelector(getAnimationProps);

  useEffect(() => {
    if (!animationElementId) {
      return;
    }
    const element = document.getElementById(animationElementId);
    if (!element) {
      return;
    }
    const currentRect = element.getBoundingClientRect();

    const emptyDiv = document.createElement('div');
    emptyDiv.style.width = `${currentRect.width}px`;
    emptyDiv.style.height = `${currentRect.height}px`;
    emptyDiv.style.aspectRatio = '1';
    element.parentElement?.insertBefore(emptyDiv, element);

    element.style.position = 'fixed';
    element.style.top = `${currentRect.top}px`;
    element.style.left = `${currentRect.left}px`;
    element.style.width = `${currentRect.width}px`;
    element.style.height = `${currentRect.height}px`;
    element.style.zIndex = '1';

    document.body.appendChild(element);

    const keyframeProps = {
      top: animationProps.y === 'center' ? `${window.innerHeight / 2 - animationProps.height / 2}px` : `${animationProps.y}px`,
      left: animationProps.x === 'center' ? `${window.innerWidth / 2 - animationProps.width / 2}px` : `${animationProps.x}px`,
      width: `${animationProps.width}px`,
      height: `${animationProps.height}px`,
    };

    dispatch(setActive(true));

    const animation = element.animate(keyframeProps, {
      duration: PAGE_ANIMATION_DURATION,
      easing: 'ease',
      fill: 'forwards',
    });

    animation.onfinish = () => {
      setTimeout(() => {
        dispatch(setActive(false));
        setTimeout(() => {
          dispatch(setElementId(''));
          document.body.removeChild(element);
        }, PAGE_ANIMATION_DURATION);
      }, 50); // 50 ms delay to give time for new page to render
    };
  }, [animationElementId]);

  return children;
}