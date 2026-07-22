import type { CSSProperties } from 'react';

export function Eyebrow({ children }: { children: string }) {
  return (
    <span
      style={{
        color: 'var(--primary)',
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: '1.5px',
      }}
    >
      {children}
    </span>
  );
}

export function SectionTitle({
  children,
  size = 'md',
  style,
}: {
  children: string;
  size?: 'sm' | 'md' | 'lg';
  style?: CSSProperties;
}) {
  const fontSize =
    size === 'lg'
      ? 'clamp(32px, 4.5vw, 52px)'
      : size === 'md'
        ? 'clamp(32px, 4.5vw, 50px)'
        : 'clamp(30px, 4.2vw, 46px)';
  return (
    <h2
      style={{
        fontSize,
        margin: '10px 0 0',
        lineHeight: 1.02,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}
