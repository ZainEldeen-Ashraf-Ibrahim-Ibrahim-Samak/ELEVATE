import { useI18n } from '../../../core/i18n';
import { container } from '../../../app/container';
import { Eyebrow, SectionTitle } from '../../components/ui';
import { useAppVM } from '../../viewmodels/AppViewModelContext';

export function PricingSection() {
  const { t, tList } = useI18n();
  const vm = useAppVM();
  const plans = container.catalogRepository.getPlans();

  return (
    <section id="pricing" style={{ padding: '110px 5vw' }}>
      <div style={{ maxWidth: 640, margin: '0 auto 56px', textAlign: 'center' }}>
        <Eyebrow>{t('pricing.eyebrow')}</Eyebrow>
        <SectionTitle size="lg">{t('pricing.title')}</SectionTitle>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 22,
          maxWidth: 1080,
          margin: '0 auto',
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            data-testid={`plan-${plan.id}`}
            style={{
              position: 'relative',
              background: plan.highlighted ? '#141400' : 'var(--surface-alt)',
              border: plan.highlighted ? '1px solid var(--primary)' : '1px solid rgba(255,255,255,.1)',
              borderRadius: 20,
              padding: '32px 28px',
              overflow: 'hidden',
              boxShadow: plan.highlighted ? '0 20px 60px rgba(232,255,92,.08)' : undefined,
            }}
          >
            {plan.highlighted && (
              <div
                style={{
                  position: 'absolute',
                  top: -1,
                  insetInlineEnd: 24,
                  background: 'var(--primary)',
                  color: 'var(--surface)',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  letterSpacing: '.5px',
                  padding: '6px 14px',
                  borderRadius: '0 0 10px 10px',
                }}
              >
                {t('pricing.mostPopular')}
              </div>
            )}
            <div style={{ fontWeight: 800, fontSize: 19, marginBottom: 6 }}>
              {t(`pricing.plans.${plan.id}.name`)}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '13.5px', marginBottom: 22 }}>
              {t(`pricing.plans.${plan.id}.tagline`)}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 6,
                marginBottom: 26,
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 42 }}>
                {t(`pricing.plans.${plan.id}.price`)}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                {t('common.perMonth')}
              </span>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}
            >
              {tList(`pricing.plans.${plan.id}.perks`).map((perk) => (
                <div
                  key={perk}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    fontSize: 14,
                    color: '#d5d5d0',
                  }}
                >
                  <span style={{ color: 'var(--primary)', flexShrink: 0 }}>✓</span>
                  {perk}
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`btn ${plan.highlighted ? 'btn--card-solid' : 'btn--card'}`}
              style={{ padding: 13, fontSize: '14.5px' }}
              onClick={plan.requiresAuth ? vm.openLogin : vm.scrollToPricing}
            >
              {t(`pricing.plans.${plan.id}.cta`)}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
