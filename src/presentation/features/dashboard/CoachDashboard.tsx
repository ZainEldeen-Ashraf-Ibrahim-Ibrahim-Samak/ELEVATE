import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';
import { CoverImage, StatCard } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';
import type { CoachTab } from '../../viewmodels/useAppViewModel';
import { DashboardShell, InboxRow, ListPanel } from './DashboardShell';
import type { DashboardNavItem } from './DashboardShell';

const tabs: CoachTab[] = ['overview', 'dietPlan', 'workoutPlan', 'messages'];

export function CoachDashboard() {
  const { t } = useI18n();
  const vm = useAppVM();
  if (vm.activeView !== 'coach') return null;

  const repo = container.coachRepository;
  const stats = repo.getStats();
  const items: DashboardNavItem<CoachTab>[] = tabs.map((id) => ({
    id,
    label: t(`trainerDash.tabs.${id}`),
  }));

  return (
    <DashboardShell
      brand="ELEVATE"
      brandSuffix={t('trainerDash.brandSuffix')}
      items={items}
      activeId={vm.coachTab}
      onSelect={vm.setCoachTab}
      title={t(`trainerDash.tabs.${vm.coachTab}`)}
      exitLabel={t('trainerDash.exit')}
      onExit={vm.exitDashboard}
    >
      {vm.coachTab === 'overview' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 18,
          }}
        >
          <StatCard value={String(stats.activeClients)} label={t('trainerDash.stats.activeClients')} />
          <StatCard value={stats.avgRating.toFixed(1)} label={t('trainerDash.stats.avgRating')} />
          <StatCard value={String(stats.weeklyCheckIns)} label={t('trainerDash.stats.checkIns')} />
          <StatCard value={t('trainerDash.stats.earningsValue')} label={t('trainerDash.stats.earnings')} />
        </div>
      )}

      {vm.coachTab === 'dietPlan' && (
        <>
          <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 20 }}>
            {t('trainerDash.dietHint')}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 18,
            }}
          >
            {repo.getDietDays().map((d) => (
              <div
                key={d.day}
                style={{
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <CoverImage src={d.image} style={{ height: 140 }} />
                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: 'var(--primary)',
                      marginBottom: 4,
                    }}
                  >
                    {t(`trainerDash.days.${d.day}`)}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#d5d5d0' }}>{d.meal}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {vm.coachTab === 'workoutPlan' && (
        <>
          <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 20 }}>
            {t('trainerDash.workoutHint')}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 18,
            }}
          >
            {repo.getWorkoutDays().map((d) => (
              <div
                key={d.day}
                style={{
                  background: 'var(--card)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 16,
                  overflow: 'hidden',
                }}
              >
                <CoverImage src={d.image} style={{ height: 140, position: 'relative' }}>
                  {d.hasVideo && (
                    <div
                      style={{
                        position: 'absolute',
                        top: 10,
                        insetInlineEnd: 10,
                        background: 'rgba(0,0,0,.6)',
                        borderRadius: 8,
                        padding: '5px 9px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                      }}
                    >
                      {t('trainerDash.videoBadge')}
                    </div>
                  )}
                </CoverImage>
                <div style={{ padding: 16 }}>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: 'var(--primary)',
                      marginBottom: 4,
                    }}
                  >
                    {t(`trainerDash.days.${d.day}`)}
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#d5d5d0' }}>{d.move}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {vm.coachTab === 'messages' && (
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
