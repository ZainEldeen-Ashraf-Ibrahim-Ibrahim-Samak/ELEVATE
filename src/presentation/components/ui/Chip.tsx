import type { ReactNode } from 'react';

export function Chip({
  active,
  onClick,
  children,
  size = 'md',
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  size?: 'md' | 'lg';
}) {
  return (
    <button
      type="button"
      className={`chip ${active ? 'chip--active' : 'chip--idle'}`}
      onClick={onClick}
      style={
        size === 'lg'
          ? { padding: '10px 20px', fontWeight: 800, fontSize: '13.5px' }
          : { padding: '9px 16px', fontWeight: 700, fontSize: '13px' }
      }
    >
      {children}
    </button>
  );
}
