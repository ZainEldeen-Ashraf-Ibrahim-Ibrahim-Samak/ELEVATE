export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ height: 6, background: '#222', borderRadius: 3, overflow: 'hidden' }}
    >
      <div style={{ width: `${clamped}%`, height: '100%', background: 'var(--primary)' }} />
    </div>
  );
}
