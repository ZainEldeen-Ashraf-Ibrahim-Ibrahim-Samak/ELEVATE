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
  const sizing =
    size === 'lg' ? 'px-5 py-2.5 font-extrabold text-[13.5px]' : 'px-4 py-[9px] font-bold text-[13px]';
  return (
    <button
      type="button"
      className={`${active ? 'chip-active' : 'chip-idle'} ${sizing}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
