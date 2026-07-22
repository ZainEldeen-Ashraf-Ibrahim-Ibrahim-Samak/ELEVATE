'use client';

import { useI18n } from '@/core/i18n';
import { Button, Chip, CoverImage, Eyebrow, SectionTitle } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';
import { useGetDailyPlanQuery } from '@/store/apiSlice';

export function DailyPlanSection() {
  const { t, locale } = useI18n();
  const vm = useAppVM();
  const { data: plan } = useGetDailyPlanQuery();

  const dateLabel = plan
    ? new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(new Date(plan.date))
    : '';

  return (
    <section
      id="plans"
      className="px-[5vw] py-[90px] bg-surface-alt border-y border-line grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-14 items-center"
    >
      <div>
        <Eyebrow>{t('dailyPlan.eyebrow')}</Eyebrow>
        <SectionTitle className="mt-3 mb-5">{t('dailyPlan.title')}</SectionTitle>
        <p className="text-ink-soft text-[16.5px] leading-[1.65] max-w-[480px] mb-7">
          {t('dailyPlan.subtitle')}
        </p>
        <div className="flex gap-2.5 mb-7">
          <Chip
            size="lg"
            active={vm.planTab === 'training'}
            onClick={() => vm.setPlanTab('training')}
          >
            {t('dailyPlan.tabTraining')}
          </Chip>
          <Chip size="lg" active={vm.planTab === 'diet'} onClick={() => vm.setPlanTab('diet')}>
            {t('dailyPlan.tabDiet')}
          </Chip>
        </div>
        <div className="flex items-center gap-2 mb-3.5 text-ink-muted text-[13px]">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {t('dailyPlan.encryptedNote')}
        </div>
        <Button
          variant="primary"
          className="px-7 py-[15px] text-[14.5px]"
          onClick={() => vm.featuredTrainer && vm.openChat(vm.featuredTrainer.name)}
        >
          {t('dailyPlan.openChat')}
        </Button>
      </div>

      {plan && (
        <div className="bg-black border border-white/10 rounded-3xl p-[26px] shadow-[0_30px_80px_rgba(0,0,0,.5)]">
          <div className="flex justify-between items-center mb-[22px]">
            <div className="font-extrabold text-[15px]">
              {t('dailyPlan.today', { date: dateLabel })}
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-[38px] h-[38px] rounded-full"
                style={{
                  background: `conic-gradient(#e8ff5c ${plan.completionPct}%, #2a2a2a 0)`,
                }}
              />
              <span className="text-[13px] text-ink-muted">
                {t('dailyPlan.percentDone', { percent: plan.completionPct })}
              </span>
            </div>
          </div>

          {vm.planTab === 'training' ? (
            <div className="flex flex-col gap-0.5">
              {plan.workouts.map((w) => (
                <div
                  key={w.id}
                  className="flex justify-between items-center px-1 py-3 border-b border-white/[.06] gap-3"
                >
                  <CoverImage src={w.image} className="w-11 h-11 rounded-[10px] shrink-0" />
                  <div className="flex-1">
                    <div
                      className={`font-bold text-[15px] ${w.done ? 'line-through opacity-50' : ''}`}
                    >
                      {t(`dailyPlan.workouts.${w.id}.name`)}
                    </div>
                    <div className="text-ink-faint text-[13px] mt-[3px]">
                      {t(`dailyPlan.workouts.${w.id}.detail`)}
                    </div>
                  </div>
                  <div
                    className={`w-[22px] h-[22px] rounded-md border-2 shrink-0 ${
                      w.done ? 'border-primary bg-primary' : 'border-white/30 bg-transparent'
                    }`}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-0.5">
              {plan.meals.map((m) => (
                <div
                  key={m.id}
                  className="flex justify-between items-center px-1 py-3 border-b border-white/[.06] gap-3"
                >
                  <CoverImage src={m.image} className="w-11 h-11 rounded-[10px] shrink-0" />
                  <div className="flex-1">
                    <div className="font-bold text-[15px]">{t(`dailyPlan.meals.${m.id}.name`)}</div>
                    <div className="text-ink-faint text-[13px] mt-[3px]">
                      {t(`dailyPlan.meals.${m.id}.detail`)}
                    </div>
                  </div>
                  <div className="font-extrabold text-primary text-sm shrink-0">
                    {t(`dailyPlan.meals.${m.id}.kcal`)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-[18px] pt-4 border-t border-line flex items-start gap-3">
            <div className="w-[34px] h-[34px] rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] shrink-0 flex items-center justify-center font-display text-[13px] text-primary">
              {t('dailyPlan.coachInitials')}
            </div>
            <div className="bg-[#161616] rounded-[14px_14px_14px_4px] px-3.5 py-3 flex-1">
              <div className="text-[13.5px] text-ink leading-normal mb-2">
                {t('dailyPlan.coachMessage')}
              </div>
              <div className="flex gap-2">
                <AttachmentPill label={t('dailyPlan.attachmentPlan')} />
                <AttachmentPill label={t('dailyPlan.attachmentVideo')} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function AttachmentPill({ label }: { label: string }) {
  return (
    <span className="flex items-center gap-[5px] bg-black border border-white/[.12] rounded-lg px-2.5 py-1.5 text-[11.5px] font-bold text-ink-soft">
      {label}
    </span>
  );
}
