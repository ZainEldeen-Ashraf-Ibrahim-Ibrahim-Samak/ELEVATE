import { useI18n } from '../../../core/i18n';
import { images } from '../../../data/images';
import { Button } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

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
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 5vw',
        background: 'rgba(10,10,10,.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)',
        flexWrap: 'wrap',
        rowGap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={images.wordmark}
          alt={t('nav.logoAlt')}
          style={{ height: 28, width: 'auto', mixBlendMode: 'screen' }}
        />
      </div>

      {vm.isMobile ? (
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" size="sm" onClick={toggleLocale}>
            {t('common.languageToggle')}
          </Button>
          <Button variant="ghost" size="sm" onClick={vm.toggleMenu}>
            {vm.menuOpen ? t('nav.menuClose') : t('nav.menuOpen')}
          </Button>
        </div>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              gap: 24,
              alignItems: 'center',
              flexWrap: 'nowrap',
              whiteSpace: 'nowrap',
            }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className="navlink">
                {t(l.key)}
              </a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Button variant="ghost" size="sm" onClick={toggleLocale}>
              {t('common.languageToggle')}
            </Button>
            <Button variant="primary" onClick={vm.scrollToPricing} style={{ whiteSpace: 'nowrap' }}>
              {t('nav.startFree')}
            </Button>
          </div>
        </>
      )}

      {vm.isMobile && vm.menuOpen && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderTop: '1px solid var(--line)',
            paddingTop: 14,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="navlink"
              onClick={vm.closeMenu}
              style={{ fontSize: 15, padding: '10px 4px' }}
            >
              {t(l.key)}
            </a>
          ))}
          <Button
            variant="primary"
            onClick={() => {
              vm.closeMenu();
              vm.scrollToPricing();
            }}
            style={{ marginTop: 8, padding: '13px 22px' }}
          >
            {t('nav.startFree')}
          </Button>
        </div>
      )}
    </nav>
  );
}
