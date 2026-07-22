'use client';

import { useI18n } from '@/core/i18n';
import { Eyebrow, SectionTitle } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';
import { useGetCatalogQuery } from '@/store/apiSlice';

export function PricingSection() {
  const { t, tList } = useI18n();
  const vm = useAppVM();
  const { data } = useGetCatalogQuery();
  const plans = data?.plans ?? [];

  return (
    <section id="pricing" className="px-[5vw] py-[110px]">
      <div className="max-w-[640px] mx-auto mb-14 text-center">
        <Eyebrow>{t('pricing.eyebrow')}</Eyebrow>
        <SectionTitle size="lg">{t('pricing.title')}</SectionTitle>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px] max-w-[1080px] mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            data-testid={`plan-${plan.id}`}
            className={`relative rounded-[20px] px-7 py-8 overflow-hidden ${
              plan.highlighted
                ? 'bg-[#141400] border border-primary shadow-[0_20px_60px_rgba(232,255,92,.08)]'
                : 'bg-surface-alt border border-white/10'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute -top-px end-6 bg-primary text-surface font-extrabold text-[11.5px] tracking-[.5px] px-3.5 py-1.5 rounded-b-[10px]">
                {t('pricing.mostPopular')}
              </div>
            )}
            <div className="font-extrabold text-[19px] mb-1.5">
              {t(`pricing.plans.${plan.id}.name`)}
            </div>
            <div className="text-ink-muted text-[13.5px] mb-[22px]">
              {t(`pricing.plans.${plan.id}.tagline`)}
            </div>
            <div className="flex items-baseline gap-1.5 mb-[26px]">
              <span className="font-display text-[42px]">
                {t(`pricing.plans.${plan.id}.price`)}
              </span>
              <span className="text-ink-muted text-sm">{t('common.perMonth')}</span>
            </div>
            <div className="flex flex-col gap-3 mb-7">
              {tList(`pricing.plans.${plan.id}.perks`).map((perk) => (
                <div key={perk} className="flex items-start gap-2.5 text-sm text-[#d5d5d0]">
                  <span className="text-primary shrink-0">✓</span>
                  {perk}
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`${plan.highlighted ? 'btn-card-solid' : 'btn-card'} p-[13px] text-[14.5px]`}
              onClick={plan.requiresAuth ? vm.openLogin : vm.scrollToPricing}
            >
              {t(`pricing.plans.${plan.id}.cta`)}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
