import { useI18n } from '../../../core/i18n';
import { images } from '../../../data/images';
import { Button } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function FinalCta() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section
      style={{
        position: 'relative',
        padding: '140px 5vw',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src={images.posterWordWhite}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 20%',
          filter: 'contrast(1.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,.75) 40%, rgba(10,10,10,.75) 60%, #0a0a0a 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 640, margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', margin: '0 0 22px', lineHeight: 1 }}>
          {t('finalCta.title')}
        </h2>
        <p style={{ color: 'var(--text-soft)', fontSize: '16.5px', margin: '0 0 32px' }}>
          {t('finalCta.subtitle')}
        </p>
        <Button
          variant="primary"
          onClick={vm.scrollToPricing}
          style={{ padding: '18px 38px', fontSize: 16 }}
        >
          {t('finalCta.cta')}
        </Button>
      </div>
    </section>
  );
}
