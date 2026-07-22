'use client';

import { useI18n } from '@/core/i18n';
import { images } from '@/data/images';
import { Button } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

const links = [
  { href: '#trainers', key: 'nav.trainers' },
  { href: '#plans', key: 'nav.plans' },
  { href: '#transform', key: 'nav.transformations' },
  { href: '#community', key: 'nav.community' },
  { href: '#offers', key: 'nav.offers' },
  { href: '#pricing', key: 'nav.pricing' },
];

export function Navbar() {
  const { t, toggleLocale } = useI18n();
  const vm = useAppVM();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-[5vw] py-4 bg-surface/85 backdrop-blur-[10px] border-b border-line flex-wrap gap-y-3">
      <div className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images.wordmark}
          alt={t('nav.logoAlt')}
          className="h-7 w-auto mix-blend-screen"
        />
      </div>

      {vm.isMobile ? (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={toggleLocale}>
            {t('common.languageToggle')}
          </Button>
          <Button variant="ghost" size="sm" onClick={vm.toggleMenu}>
            {vm.menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          </Button>
        </div>
      ) : (
        <>
          <div className="flex gap-6 items-center flex-nowrap whitespace-nowrap">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="navlink">
                {t(l.key)}
              </a>
            ))}
          </div>
          <div className="flex gap-2.5 items-center">
            <Button variant="ghost" size="sm" onClick={toggleLocale}>
              {t('common.languageToggle')}
            </Button>
            <Button variant="primary" onClick={vm.scrollToPricing} className="whitespace-nowrap">
              {t('nav.startFree')}
            </Button>
          </div>
        </>
      )}

      {vm.isMobile && vm.menuOpen && (
        <div className="w-full flex flex-col gap-0.5 border-t border-line pt-3.5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="navlink text-[15px] px-1 py-2.5"
              onClick={vm.closeMenu}
            >
              {t(l.key)}
            </a>
          ))}
          <Button
            variant="primary"
            className="mt-2 px-[22px] py-[13px]"
            onClick={() => {
              vm.closeMenu();
              vm.scrollToPricing();
            }}
          >
            {t('nav.startFree')}
          </Button>
        </div>
      )}
    </nav>
  );
}
