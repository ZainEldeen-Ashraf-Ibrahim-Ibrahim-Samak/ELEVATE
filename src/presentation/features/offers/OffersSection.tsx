'use client';

import { useI18n } from '@/core/i18n';
import { Button, CoverImage, Eyebrow, SectionTitle } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';
import { useGetCatalogQuery } from '@/store/apiSlice';

export function OffersSection() {
  const { t, dir } = useI18n();
  const vm = useAppVM();
  const { data } = useGetCatalogQuery();
  const offers = data?.offers ?? [];
  if (offers.length === 0) return null;

  return (
    <section id="offers" className="px-[5vw] pt-[90px] pb-[100px]">
      <div className="flex justify-between items-end mb-9 gap-5 flex-wrap">
        <div>
          <Eyebrow>{t('offers.eyebrow')}</Eyebrow>
          <SectionTitle size="sm">{t('offers.title')}</SectionTitle>
        </div>
        <div className="flex gap-2.5">
          <Button variant="icon" aria-label={t('offers.prevLabel')} onClick={vm.prevOffer}>
            {dir === 'rtl' ? '→' : '←'}
          </Button>
          <Button variant="icon" aria-label={t('offers.nextLabel')} onClick={vm.nextOffer}>
            {dir === 'rtl' ? '←' : '→'}
          </Button>
        </div>
      </div>
      {/* Slider math stays LTR regardless of locale */}
      <div className="overflow-hidden rounded-[20px]" dir="ltr">
        <div
          className="flex transition-transform duration-[450ms] ease-[cubic-bezier(.65,0,.35,1)]"
          style={{ transform: `translateX(-${vm.offerIndex * 100}%)` }}
        >
          {offers.map((o) => (
            <div key={o.id} className="relative flex-[0_0_100%] min-h-[280px] overflow-hidden">
              <CoverImage
                src={o.image}
                position={o.imagePos}
                className="absolute inset-0 contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface/90 via-surface/55 to-surface/25" />
              <div
                dir={dir}
                className="relative z-[2] px-[5vw] py-11 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6 items-center min-h-[280px]"
              >
                <div>
                  <div className="inline-block bg-black/35 text-primary font-extrabold text-xs tracking-[.5px] px-3 py-1.5 rounded-full mb-4">
                    {t(`offers.items.${o.id}.tag`)}
                  </div>
                  <div className="font-display text-[clamp(26px,3.2vw,38px)] text-primary leading-[1.05] mb-2.5 uppercase">
                    {t(`offers.items.${o.id}.title`)}
                  </div>
                  <div className="text-[15px] text-[#d5d5d0] max-w-[420px]">
                    {t(`offers.items.${o.id}.desc`)}
                  </div>
                </div>
                <div className="justify-self-center text-center">
                  <div className="font-display text-[56px] text-primary">
                    {t(`offers.items.${o.id}.badge`)}
                  </div>
                  <Button
                    variant="primary"
                    className="mt-2.5 px-[26px] py-[13px]"
                    onClick={vm.scrollToPricing}
                  >
                    {t(`offers.items.${o.id}.cta`)}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-5">
        {offers.map((o, i) => (
          <button
            key={o.id}
            type="button"
            aria-label={t('offers.goToLabel', { index: i + 1 })}
            onClick={() => vm.goToOffer(i)}
            className={`h-[9px] rounded-full border-0 cursor-pointer transition-all ${
              i === vm.offerIndex ? 'w-[26px] bg-primary' : 'w-[9px] bg-white/25'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
