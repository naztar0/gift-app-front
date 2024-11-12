import { ReactNode } from 'react';
import './index.css';


export const Skeleton = (
  {
    children,
    show = true,
    count = 1,
    className = '',
    list = false,
    height,
}: {
  children?: ReactNode,
  show?: boolean,
  count?: number,
  className?: string,
  list?: boolean,
  height?: number,
}) => {
  if (show) {
    return (
      <>
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className={`skeleton ${list ? 'list' : ''} ${className}`}
            style={{ ...(height ? { height: `${height}px` } : {}) }}
          />
        ))}
      </>
    );
  }

  return <>{children}</>;
}