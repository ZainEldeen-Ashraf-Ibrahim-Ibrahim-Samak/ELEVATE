export function Eyebrow({ children }: { children: string }) {
  return (
    <span className="text-primary font-extrabold text-[13px] tracking-[1.5px]">{children}</span>
  );
}

const titleSize = {
  sm: 'text-[clamp(30px,4.2vw,46px)]',
  md: 'text-[clamp(32px,4.5vw,50px)]',
  lg: 'text-[clamp(32px,4.5vw,52px)]',
} as const;

export function SectionTitle({
  children,
  size = 'md',
  className = '',
}: {
  children: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  return (
    <h2
      className={`font-display uppercase leading-[1.02] mt-2.5 mb-0 ${titleSize[size]} ${className}`}
    >
      {children}
    </h2>
  );
}
