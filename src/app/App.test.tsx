import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { I18nProvider } from '../core/i18n';
import { App } from './App';

function renderApp() {
  return render(
    <I18nProvider>
      <App />
    </I18nProvider>,
  );
}

describe('App', () => {
  it('renders hero, trainers, and all three pricing plans in English', () => {
    renderApp();
    expect(screen.getByText('Train with real coaches.')).toBeInTheDocument();
    expect(screen.getByTestId('trainer-card-omar')).toBeInTheDocument();
    expect(screen.getByTestId('plan-selfGuided')).toBeInTheDocument();
    expect(screen.getByTestId('plan-coached')).toBeInTheDocument();
    expect(screen.getByTestId('plan-elite')).toBeInTheDocument();
  });

  it('filters trainer cards by specialty chip', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Strength' }));
    expect(screen.getByTestId('trainer-card-youssef')).toBeInTheDocument();
    expect(screen.queryByTestId('trainer-card-omar')).not.toBeInTheDocument();
  });

  it('opens the trainer profile modal from a card', () => {
    renderApp();
    fireEvent.click(screen.getByTestId('trainer-card-nadia'));
    expect(screen.getByText('Book intro call with Nadia R.')).toBeInTheDocument();
  });

  it('logs in as admin and shows the admin dashboard', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Get matched' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.change(within(dialog).getByPlaceholderText('Email or username'), {
      target: { value: 'admin' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('ELEVATE')).toBeInTheDocument();
    expect(screen.getByText('·ADMIN')).toBeInTheDocument();
    expect(screen.getByText('active members')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Exit admin' }));
    expect(screen.queryByText('·ADMIN')).not.toBeInTheDocument();
  });

  it('logs in as trainer and lands on the coach diet tab', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Get matched' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.change(within(dialog).getByPlaceholderText('Email or username'), {
      target: { value: 'trainer' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Continue' }));
    expect(screen.getByText('·COACH')).toBeInTheDocument();
    expect(
      screen.getByText("Assign each day's meal plan with a reference photo your clients see in-chat."),
    ).toBeInTheDocument();
  });

  it('switches the whole UI to Arabic with RTL direction', () => {
    renderApp();
    fireEvent.click(screen.getAllByRole('button', { name: 'العربية' })[0]);
    expect(document.documentElement.dir).toBe('rtl');
    expect(screen.getByText('تدرّب مع مدربين حقيقيين.')).toBeInTheDocument();
  });

  it('opens the coach chat from the daily plan section', () => {
    renderApp();
    fireEvent.click(screen.getByRole('button', { name: 'Open in coach chat' }));
    expect(screen.getByPlaceholderText('Message…')).toBeInTheDocument();
  });
});
