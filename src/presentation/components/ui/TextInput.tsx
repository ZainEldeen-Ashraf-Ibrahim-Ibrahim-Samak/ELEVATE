import type { InputHTMLAttributes } from 'react';

export function TextInput({
  pill = false,
  className = '',
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { pill?: boolean }) {
  const shape = pill
    ? 'rounded-full px-3.5 py-[11px] text-[13.5px]'
    : 'rounded-[10px] px-3.5 py-3 text-sm';
  return (
    <input
      className={`w-full box-border bg-surface border border-white/[.15] text-white font-body ${shape} ${className}`}
      {...rest}
    />
  );
}
