import { useI18n } from '../../../core/i18n';
import type { SpecialtyFilter } from '../../../domain/entities';
import { Chip, CoverImage, Eyebrow, SectionTitle } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

const filters: { id: SpecialtyFilter; key: string }[] = [
  { id: 'all', key: 'trainers.specialties.all' },
  { id: 'calisthenics', key: 'trainers.specialties.calisthenics' },
  { id: 'fatLoss', key: 'trainers.specialties.fatLoss' },
  { id: 'strength', key: 'trainers.specialties.strength' },
];

export function TrainersSection() {
  const { t } = useI18n();
  const vm = useAppVM();

  return (
    <section id="trainers" style={{ padding: '110px 5vw 90px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 44,
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ maxWidth: 600 }}>
          <Eyebrow>{t('trainers.eyebrow')}</Eyebrow>
          <SectionTitle size="lg">{t('trainers.title')}</SectionTitle>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {filters.map((f) => (
            <Chip key={f.id} active={vm.filter === f.id} onClick={() => vm.setFilter(f.id)}>
              {t(f.key)}
            </Chip>
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 22,
        }}
      >
        {vm.visibleTrainers.map((trainer) => (
          <div
            key={trainer.id}
            className="trainer-card"
            onClick={() => vm.openProfile(trainer.id)}
            data-testid={`trainer-card-${trainer.id}`}
          >
            <CoverImage
              src={trainer.photo}
              position={trainer.photoPos}
              style={{ height: 180, filter: 'contrast(1.05)' }}
            />
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginBottom: 6,
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 17 }}>{trainer.name}</div>
                <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 700 }}>
                  {t('trainers.ratingPrefix')} {trainer.rating.toFixed(1)}
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 16 }}>
                {t(`trainers.profiles.${trainer.id}.tag`)}
              </div>
              <button
                type="button"
                className="btn btn--card"
                style={{ padding: 11, fontWeight: 700, fontSize: '13.5px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  vm.openProfile(trainer.id);
                }}
              >
                {t('trainers.viewProfile')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
