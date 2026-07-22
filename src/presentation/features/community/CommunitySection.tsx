'use client';

import { useI18n } from '@/core/i18n';
import { Eyebrow, ProgressBar, SectionTitle } from '@/presentation/components/ui';
import { useGetCatalogQuery } from '@/store/apiSlice';

export function CommunitySection() {
  const { t, locale } = useI18n();
  const { data } = useGetCatalogQuery();
  const challenges = data?.challenges ?? [];
  const numberFormat = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');

  return (
    <section id="community" className="px-[5vw] py-[90px] bg-surface-alt border-y border-line">
      <div className="max-w-[640px] mx-auto mb-11 text-center">
        <Eyebrow>{t('community.eyebrow')}</Eyebrow>
        <SectionTitle size="sm">{t('community.title')}</SectionTitle>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5 max-w-[1000px] mx-auto">
        {challenges.map((c) => (
          <div key={c.id} className="bg-surface border border-line rounded-2xl p-[26px]">
            <div className="font-extrabold text-base mb-1.5">
              {t(`community.challenges.${c.id}`)}
            </div>
            <div className="text-ink-muted text-[13.5px] mb-3.5">
              {t('community.lockedIn', { count: numberFormat.format(c.participants) })}
            </div>
            <ProgressBar percent={c.progressPct} />
          </div>
        ))}
      </div>
    </section>
  );
}
