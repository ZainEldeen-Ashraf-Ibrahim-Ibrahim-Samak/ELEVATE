import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';
import { Button, Chip, CoverImage, Eyebrow, SectionTitle } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function DailyPlanSection() {
  const { t, locale } = useI18n();
  const vm = useAppVM();
  const plan = container.dailyPlanRepository.getToday();

  const dateLabel = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  }).format(plan.date);

  return (
    <section
      id="plans"
      style={{
        padding: '90px 5vw',
        background: 'var(--surface-alt)',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 56,
        alignItems: 'center',
      }}
    >
      <div>
        <Eyebrow>{t('dailyPlan.eyebrow')}</Eyebrow>
        <SectionTitle style={{ margin: '12px 0 20px' }}>{t('dailyPlan.title')}</SectionTitle>
        <p
          style={{
            color: 'var(--text-soft)',
            fontSize: '16.5px',
            lineHeight: 1.65,
            maxWidth: 480,
            margin: '0 0 28px',
          }}
        >
          {t('dailyPlan.subtitle')}
        </p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <Chip size="lg" active={vm.planTab === 'training'} onClick={() => vm.setPlanTab('training')}>
            {t('dailyPlan.tabTraining')}
          </Chip>
          <Chip size="lg" active={vm.planTab === 'diet'} onClick={() => vm.setPlanTab('diet')}>
            {t('dailyPlan.tabDiet')}
          </Chip>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 14,
            color: 'var(--text-muted)',
            fontSize: 13,
          }}
        >
          <span
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }}
          />
          {t('dailyPlan.encryptedNote')}
        </div>
        <Button
          variant="primary"
          onClick={() => vm.openChat(vm.featuredTrainer.name)}
          style={{ padding: '15px 28px', fontSize: '14.5px' }}
        >
          {t('dailyPlan.openChat')}
        </Button>
      </div>

      <div
        style={{
          background: 'var(--secondary)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 24,
          padding: 26,
          boxShadow: '0 30px 80px rgba(0,0,0,.5)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 22,
          }}
        >
          <div style={{ fontWeight: 800, fontSize: 15 }}>
            {t('dailyPlan.today', { date: dateLabel })}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: `conic-gradient(var(--primary) ${plan.completionPct}%, #2a2a2a 0)`,
              }}
            />
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              {t('dailyPlan.percentDone', { percent: plan.completionPct })}
            </span>
          </div>
        </div>

        {vm.planTab === 'training' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {plan.workouts.map((w) => (
              <div
                key={w.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 4px',
                  borderBottom: '1px solid rgba(255,255,255,.06)',
                  gap: 12,
                }}
              >
                <CoverImage
                  src={w.image}
                  style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      textDecoration: w.done ? 'line-through' : 'none',
                      opacity: w.done ? 0.5 : 1,
                    }}
                  >
                    {t(`dailyPlan.workouts.${w.id}.name`)}
                  </div>
                  <div style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 3 }}>
                    {t(`dailyPlan.workouts.${w.id}.detail`)}
                  </div>
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    border: `2px solid ${w.done ? 'var(--primary)' : 'rgba(255,255,255,.3)'}`,
                    background: w.done ? 'var(--primary)' : 'transparent',
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {plan.meals.map((m) => (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 4px',
                  borderBottom: '1px solid rgba(255,255,255,.06)',
                  gap: 12,
                }}
              >
                <CoverImage
                  src={m.image}
                  style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>
                    {t(`dailyPlan.meals.${m.id}.name`)}
                  </div>
                  <div style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 3 }}>
                    {t(`dailyPlan.meals.${m.id}.detail`)}
                  </div>
                </div>
                <div
                  style={{
                    fontWeight: 800,
                    color: 'var(--primary)',
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {t(`dailyPlan.meals.${m.id}.kcal`)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            marginTop: 18,
            paddingTop: 16,
            borderTop: '1px solid var(--line)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 12,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
              flexShrink: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              color: 'var(--primary)',
            }}
          >
            {t('dailyPlan.coachInitials')}
          </div>
          <div
            style={{
              background: '#161616',
              borderRadius: '14px 14px 14px 4px',
              padding: '12px 14px',
              flex: 1,
            }}
          >
            <div
              style={{ fontSize: '13.5px', color: '#e8e8e2', lineHeight: 1.5, marginBottom: 8 }}
            >
              {t('dailyPlan.coachMessage')}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <AttachmentPill label={t('dailyPlan.attachmentPlan')} />
              <AttachmentPill label={t('dailyPlan.attachmentVideo')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AttachmentPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        background: 'var(--secondary)',
        border: '1px solid rgba(255,255,255,.12)',
        borderRadius: 8,
        padding: '6px 10px',
        fontSize: '11.5px',
        fontWeight: 700,
        color: 'var(--text-soft)',
      }}
    >
      {label}
    </span>
  );
}
