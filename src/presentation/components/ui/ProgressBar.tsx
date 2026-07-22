export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-1.5 bg-[#222] rounded-[3px] overflow-hidden"
    >
      <div className="h-full bg-primary" style={{ width: `${clamped}%` }} />
    </div>
  );
}
