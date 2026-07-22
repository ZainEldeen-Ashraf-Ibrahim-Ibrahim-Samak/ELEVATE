import { useI18n } from '../../../core/i18n';
import { images } from '../../../data/images';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer
      style={{
        padding: '44px 5vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        borderTop: '1px solid var(--line)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img
          src={images.wordmark}
          alt={t('nav.logoAlt')}
          style={{ height: 19, width: 'auto', mixBlendMode: 'screen' }}
        />
      </div>
      <div style={{ color: 'var(--text-faint)', fontSize: 13 }}>{t('footer.copyright')}</div>
    </footer>
  );
}
