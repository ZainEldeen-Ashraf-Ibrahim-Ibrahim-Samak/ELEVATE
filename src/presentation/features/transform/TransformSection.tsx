'use client';

import { useI18n } from '@/core/i18n';
import { images } from '@/data/images';
import { Eyebrow, SectionTitle, StatInline } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

export function TransformSection() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section
      id="transform"
      className="relative px-[5vw] py-[110px] grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-11 items-center bg-surface border-t border-line"
    >
      <div className="relative rounded-3xl overflow-hidden h-[min(520px,70vw)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.posterMarkWhite}
          alt=""
          className="w-full h-full object-cover object-[center_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent to-40%" />
        {vm.featuredTrainer && (
          <div className="absolute top-[18px] start-[18px] bg-black/60 backdrop-blur-md border border-primary text-primary font-extrabold text-[11.5px] tracking-[.5px] px-3.5 py-[7px] rounded-full">
            {t('transform.featuredBadge', { name: vm.featuredTrainer.name })}
          </div>
        )}
        <div className="absolute bottom-[22px] start-[22px] end-[22px] flex gap-3.5">
          <GlassStat value={t('transform.stat1Value')} label={t('transform.stat1Label')} />
          <GlassStat value={t('transform.stat2Value')} label={t('transform.stat2Label')} />
        </div>
      </div>
      <div>
        <Eyebrow>{t('transform.eyebrow')}</Eyebrow>
        <SectionTitle className="mt-3 mb-5">{t('transform.title')}</SectionTitle>
        <p className="text-ink-soft text-[16.5px] leading-[1.65] max-w-[480px] mb-[30px]">
          {t('transform.subtitle')}
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-[440px]">
          <StatInline value={t('transform.stat3Value')} label={t('transform.stat3Label')} />
          <StatInline value={t('transform.stat4Value')} label={t('transform.stat4Label')} />
          <StatInline value={t('transform.stat5Value')} label={t('transform.stat5Label')} />
        </div>
      </div>
    </section>
  );
}

function GlassStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-surface/70 backdrop-blur-md border border-white/[.15] rounded-[14px] px-[18px] py-3.5 flex-1">
      <div className="font-display text-[26px] text-primary">{value}</div>
      <div className="text-xs text-ink-soft">{label}</div>
    </div>
  );
}
