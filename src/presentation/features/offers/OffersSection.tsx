import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';
import { Button, CoverImage, Eyebrow, SectionTitle } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function OffersSection() {
  const { t, dir } = useI18n();
  const vm = useAppVM();
  const offers = container.catalogRepository.getOffers();

  return (
    <section id="offers" style={{ padding: '90px 5vw 100px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 36,
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div>
          <Eyebrow>{t('offers.eyebrow')}</Eyebrow>
          <SectionTitle size="sm">{t('offers.title')}</SectionTitle>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <Button variant="icon" aria-label={t('offers.prevLabel')} onClick={vm.prevOffer}>
            {dir === 'rtl' ? '→' : '←'}
          </Button>
          <Button variant="icon" aria-label={t('offers.nextLabel')} onClick={vm.nextOffer}>
            {dir === 'rtl' ? '←' : '→'}
          </Button>
        </div>
      </div>
      {/* Slider math stays LTR regardless of locale */}
      <div style={{ overflow: 'hidden', borderRadius: 20, direction: 'ltr' }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform .45s cubic-bezier(.65,0,.35,1)',
            transform: `translateX(-${vm.offerIndex * 100}%)`,
          }}
        >
          {offers.map((o) => (
            <div
              key={o.id}
              style={{
                position: 'relative',
                flex: '0 0 100%',
                minHeight: 280,
                boxSizing: 'border-box',
                overflow: 'hidden',
              }}
            >
              <CoverImage
                src={o.image}
                position={o.imagePos}
                style={{ position: 'absolute', inset: 0, filter: 'contrast(1.05)' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(90deg, rgba(10,10,10,.88) 0%, rgba(10,10,10,.55) 55%, rgba(10,10,10,.25) 100%)',
                }}
              />
              <div
                dir={dir}
                style={{
                  position: 'relative',
                  zIndex: 2,
                  padding: '44px 5vw',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: 24,
                  alignItems: 'center',
                  minHeight: 280,
                  boxSizing: 'border-box',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      background: 'rgba(0,0,0,.35)',
                      color: 'var(--primary)',
                      fontWeight: 800,
                      fontSize: 12,
                      letterSpacing: '.5px',
                      padding: '6px 12px',
                      borderRadius: 999,
                      marginBottom: 16,
                    }}
                  >
                    {t(`offers.items.${o.id}.tag`)}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(26px, 3.2vw, 38px)',
                      color: 'var(--primary)',
                      lineHeight: 1.05,
                      marginBottom: 10,
                      textTransform: 'uppercase',
                    }}
                  >
                    {t(`offers.items.${o.id}.title`)}
                  </div>
                  <div style={{ fontSize: 15, color: '#d5d5d0', maxWidth: 420 }}>
                    {t(`offers.items.${o.id}.desc`)}
                  </div>
                </div>
                <div style={{ justifySelf: 'center', textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 56,
                      color: 'var(--primary)',
                    }}
                  >
                    {t(`offers.items.${o.id}.badge`)}
                  </div>
                  <Button
                    variant="primary"
                    onClick={vm.scrollToPricing}
                    style={{ marginTop: 10, padding: '13px 26px' }}
                  >
                    {t(`offers.items.${o.id}.cta`)}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        {offers.map((o, i) => (
          <button
            key={o.id}
            type="button"
            aria-label={t('offers.goToLabel', { index: i + 1 })}
            onClick={() => vm.goToOffer(i)}
            style={{
              width: i === vm.offerIndex ? 26 : 9,
              height: 9,
              borderRadius: 999,
              border: 'none',
              background: i === vm.offerIndex ? 'var(--primary)' : 'rgba(255,255,255,.25)',
              cursor: 'pointer',
              transition: 'width .3s',
            }}
          />
        ))}
      </div>
    </section>
  );
}
