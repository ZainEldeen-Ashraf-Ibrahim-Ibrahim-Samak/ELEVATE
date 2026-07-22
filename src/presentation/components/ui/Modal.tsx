import type { CSSProperties, MouseEvent, ReactNode } from 'react';

/**
 * Overlay modal: clicking the backdrop closes, clicking the panel does not.
 */
export function Modal({
  onClose,
  children,
  maxWidth = 460,
  align = 'center',
  zIndex = 200,
  panelStyle,
}: {
  onClose: () => void;
  children: ReactNode;
  maxWidth?: number;
  align?: 'center' | 'top';
  zIndex?: number;
  panelStyle?: CSSProperties;
}) {
  const stop = (e: MouseEvent) => e.stopPropagation();
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex,
        background: 'rgba(0,0,0,.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        justifyContent: 'center',
        padding: align === 'center' ? 20 : '5vh 20px',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={stop}
        style={{
          background: 'var(--surface-alt)',
          border: '1px solid rgba(255,255,255,.12)',
          borderRadius: 20,
          maxWidth,
          width: '100%',
          overflow: 'hidden',
          ...panelStyle,
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function ModalCloseButton({
  onClick,
  label,
  style,
}: {
  onClick: () => void;
  label: string;
  style?: CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      style={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        background: 'rgba(255,255,255,.08)',
        border: 'none',
        color: '#fff',
        fontSize: 15,
        cursor: 'pointer',
        ...style,
      }}
    >
      ✕
    </button>
  );
}
