import { useState, useCallback, useEffect, useRef, useImperativeHandle, forwardRef, ForwardedRef } from 'react';
import { Player as Lottie, PlayerEvent } from '@lottiefiles/react-lottie-player';
import type { AnimationItem } from 'lottie-web';
import { MENU_ICON_ANIM_DURATION } from '@/helpers/constants/menu';
import { BASE_STORAGE_URL } from '@/config';
import './index.css';


export const setBackgroundCallback = (gift: IGift | undefined) =>
  ((element: HTMLDivElement | null) => {
    if (!element || !gift) {
      return;
    }
    element?.style.setProperty('--gift-background', gift.color);
  });

export const GiftLottie = forwardRef(function GiftLottie(
  { gift, delay, autoplay, noClick }: { gift: IGift, delay?: boolean, autoplay?: boolean, noClick?: boolean },
  outerRef: ForwardedRef<HTMLDivElement>,
) {
  const [seqPos, setSeqPos] = useState(autoplay ? 0 : -1);
  const [lottieRef, setLottieRef] = useState<AnimationItem | null>(null);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [lottieShow, setLottieShow] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useImperativeHandle(outerRef, () => ref.current!, []);

  useEffect(() => {
    setTimeout(() => setLottieShow(true), delay ? MENU_ICON_ANIM_DURATION : 0);
  }, [delay]);

  useEffect(() => {
    if (!lottieRef) {
      return;
    }
    if (gift.animationSequence[seqPos]) {
      lottieRef.setDirection(gift.animationSequence[seqPos].direction);
      lottieRef.goToAndPlay(lottieRef.playDirection === 1 ? 1 : lottieRef.totalFrames - 1, true);
    } else {
      lottieRef.goToAndStop(gift.animationSequence[seqPos - 1]?.direction === -1 ? 1 : lottieRef.totalFrames - 1, true);
    }
  }, [seqPos, lottieRef]);

  const onLottieEvent = useCallback((event: PlayerEvent) => {
    if (event === 'load') {
      setLottieLoaded(true);
    } else if (event === 'complete') {
      setSeqPos((prev) => (prev + 1));
    } else if (event === 'frame' && lottieRef &&
      // Stop the animation before the last frame to prevent blinking
      seqPos === gift.animationSequence.length - 1 && (
        (lottieRef.currentFrame <= 2 && gift.animationSequence[seqPos].direction === -1) ||
        (lottieRef.currentFrame >= lottieRef.totalFrames - 2 && gift.animationSequence[seqPos].direction === 1)
      )
    ) {
      setSeqPos((prev) => (prev + 1));
    }
  }, [seqPos, lottieRef]);

  useEffect(() => {
    if (lottieRef && !noClick) {
      ref.current?.addEventListener('click', () => {
        setSeqPos(0);
      });
    }
  }, [lottieRef]);

  return (
    <div className="gift-animation-box" ref={ref}>
      {!lottieLoaded && <img className="preview" src={`${BASE_STORAGE_URL}${gift.previewUrl}`} alt={gift.name} />}
      {lottieShow && (
        <Lottie
          className={`animation ${lottieLoaded ? 'loaded' : ''}`}
          loop={false}
          lottieRef={setLottieRef}
          src={`${BASE_STORAGE_URL}${gift.animationUrl}`}
          onEvent={onLottieEvent}
        />
      )}
    </div>
  );
});
