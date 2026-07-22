'use client';

import { useI18n } from '@/core/i18n';
import type { SpecialtyFilter } from '@/domain/entities';
import { Chip, CoverImage, Eyebrow, SectionTitle } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

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
    <section id="trainers" className="px-[5vw] pt-[110px] pb-[90px]">
      <div className="flex justify-between items-end mb-11 gap-5 flex-wrap">
        <div className="max-w-[600px]">
          <Eyebrow>{t('trainers.eyebrow')}</Eyebrow>
          <SectionTitle size="lg">{t('trainers.title')}</SectionTitle>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <Chip key={f.id} active={vm.filter === f.id} onClick={() => vm.setFilter(f.id)}>
              {t(f.key)}
            </Chip>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(270px,1fr))] gap-[22px]">
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
              className="h-[180px] contrast-[1.05]"
            />
            <div className="p-5">
              <div className="flex justify-between items-baseline mb-1.5">
                <div className="font-extrabold text-[17px]">{trainer.name}</div>
                <div className="text-[13px] text-primary font-bold">
                  {t('trainers.ratingPrefix')} {trainer.rating.toFixed(1)}
                </div>
              </div>
              <div className="text-ink-muted text-[13.5px] mb-4">
                {t(`trainers.profiles.${trainer.id}.tag`)}
              </div>
              <button
                type="button"
                className="btn-card p-[11px] font-bold text-[13.5px]"
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
