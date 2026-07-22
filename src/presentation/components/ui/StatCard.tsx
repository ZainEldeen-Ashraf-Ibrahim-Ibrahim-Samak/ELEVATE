export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid rgba(255,255,255,.1)',
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, color: 'var(--primary)' }}>
        {value}
      </div>
      <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{label}</div>
    </div>
  );
}

export function StatInline({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 34 }}>{value}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{label}</div>
    </div>
  );
}
