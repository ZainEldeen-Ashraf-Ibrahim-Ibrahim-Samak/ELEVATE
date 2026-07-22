import type { CSSProperties, ReactNode } from 'react';

/** Div with a cover background image — used for thumbs, cards, and banners. */
export function CoverImage({
  src,
  position = 'center',
  style,
  children,
}: {
  src: string;
  position?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: position,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
