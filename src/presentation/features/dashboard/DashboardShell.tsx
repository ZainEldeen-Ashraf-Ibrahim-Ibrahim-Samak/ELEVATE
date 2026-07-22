'use client';

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
    <div className="fixed inset-0 z-[300] bg-surface flex">
      <div className="w-[220px] shrink-0 bg-surface-alt border-e border-line px-4 py-6 flex flex-col gap-1 overflow-y-auto">
        <div className="font-display text-lg mx-2 mb-6">
          {brand}
          <span className="text-primary">{brandSuffix}</span>
        </div>
        {items.map((item) => {
          const active = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              className={`flex items-center gap-2.5 text-start border-0 px-3 py-[11px] rounded-[10px] font-bold text-[13.5px] cursor-pointer font-body ${
                active ? 'bg-primary text-surface' : 'bg-transparent text-[#d5d5d0]'
              }`}
            >
              {item.icon} {item.label}
            </button>
          );
        })}
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center px-[5vw] py-6 border-b border-line">
          <div className="font-display text-[22px] uppercase">{title}</div>
          <button
            type="button"
            className="btn-ghost px-[18px] py-2.5 text-[13.5px]"
            onClick={onExit}
          >
            {exitLabel}
          </button>
        </div>
        <div className="px-[5vw] py-8">{children}</div>
      </div>
    </div>
  );
}

export function ListPanel({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-px bg-line rounded-[14px] overflow-hidden">{children}</div>
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
      className={`inbox-row bg-card px-5 py-4 flex justify-between items-center gap-3 ${
        onClick ? 'cursor-pointer' : 'cursor-default'
      }`}
      onClick={onClick}
    >
      <div>
        <div className="font-bold text-[14.5px]">{from}</div>
        <div className="text-ink-muted text-[12.5px]">{preview}</div>
      </div>
      <div className="text-ink-muted text-xs shrink-0">{time}</div>
    </div>
  );
}
