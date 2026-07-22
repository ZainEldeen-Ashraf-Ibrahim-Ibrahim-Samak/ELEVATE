import type { ReactNode } from 'react';

export interface DashboardNavItem<T extends string> {
  id: T;
  label: string;
  icon?: string;
}

/** Full-screen dashboard layout: brand sidebar + header + scrollable content. */
export function DashboardShell<T extends string>({
  brand,
  brandSuffix,
  items,
  activeId,
  onSelect,
  title,
  exitLabel,
  onExit,
  children,
}: {
  brand: string;
  brandSuffix: string;
  items: DashboardNavItem<T>[];
  activeId: T;
  onSelect: (id: T) => void;
  title: string;
  exitLabel: string;
  onExit: () => void;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'var(--surface)',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: 220,
          flexShrink: 0,
          background: 'var(--surface-alt)',
          borderInlineEnd: '1px solid var(--line)',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          overflowY: 'auto',
        }}
      >
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, margin: '0 8px 24px' }}>
          {brand}
          <span style={{ color: 'var(--primary)' }}>{brandSuffix}</span>
        </div>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                textAlign: 'start',
                background: active ? 'var(--primary)' : 'transparent',
                color: active ? 'var(--surface)' : '#d5d5d0',
                border: 'none',
                padding: '11px 12px',
                borderRadius: 10,
                fontWeight: 700,
                fontSize: '13.5px',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
              }}
            >
              {item.icon} {item.label}
            </button>
          );
        })}
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px 5vw',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <div
            style={{ fontFamily: 'var(--font-display)', fontSize: 22, textTransform: 'uppercase' }}
          >
            {title}
          </div>
          <button
            type="button"
            className="btn btn--ghost"
            style={{ padding: '10px 18px', fontSize: '13.5px' }}
            onClick={onExit}
          >
            {exitLabel}
          </button>
        </div>
        <div style={{ padding: '32px 5vw' }}>{children}</div>
      </div>
    </div>
  );
}

export function ListPanel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        background: 'var(--line)',
        borderRadius: 14,
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  );
}

export function InboxRow({
  from,
  preview,
  time,
  onClick,
}: {
  from: string;
  preview: string;
  time: string;
  onClick?: () => void;
}) {
  return (
    <div
      className="inbox-row"
      onClick={onClick}
      style={{
        background: 'var(--card)',
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: onClick ? 'pointer' : 'default',
        gap: 12,
      }}
    >
      <div>
        <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{from}</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>{preview}</div>
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 12, flexShrink: 0 }}>{time}</div>
    </div>
  );
}
