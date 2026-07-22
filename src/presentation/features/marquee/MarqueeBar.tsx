import { Fragment } from 'react';
import { useI18n } from '../../../core/i18n';

const itemKeys = [
  'marquee.calisthenics',
  'marquee.streetWorkout',
  'marquee.dailyMealPlans',
  'marquee.realCoaches',
];

export function MarqueeBar() {
  const { t } = useI18n();
  const sequence = [...itemKeys, ...itemKeys];

  return (
    <div
      style={{
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        overflow: 'hidden',
        padding: '14px 0',
        background: 'var(--surface-alt)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: 60,
          whiteSpace: 'nowrap',
          animation: 'marquee 22s linear infinite',
          width: 'max-content',
        }}
      >
        {sequence.map((key, i) => (
          <Fragment key={`${key}-${i}`}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                letterSpacing: 2,
                color: 'var(--text-faint)',
              }}
            >
              {t(key)}
            </span>
            <span style={{ color: 'var(--primary)' }}>◆</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
