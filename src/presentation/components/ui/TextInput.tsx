import type { CSSProperties, InputHTMLAttributes } from 'react';

export function TextInput({
  style,
  pill = false,
  ...rest
}: InputHTMLAttributes<HTMLInputElement> & { pill?: boolean }) {
  const base: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--surface)',
    border: '1px solid rgba(255,255,255,.15)',
    color: '#fff',
    padding: pill ? '11px 14px' : '12px 14px',
    borderRadius: pill ? 999 : 10,
    fontSize: pill ? '13.5px' : 14,
    fontFamily: 'var(--font-body)',
  };
  return <input style={{ ...base, ...style }} {...rest} />;
}
