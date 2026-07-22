import { useI18n } from '../../../core/i18n';
import { Button, CoverImage, Modal } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function TrainerProfileModal() {
  const { t } = useI18n();
  const vm = useAppVM();
  const trainer = vm.selectedTrainer;
  if (!trainer) return null;

  return (
    <Modal onClose={vm.closeProfile} maxWidth={720} align="top" zIndex={100} panelStyle={{ borderRadius: 22, marginBottom: '5vh' }}>
      <div style={{ position: 'relative', height: 220 }}>
        <CoverImage
          src={trainer.photo}
          position={trainer.photoPos}
          style={{ position: 'absolute', inset: 0, filter: 'contrast(1.05)' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(0,0,0,.1), rgba(17,17,17,1))',
          }}
        />
        <button
          type="button"
          onClick={vm.closeProfile}
          aria-label={t('trainerProfile.closeLabel')}
          style={{
            position: 'absolute',
            top: 16,
            insetInlineEnd: 16,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(0,0,0,.5)',
            border: '1px solid rgba(255,255,255,.25)',
            color: '#fff',
            fontSize: 16,
            cursor: 'pointer',
          }}
        >
          ✕
        </button>
        <div style={{ position: 'absolute', bottom: 16, insetInlineStart: 24 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, textTransform: 'uppercase' }}>
            {trainer.name}
          </div>
          <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '13.5px' }}>
            {t(`trainers.profiles.${trainer.id}.tag`)} · {t('trainers.ratingPrefix')}{' '}
            {trainer.rating.toFixed(1)}
          </div>
        </div>
      </div>
      <div style={{ padding: 28 }}>
        <SectionLabel text={t('trainerProfile.certificates')} />
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 26 }}>
          {trainer.certs.map((c) => (
            <div
              key={c}
              style={{
                background: '#181818',
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 10,
                padding: '10px 14px',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              🏅 {c}
            </div>
          ))}
        </div>
        <SectionLabel text={t('trainerProfile.transformations')} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
            marginBottom: 26,
          }}
        >
          {trainer.transformations.map((tr) => (
            <CoverImage
              key={tr.label}
              src={tr.image}
              style={{
                borderRadius: 12,
                overflow: 'hidden',
                height: 130,
                position: 'relative',
                filter: 'contrast(1.05)',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(0deg, rgba(0,0,0,.75), transparent)',
                  padding: 8,
                  fontSize: 12,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {tr.label}
              </div>
            </CoverImage>
          ))}
        </div>
        <SectionLabel text={t('trainerProfile.formCheckVideos')} />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 12,
            marginBottom: 28,
          }}
        >
          {trainer.videos.map((v) => (
            <div
              key={v}
              style={{
                borderRadius: 12,
                background: '#181818',
                border: '1px solid rgba(255,255,255,.1)',
                height: 90,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                fontSize: 13,
                fontWeight: 700,
                color: '#d5d5d0',
                padding: '0 10px',
                textAlign: 'center',
              }}
            >
              ▶ {v}
            </div>
          ))}
        </div>
        <Button
          variant="cardSolid"
          onClick={vm.closeProfile}
          style={{ padding: 15, borderRadius: 12, fontSize: 15 }}
        >
          {t('trainerProfile.bookIntro', { name: trainer.name })}
        </Button>
      </div>
    </Modal>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div
      style={{
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: 1,
        color: 'var(--text-muted)',
        marginBottom: 10,
      }}
    >
      {text}
    </div>
  );
}
