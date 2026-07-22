import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';

export function FeaturesCarousel() {
  const { t } = useI18n();
  const features = container.catalogRepository.getFeatures();
  const loop = [...features, ...features];

  return (
    <section style={{ padding: '110px 5vw 90px' }}>
      <div style={{ overflow: 'hidden' }}>
        <div
          className="feature-track"
          style={{
            display: 'flex',
            gap: 18,
            width: 'max-content',
            animation: 'featureScroll 24s linear infinite',
          }}
        >
          {loop.map((f, i) => (
            <div
              key={`${f.id}-${i}`}
              className="feature-card"
              style={{ padding: '32px 28px', minHeight: 200, width: 280, flexShrink: 0 }}
            >
              <div style={{ fontSize: 30, marginBottom: 18 }}>{f.icon}</div>
              <div style={{ fontWeight: 900, fontSize: 19, marginBottom: 8 }}>
                {t(`features.items.${f.id}.title`)}
              </div>
              <div style={{ color: '#a5a59f', fontSize: '14.5px', lineHeight: 1.55 }}>
                {t(`features.items.${f.id}.desc`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
