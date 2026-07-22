'use client';

import { useI18n } from '@/core/i18n';
import { CoverImage, StatCard } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';
import type { CoachTab } from '@/store/uiSlice';
import { useGetCoachQuery } from '@/store/apiSlice';
import { DashboardShell, InboxRow, ListPanel } from './DashboardShell';
import type { DashboardNavItem } from './DashboardShell';

const tabs: CoachTab[] = ['overview', 'dietPlan', 'workoutPlan', 'messages'];

export function CoachDashboard() {
  const { t } = useI18n();
  const vm = useAppVM();
  const isCoach = vm.activeView === 'coach';
  const { data: coach } = useGetCoachQuery(undefined, { skip: !isCoach });
  if (!isCoach) return null;

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
      {vm.coachTab === 'overview' && coach && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
          <StatCard
            value={String(coach.stats.activeClients)}
            label={t('trainerDash.stats.activeClients')}
          />
          <StatCard
            value={coach.stats.avgRating.toFixed(1)}
            label={t('trainerDash.stats.avgRating')}
          />
          <StatCard
            value={String(coach.stats.weeklyCheckIns)}
            label={t('trainerDash.stats.checkIns')}
          />
          <StatCard
            value={t('trainerDash.stats.earningsValue')}
            label={t('trainerDash.stats.earnings')}
          />
        </div>
      )}

      {vm.coachTab === 'dietPlan' && coach && (
        <>
          <div className="text-ink-muted text-[13.5px] mb-5">{t('trainerDash.dietHint')}</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
            {coach.dietDays.map((d) => (
              <div
                key={d.day}
                className="bg-card border border-white/10 rounded-2xl overflow-hidden"
              >
                <CoverImage src={d.image} className="h-[140px]" />
                <div className="p-4">
                  <div className="font-extrabold text-sm text-primary mb-1">
                    {t(`trainerDash.days.${d.day}`)}
                  </div>
                  <div className="text-[13.5px] text-[#d5d5d0]">{d.meal}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {vm.coachTab === 'workoutPlan' && coach && (
        <>
          <div className="text-ink-muted text-[13.5px] mb-5">{t('trainerDash.workoutHint')}</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[18px]">
            {coach.workoutDays.map((d) => (
              <div
                key={d.day}
                className="bg-card border border-white/10 rounded-2xl overflow-hidden"
              >
                <CoverImage src={d.image} className="h-[140px] relative">
                  {d.hasVideo && (
                    <div className="absolute top-2.5 end-2.5 bg-black/60 rounded-lg px-[9px] py-[5px] text-[11.5px] font-bold">
                      {t('trainerDash.videoBadge')}
                    </div>
                  )}
                </CoverImage>
                <div className="p-4">
                  <div className="font-extrabold text-sm text-primary mb-1">
                    {t(`trainerDash.days.${d.day}`)}
                  </div>
                  <div className="text-[13.5px] text-[#d5d5d0]">{d.move}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {vm.coachTab === 'messages' && coach && (
        <ListPanel>
          {coach.inbox.map((msg) => (
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
