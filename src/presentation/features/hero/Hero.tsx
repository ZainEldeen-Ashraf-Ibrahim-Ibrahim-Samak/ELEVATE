'use client';

import { useI18n } from '@/core/i18n';
import { images } from '@/data/images';
import { Button } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

export function Hero() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section
      data-testid="hero"
      className="relative min-h-[92vh] flex items-end px-[5vw] pb-16"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images.posterMetal}
        alt={t('hero.imageAlt')}
        className="absolute inset-0 w-full h-full object-cover object-[center_30%] contrast-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/55 to-surface" />
      <div className="relative z-[2] max-w-[760px]">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/40 px-3.5 py-1.5 rounded-full mb-[22px]">
          <span className="w-[7px] h-[7px] rounded-full bg-primary animate-pulseDot" />
          <span className="text-xs font-bold text-primary tracking-[.4px]">
            {t('hero.badge')}
          </span>
        </div>
        <h1 className="font-display uppercase text-[clamp(48px,7vw,96px)] leading-[.94] mb-[22px] tracking-[.5px]">
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2Prefix')}{' '}
          <span className="text-primary">{t('hero.titleLine2Highlight')}</span>
        </h1>
        <p className="text-lg leading-relaxed text-ink-soft max-w-[520px] mb-8">
          {t('hero.subtitle')}
        </p>
        <div className="flex gap-3.5 flex-wrap">
          <Button variant="primary" size="lg" onClick={vm.scrollToPricing}>
            {t('hero.ctaPrimary')}
          </Button>
          <a
            href="#trainers"
            className="flex items-center gap-2.5 border border-white/30 px-[26px] py-4 rounded-full font-bold text-[15px] text-[#f5f5f0]"
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
        <div className="relative h-11 mt-[34px] overflow-hidden w-fit">
          <div
            className="text-[32px] text-primary whitespace-nowrap [clip-path:inset(0_100%_0_0)] animate-signReveal"
            style={{ fontFamily: "'Brush Script MT', cursive" }}
          >
            {t('hero.signature')}
          </div>
        </div>
      </div>
    </section>
  );
}
