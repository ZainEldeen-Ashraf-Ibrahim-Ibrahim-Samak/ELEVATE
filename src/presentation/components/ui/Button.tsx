import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'card' | 'cardSolid' | 'icon';
type Size = 'sm' | 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary: 'btn btn--primary',
  ghost: 'btn btn--ghost',
  card: 'btn btn--card',
  cardSolid: 'btn btn--card-solid',
  icon: 'btn btn--icon',
};

const sizePadding: Record<Size, string> = {
  sm: '9px 14px',
  md: '11px 22px',
  lg: '16px 30px',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = 'primary', size = 'md', style, ...rest }: ButtonProps) {
  const base =
    variant === 'card' || variant === 'cardSolid'
      ? { padding: '13px', fontSize: '14.5px' }
      : variant === 'icon'
        ? { width: 44, height: 44, fontSize: 18 }
        : {
            padding: sizePadding[size],
            fontSize: size === 'lg' ? '15px' : size === 'sm' ? '13px' : '14px',
          };
  return <button className={variantClass[variant]} style={{ ...base, ...style }} {...rest} />;
}
