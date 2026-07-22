'use client';

import { useI18n } from '@/core/i18n';
import { Button, CoverImage, Modal } from '@/presentation/components/ui';
import { useAppVM } from '@/presentation/viewmodels/AppViewModelContext';

export function TrainerProfileModal() {
  const { t } = useI18n();
  const vm = useAppVM();
  const trainer = vm.selectedTrainer;
  if (!trainer) return null;

  return (
    <Modal
      onClose={vm.closeProfile}
      maxWidth={720}
      align="top"
      zIndex={100}
      panelClassName="rounded-[22px] mb-[5vh]"
    >
      <div className="relative h-[220px]">
        <CoverImage
          src={trainer.photo}
          position={trainer.photoPos}
          className="absolute inset-0 contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-surface-alt" />
        <button
          type="button"
          onClick={vm.closeProfile}
          aria-label={t('trainerProfile.closeLabel')}
          className="absolute top-4 end-4 w-9 h-9 rounded-full bg-black/50 border border-white/25 text-white text-base cursor-pointer"
        >
          ✕
        </button>
        <div className="absolute bottom-4 start-6">
          <div className="font-display text-[30px] uppercase">{trainer.name}</div>
          <div className="text-primary font-bold text-[13.5px]">
            {t(`trainers.profiles.${trainer.id}.tag`)} · {t('trainers.ratingPrefix')}{' '}
            {trainer.rating.toFixed(1)}
          </div>
        </div>
      </div>
      <div className="p-7">
        <SectionLabel text={t('trainerProfile.certificates')} />
        <div className="flex gap-2.5 flex-wrap mb-[26px]">
          {trainer.certs.map((c) => (
            <div
              key={c}
              className="bg-[#181818] border border-white/[.12] rounded-[10px] px-3.5 py-2.5 text-[13px] font-semibold"
            >
              🏅 {c}
            </div>
          ))}
        </div>
        <SectionLabel text={t('trainerProfile.transformations')} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-[26px]">
          {trainer.transformations.map((tr) => (
            <CoverImage
              key={tr.label}
              src={tr.image}
              className="rounded-xl overflow-hidden h-[130px] relative contrast-[1.05]"
            >
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-2 text-xs font-bold text-white">
                {tr.label}
              </div>
            </CoverImage>
          ))}
        </div>
        <SectionLabel text={t('trainerProfile.formCheckVideos')} />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3 mb-7">
          {trainer.videos.map((v) => (
            <div
              key={v}
              className="rounded-xl bg-[#181818] border border-white/10 h-[90px] flex items-center justify-center gap-2 text-[13px] font-bold text-[#d5d5d0] px-2.5 text-center"
            >
              ▶ {v}
            </div>
          ))}
        </div>
        <Button
          variant="cardSolid"
          className="p-[15px] rounded-xl text-[15px]"
          onClick={vm.closeProfile}
        >
          {t('trainerProfile.bookIntro', { name: trainer.name })}
        </Button>
      </div>
    </Modal>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="font-extrabold text-[13px] tracking-[1px] text-ink-muted mb-2.5">{text}</div>
  );
}
