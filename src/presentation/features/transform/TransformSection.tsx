import { useI18n } from '../../../core/i18n';
import { images } from '../../../data/images';
import { Eyebrow, SectionTitle, StatInline } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function TransformSection() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section
      id="transform"
      style={{
        position: 'relative',
        padding: '110px 5vw',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 44,
        alignItems: 'center',
        background: 'var(--surface)',
        borderTop: '1px solid var(--line)',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 24,
          overflow: 'hidden',
          height: 'min(520px, 70vw)',
        }}
      >
        <img
          src={images.posterMarkWhite}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 25%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,.6), transparent 40%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 18,
            insetInlineStart: 18,
            background: 'rgba(0,0,0,.6)',
            backdropFilter: 'blur(6px)',
            border: '1px solid var(--primary)',
            color: 'var(--primary)',
            fontWeight: 800,
            fontSize: '11.5px',
            letterSpacing: '.5px',
            padding: '7px 14px',
            borderRadius: 999,
          }}
        >
          {t('transform.featuredBadge', { name: vm.featuredTrainer.name })}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 22,
            insetInlineStart: 22,
            insetInlineEnd: 22,
            display: 'flex',
            gap: 14,
          }}
        >
          <GlassStat value={t('transform.stat1Value')} label={t('transform.stat1Label')} />
          <GlassStat value={t('transform.stat2Value')} label={t('transform.stat2Label')} />
        </div>
      </div>
      <div>
        <Eyebrow>{t('transform.eyebrow')}</Eyebrow>
        <SectionTitle style={{ margin: '12px 0 20px' }}>{t('transform.title')}</SectionTitle>
        <p
          style={{
            color: 'var(--text-soft)',
            fontSize: '16.5px',
            lineHeight: 1.65,
            maxWidth: 480,
            margin: '0 0 30px',
          }}
        >
          {t('transform.subtitle')}
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            maxWidth: 440,
          }}
        >
          <StatInline value={t('transform.stat3Value')} label={t('transform.stat3Label')} />
          <StatInline value={t('transform.stat4Value')} label={t('transform.stat4Label')} />
          <StatInline value={t('transform.stat5Value')} label={t('transform.stat5Label')} />
        </div>
      </div>
    </section>
  );
}

function GlassStat({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: 'rgba(10,10,10,.7)',
        backdropFilter: 'blur(6px)',
        border: '1px solid rgba(255,255,255,.15)',
        borderRadius: 14,
        padding: '14px 18px',
        flex: 1,
      }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--primary)' }}>
        {value}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-soft)' }}>{label}</div>
    </div>
  );
}
