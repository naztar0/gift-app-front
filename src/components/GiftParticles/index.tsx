import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/hooks';
import { getFps } from '@/selectors/settingsSelector';
import './index.css';


const PARTICLE = new Path2D('m15,13.4l9-1.4-9-1.4c-.9-.1-1.5-.8-1.7-1.7L12,0l-1.4,9c-.1.9-.8,1.5-1.7,1.7L0,12l9,1.4c.9.1,1.5.8,1.7,1.7l1.4,9,1.4-9c.1-.9.8-1.5,1.7-1.7Z');

interface Particle {
  dx: number;
  dy: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

const SIZE_DECREASE = 0.997;
const SIZE_BOUND = 0.6;
const SIZE_DECREASE_BOUND = 0.01;
const MIN_SIZE = 0.7;
const MAX_SIZE = 1.3;
const MIN_SPEED = 30;
const MAX_SPEED = 70;
const MIN_ANGLE = 0;
const MAX_ANGLE = 360;
const MARGIN = 24;

export const GiftParticles = ({ centerX, centerY, delay = 0 }: { centerX?: number, centerY?: number, delay?: number }) => {
  const fps = useAppSelector(getFps);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const canvas = document.createElement('canvas');

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    const colors = ['#FECC13', '#FEBF05', '#FF9044'];
    const particles: Particle[] = [];

    if (delay) {
      ctx.globalAlpha = 0;
      setTimeout(() => ctx.globalAlpha = 1, delay);
    }

    const moveParticle = (particle: Particle) => {
      particle.x += particle.dx * particle.speed;
      particle.y += particle.dy * particle.speed;
      particle.size *= SIZE_DECREASE;
      if (particle.size <= SIZE_BOUND) {
        particle.size -= SIZE_DECREASE_BOUND;
      }
      if (particle.size <= 0) {
        return false;
      }

      return (
        particle.x >= -MARGIN && particle.x <= container.clientWidth + MARGIN
          && particle.y >= -MARGIN && particle.y <= container.clientHeight + MARGIN
      );
    };

    const createParticle = () => {
      const x = centerX || (canvas.width / 2);
      const y = centerY || (canvas.height / 2);

      const angle = Math.random() * (MAX_ANGLE - MIN_ANGLE) + MIN_ANGLE;

      const dx = Math.cos(angle * (Math.PI / 180));
      const dy = Math.sin(angle * (Math.PI / 180));

      const size = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;
      const speed = (Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED) / fps;

      particles.push({
        dx, dy, x, y, size, speed
      });
    };

    const drawParticle = (particle: Particle) => {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.scale(particle.size, particle.size);
      ctx.fill(PARTICLE);
      ctx.restore();
    };

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (++frames === 2) {
        frames = 0;
        createParticle();
      }
      particles.forEach((particle, index) => {
        if (!moveParticle(particle)) {
          particles.splice(index, 1);
        } else {
          drawParticle(particle);
        }
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      container.removeChild(canvas);
    };
  }, [centerX, centerY]);

  return (
    <div ref={containerRef} className="gift-particles" />
  );
}
