'use client';

import { useI18n } from '@/core/i18n';
import { images } from '@/data/images';
import { Button } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

export function FinalCta() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section className="relative px-[5vw] py-[140px] text-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images.posterWordWhite}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-[center_20%] contrast-[1.05]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,rgba(10,10,10,.75)_40%,rgba(10,10,10,.75)_60%,#0a0a0a_100%)]" />
      <div className="relative z-[2] max-w-[640px] mx-auto">
        <h2 className="font-display uppercase text-[clamp(36px,6vw,64px)] leading-none mb-[22px]">
          {t('finalCta.title')}
        </h2>
        <p className="text-ink-soft text-[16.5px] mb-8">{t('finalCta.subtitle')}</p>
        <Button
          variant="primary"
          className="px-[38px] py-[18px] text-base"
          onClick={vm.scrollToPricing}
        >
          {t('finalCta.cta')}
        </Button>
      </div>
    </section>
  );
}
