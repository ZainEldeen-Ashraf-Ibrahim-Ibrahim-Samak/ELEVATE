'use client';

import { Fragment } from 'react';
import { useI18n } from '@/core/i18n';

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
    <div className="border-y border-line overflow-hidden py-3.5 bg-surface-alt">
      <div className="marquee-track flex gap-[60px] whitespace-nowrap w-max animate-marquee">
        {sequence.map((key, i) => (
          <Fragment key={`${key}-${i}`}>
            <span className="font-display text-[15px] tracking-[2px] text-ink-faint">
              {t(key)}
            </span>
            <span className="text-primary">◆</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
