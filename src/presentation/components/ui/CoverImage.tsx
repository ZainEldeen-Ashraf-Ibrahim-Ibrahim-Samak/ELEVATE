import type { CSSProperties, ReactNode } from 'react';

/** Div with a cover background image — used for thumbs, cards, and banners. */
export function CoverImage({
  src,
  position = 'center',
  className = '',
  style,
  children,
}: {
  src: string;
  position?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className={`bg-cover ${className}`}
      style={{ backgroundImage: `url(${src})`, backgroundPosition: position, ...style }}
    >
      {children}
    </div>
  );
}
