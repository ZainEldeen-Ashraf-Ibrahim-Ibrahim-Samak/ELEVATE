import type { MouseEvent, ReactNode } from 'react';

/**
 * Overlay modal: clicking the backdrop closes, clicking the panel does not.
 */
export function Modal({
  onClose,
  children,
  maxWidth = 460,
  align = 'center',
  zIndex = 200,
  panelClassName = '',
}: {
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
  align?: 'center' | 'top';
  zIndex?: number;
  panelClassName?: string;
}) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 bg-black/75 backdrop-blur flex justify-center overflow-y-auto ${
        align === 'center' ? 'items-center p-5' : 'items-start px-5 py-[5vh]'
      }`}
      style={{ zIndex }}
    >
      <div
        onClick={stop}
        className={`bg-surface-alt border border-white/[.12] rounded-[20px] w-full overflow-hidden ${panelClassName}`}
        style={{ maxWidth }}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalCloseButton({
  onClick,
  label,
  className = '',
}: {
  onClick: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`w-8 h-8 rounded-full bg-white/[.08] border-0 text-white text-[15px] cursor-pointer ${className}`}
    >
      ✕
    </button>
  );
}
