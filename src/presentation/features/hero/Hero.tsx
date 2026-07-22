import { useI18n } from '../../../core/i18n';
import { images } from '../../../data/images';
import { Button } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function Hero() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section
      data-testid="hero"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 5vw 64px',
      }}
    >
      <img
        src={images.posterMetal}
        alt={t('hero.imageAlt')}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
          filter: 'contrast(1.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(10,10,10,.2) 0%, rgba(10,10,10,.55) 55%, #0a0a0a 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 760 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(232,255,92,.12)',
            border: '1px solid rgba(232,255,92,.4)',
            padding: '6px 14px',
            borderRadius: 999,
            marginBottom: 22,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--primary)',
              animation: 'pulse 1.6s infinite',
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--primary)',
              letterSpacing: '.4px',
            }}
          >
            {t('hero.badge')}
          </span>
        </div>
        <h1
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            lineHeight: 0.94,
            margin: '0 0 22px',
            letterSpacing: '.5px',
          }}
        >
          {t('hero.titleLine1')}
          <br />
          {t('hero.titleLine2Prefix')}{' '}
          <span style={{ color: 'var(--primary)' }}>{t('hero.titleLine2Highlight')}</span>
        </h1>
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--text-soft)',
            maxWidth: 520,
            margin: '0 0 32px',
          }}
        >
          {t('hero.subtitle')}
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" onClick={vm.scrollToPricing}>
            {t('hero.ctaPrimary')}
          </Button>
          <a
            href="#trainers"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              border: '1px solid rgba(255,255,255,.3)',
              padding: '16px 26px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              color: '#f5f5f0',
            }}
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>
        <div
          style={{
            position: 'relative',
            height: 44,
            marginTop: 34,
            overflow: 'hidden',
            width: 'fit-content',
          }}
        >
          <div
            style={{
              fontFamily: "'Brush Script MT', cursive",
              fontSize: 32,
              color: 'var(--primary)',
              whiteSpace: 'nowrap',
              clipPath: 'inset(0 100% 0 0)',
              animation: 'signReveal 1.8s ease-out .3s forwards',
            }}
          >
            {t('hero.signature')}
          </div>
        </div>
      </div>
    </section>
  );
}
