'use client';

import { useI18n } from '@/core/i18n';
import { useGetCatalogQuery } from '@/store/apiSlice';

export function FeaturesCarousel() {
  const { t } = useI18n();
  const { data } = useGetCatalogQuery();
  const features = data?.features ?? [];
  if (features.length === 0) return null;
  const loop = [...features, ...features];

  return (
    <section className="px-[5vw] pt-[110px] pb-[90px]">
      <div className="overflow-hidden">
        <div className="feature-track flex gap-[18px] w-max animate-featureScroll">
          {loop.map((f, i) => (
            <div
              key={`${f.id}-${i}`}
              className="feature-card px-7 py-8 min-h-[200px] w-[280px] shrink-0"
            >
              <div className="text-[30px] mb-[18px]">{f.icon}</div>
              <div className="font-black text-[19px] mb-2">
                {t(`features.items.${f.id}.title`)}
              </div>
              <div className="text-[#a5a59f] text-[14.5px] leading-[1.55]">
                {t(`features.items.${f.id}.desc`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
