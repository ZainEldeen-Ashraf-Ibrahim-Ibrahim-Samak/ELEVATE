export function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-card border border-white/10 rounded-2xl p-6">
      <div className="font-display text-[32px] text-primary">{value}</div>
      <div className="text-ink-muted text-[13px]">{label}</div>
    </div>
  );
}

export function StatInline({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-[34px]">{value}</div>
      <div className="text-ink-muted text-[13px]">{label}</div>
    </div>
  );
}
