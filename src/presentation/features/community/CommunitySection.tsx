import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';
import { Eyebrow, ProgressBar, SectionTitle } from '../../components/ui';

export function CommunitySection() {
  const { t, locale } = useI18n();
  const challenges = container.catalogRepository.getChallenges();
  const numberFormat = new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-US');

  return (
    <section
      id="community"
      style={{
        padding: '90px 5vw',
        background: 'var(--surface-alt)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div style={{ maxWidth: 640, margin: '0 auto 44px', textAlign: 'center' }}>
        <Eyebrow>{t('community.eyebrow')}</Eyebrow>
        <SectionTitle size="sm">{t('community.title')}</SectionTitle>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20,
          maxWidth: 1000,
          margin: '0 auto',
        }}
      >
        {challenges.map((c) => (
          <div
            key={c.id}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 16,
              padding: 26,
            }}
          >
            <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>
              {t(`community.challenges.${c.id}`)}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 14 }}>
              {t('community.lockedIn', { count: numberFormat.format(c.participants) })}
            </div>
            <ProgressBar percent={c.progressPct} />
          </div>
        ))}
      </div>
    </section>
  );
}
