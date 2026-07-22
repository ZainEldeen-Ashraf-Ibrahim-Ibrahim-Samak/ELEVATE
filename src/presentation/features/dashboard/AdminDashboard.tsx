'use client';

import { useI18n } from '@/core/i18n';
import { clientEnv } from '@/core/env/client';
import { CoverImage, StatCard } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';
import type { AdminTab } from '@/store/uiSlice';
import {
  useGetAdminQuery,
  useGetCatalogQuery,
  useGetDailyPlanQuery,
  useGetTrainersQuery,
} from '@/store/apiSlice';
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
  const isAdmin = vm.activeView === 'admin';
  const { data: admin } = useGetAdminQuery(undefined, { skip: !isAdmin });
  const { data: trainers = [] } = useGetTrainersQuery(undefined, { skip: !isAdmin });
  const { data: catalog } = useGetCatalogQuery(undefined, { skip: !isAdmin });
  const { data: plan } = useGetDailyPlanQuery(undefined, { skip: !isAdmin });
  if (!isAdmin) return null;

  const numberFormat = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');
  const items: DashboardNavItem<AdminTab>[] = (Object.keys(tabIcons) as AdminTab[]).map((id) => ({
    id,
    icon: tabIcons[id],
    label: t(`admin.tabs.${id}`),
  }));

  return (
    <DashboardShell
      brand={clientEnv.appName}
      brandSuffix={t('admin.brandSuffix')}
      items={items}
      activeId={vm.adminTab}
      onSelect={vm.setAdminTab}
      title={t(`admin.tabs.${vm.adminTab}`)}
      exitLabel={t('admin.exit')}
      onExit={vm.exitDashboard}
    >
      {vm.adminTab === 'overview' && admin && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[18px]">
          <StatCard
            value={numberFormat.format(admin.stats.activeMembers)}
            label={t('admin.stats.activeMembers')}
          />
          <StatCard
            value={numberFormat.format(admin.stats.activeTrainers)}
            label={t('admin.stats.activeTrainers')}
          />
          <StatCard value={t('admin.stats.mrrValue')} label={t('admin.stats.mrr')} />
          <StatCard value={`${admin.stats.retentionPct}%`} label={t('admin.stats.retention')} />
        </div>
      )}

      {vm.adminTab === 'teams' && (
        <ListPanel>
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-card px-5 py-4 flex justify-between items-center gap-3"
            >
              <div className="font-bold text-[14.5px]">{trainer.name}</div>
              <div className="text-ink-muted text-[13px]">
                {t(`trainers.profiles.${trainer.id}.tag`)}
              </div>
              <div className="text-primary font-bold text-[13px]">
                {t('trainers.ratingPrefix')} {trainer.rating.toFixed(1)}
              </div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'users' && admin && (
        <ListPanel>
          {admin.members.map((member) => (
            <div
              key={member.name}
              className="bg-card px-5 py-4 flex justify-between items-center gap-3"
            >
              <div className="font-bold text-[14.5px]">{member.name}</div>
              <div className="text-ink-muted text-[13px]">
                {t(`pricing.plans.${member.planId}.name`)}
              </div>
              <div className="text-ink-muted text-[13px]">{member.joined}</div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'plans' && catalog && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px]">
          {catalog.plans.map((p) => (
            <div key={p.id} className="bg-card border border-white/10 rounded-2xl p-[22px]">
              <div className="font-extrabold text-base mb-1.5">
                {t(`pricing.plans.${p.id}.name`)}
              </div>
              <div className="font-display text-[26px] text-primary">
                {t(`pricing.plans.${p.id}.price`)}
                <span className="text-xs text-ink-muted">{t('common.perMonth')}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {vm.adminTab === 'dietPlan' && plan && (
        <ListPanel>
          {plan.meals.map((m) => (
            <div key={m.id} className="bg-card px-5 py-3 flex items-center gap-3.5">
              <CoverImage src={m.image} className="w-11 h-11 rounded-[10px] shrink-0" />
              <div className="flex-1">
                <div className="font-bold text-[14.5px]">{t(`dailyPlan.meals.${m.id}.name`)}</div>
                <div className="text-ink-muted text-[12.5px]">
                  {t(`dailyPlan.meals.${m.id}.detail`)}
                </div>
              </div>
              <div className="text-primary font-bold text-[13px]">
                {t(`dailyPlan.meals.${m.id}.kcal`)}
              </div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'workoutPlan' && plan && (
        <ListPanel>
          {plan.workouts.map((w) => (
            <div key={w.id} className="bg-card px-5 py-3 flex items-center gap-3.5">
              <CoverImage src={w.image} className="w-11 h-11 rounded-[10px] shrink-0" />
              <div className="flex-1 font-bold text-[14.5px]">
                {t(`dailyPlan.workouts.${w.id}.name`)}
              </div>
              <div className="text-ink-muted text-[13px]">
                {t(`dailyPlan.workouts.${w.id}.detail`)}
              </div>
            </div>
          ))}
        </ListPanel>
      )}

      {vm.adminTab === 'offers' && catalog && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[18px]">
          {catalog.offers.map((o) => (
            <div key={o.id} className="bg-card border border-white/10 rounded-2xl p-[22px]">
              <div className="text-primary font-extrabold text-[11.5px] mb-2">
                {t(`offers.items.${o.id}.tag`)}
              </div>
              <div className="font-bold text-[14.5px]">{t(`offers.items.${o.id}.title`)}</div>
            </div>
          ))}
        </div>
      )}

      {vm.adminTab === 'messages' && admin && (
        <ListPanel>
          {admin.inbox.map((msg) => (
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
