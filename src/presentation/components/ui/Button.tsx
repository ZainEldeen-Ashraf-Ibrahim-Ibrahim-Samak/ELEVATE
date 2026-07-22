import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'ghost' | 'card' | 'cardSolid' | 'icon';
type Size = 'sm' | 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  card: 'btn-card',
  cardSolid: 'btn-card-solid',
  icon: 'btn-icon',
};

const sizeClass: Record<Size, string> = {
  sm: 'px-3.5 py-[9px] text-[13px]',
  md: 'px-[22px] py-[11px] text-sm',
  lg: 'px-[30px] py-4 text-[15px]',
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}: ButtonProps) {
  const sizing =
    variant === 'card' || variant === 'cardSolid'
      ? 'p-[13px] text-[14.5px]'
      : variant === 'icon'
        ? 'w-11 h-11 text-lg'
        : sizeClass[size];
  return (
    <button type="button" className={`${variantClass[variant]} ${sizing} ${className}`} {...rest} />
  );
}
