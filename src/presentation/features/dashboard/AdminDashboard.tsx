import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';
import { CoverImage, StatCard } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';
import type { AdminTab } from '../../viewmodels/useAppViewModel';
import { DashboardShell, InboxRow, ListPanel } from './DashboardShell';
import type { DashboardNavItem } from './DashboardShell';

const tabIcons: Record<AdminTab, string> = {
  overview: '▦',
  teams: '🧑‍🏫',
  users: '👥',
  plans: '💳',
  dietPlan: '🥗',
  workoutPlan: '🏋️',
  offers: '🏷️',
  messages: '💬',
};

export function AdminDashboard() {
  const { t, locale } = useI18n();
  const vm = useAppVM();
  if (vm.activeView !== 'admin') return null;

  const repo = container.adminRepository;
  const stats = repo.getStats();
  const numberFormat = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');
  const items: DashboardNavItem<AdminTab>[] = (Object.keys(tabIcons) as AdminTab[]).map((id) => ({
    id,
    icon: tabIcons[id],
    label: t(`admin.tabs.${id}`),
  }));
  const plan = container.dailyPlanRepository.getToday();

  return (
    <DashboardShell
      brand="ELEVATE"
      brandSuffix={t('admin.brandSuffix')}
      items={items}
      activeId={vm.adminTab}
      onSelect={vm.setAdminTab}
      title={t(`admin.tabs.${vm.adminTab}`)}
      exitLabel={t('admin.exit')}
      onExit={vm.exitDashboard}
    >
      {vm.adminTab === 'overview' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 18,
          }}
        >
          <StatCard
            value={numberFormat.format(stats.activeMembers)}
            label={t('admin.stats.activeMembers')}
          />
          <StatCard
            value={numberFormat.format(stats.activeTrainers)}
            label={t('admin.stats.activeTrainers')}
          />
          <StatCard value={t('admin.stats.mrrValue')} label={t('admin.stats.mrr')} />
          <StatCard value={`${stats.retentionPct}%`} label={t('admin.stats.retention')} />
        </div>
      )}

      {vm.adminTab === 'teams' && (
        <ListPanel>
          {container.trainerRepository.getAll().map((trainer) => (
            <div
              key={trainer.id}
              style={{
                background: 'var(--card)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{trainer.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {t(`trainers.profiles.${trainer.id}.tag`)}
              </div>
              <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>
                {t('trainers.ratingPrefix')} {trainer.rating.toFixed(1)}
              </div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'users' && (
        <ListPanel>
          {repo.getMembers().map((member) => (
            <div
              key={member.name}
              style={{
                background: 'var(--card)',
                padding: '16px 20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{member.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {t(`pricing.plans.${member.planId}.name`)}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>{member.joined}</div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'plans' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
          }}
        >
          {container.catalogRepository.getPlans().map((p) => (
            <div
              key={p.id}
              style={{
                background: 'var(--card)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 16,
                padding: 22,
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
                {t(`pricing.plans.${p.id}.name`)}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26,
                  color: 'var(--primary)',
                }}
              >
                {t(`pricing.plans.${p.id}.price`)}
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  {t('common.perMonth')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {vm.adminTab === 'dietPlan' && (
        <ListPanel>
          {plan.meals.map((m) => (
            <div
              key={m.id}
              style={{
                background: 'var(--card)',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <CoverImage
                src={m.image}
                style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '14.5px' }}>
                  {t(`dailyPlan.meals.${m.id}.name`)}
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '12.5px' }}>
                  {t(`dailyPlan.meals.${m.id}.detail`)}
                </div>
              </div>
              <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>
                {t(`dailyPlan.meals.${m.id}.kcal`)}
              </div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'workoutPlan' && (
        <ListPanel>
          {plan.workouts.map((w) => (
            <div
              key={w.id}
              style={{
                background: 'var(--card)',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <CoverImage
                src={w.image}
                style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }}
              />
              <div style={{ flex: 1, fontWeight: 700, fontSize: '14.5px' }}>
                {t(`dailyPlan.workouts.${w.id}.name`)}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                {t(`dailyPlan.workouts.${w.id}.detail`)}
              </div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'offers' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 18,
          }}
        >
          {container.catalogRepository.getOffers().map((o) => (
            <div
              key={o.id}
              style={{
                background: 'var(--card)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 16,
                padding: 22,
              }}
            >
              <div
                style={{
                  color: 'var(--primary)',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  marginBottom: 8,
                }}
              >
                {t(`offers.items.${o.id}.tag`)}
              </div>
              <div style={{ fontWeight: 700, fontSize: '14.5px' }}>
                {t(`offers.items.${o.id}.title`)}
              </div>
            </div>
          ))}
        </div>
      )}

      {vm.adminTab === 'messages' && (
        <ListPanel>
          {repo.getInbox().map((msg) => (
            <InboxRow
              key={msg.id}
              from={msg.from}
              preview={msg.preview}
              time={msg.time}
              onClick={() => vm.openChat(msg.from)}
            />
          ))}
        </ListPanel>
      )}
    </DashboardShell>
  );
}
