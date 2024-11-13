import { useCallback, useEffect, useRef, useState } from 'react';
import { Player as Lottie, PlayerEvent } from '@lottiefiles/react-lottie-player';
import { AnimationItem } from 'lottie-web';
import './index.css';


export const EmptyLottie = () => {
  const [lottieRef, setLottieRef] = useState<AnimationItem | null>(null);
  const [lottieLoaded, setLottieLoaded] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const onLottieEvent = useCallback((event: PlayerEvent) => {
    if (event === 'load') {
      setLottieLoaded(true);
    }
  }, [lottieRef]);

  useEffect(() => {
    if (lottieRef) {
      ref.current?.addEventListener('click', () => {
        if (lottieRef.isPaused) {
          lottieRef.goToAndPlay(1, true);
        }
      });
    }
  }, [lottieRef]);

  return (
    <div className="empty-lottie" ref={ref}>
      {!lottieLoaded && <img src="/images/balloons.png" alt="Empty" />}
      <Lottie
        className={`animation ${lottieLoaded ? 'loaded' : ''}`}
        loop={false}
        autoplay
        lottieRef={setLottieRef}
        src="/lottie/emoji-balloons.json"
        onEvent={onLottieEvent}
      />
    </div>
  );
};
