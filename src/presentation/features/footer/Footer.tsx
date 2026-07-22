'use client';

import { useI18n } from '@/core/i18n';
import { images } from '@/data/images';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="px-[5vw] py-11 flex justify-between items-center flex-wrap gap-4 border-t border-line">
      <div className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.wordmark}
          alt={t('nav.logoAlt')}
          className="h-[19px] w-auto mix-blend-screen"
        />
      </div>
      <div className="text-ink-faint text-[13px]">{t('footer.copyright')}</div>
    </footer>
  );
}
