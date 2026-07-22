import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { Providers } from './providers';
import HomePage from './page';

function renderPage() {
  return render(
    <Providers>
      <HomePage />
    </Providers>,
  );
}

describe('HomePage', () => {
  it('renders hero and, once the API resolves, trainers and pricing plans', async () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Train with real coaches.',
    );
    expect(await screen.findByTestId('trainer-card-omar')).toBeInTheDocument();
    expect(await screen.findByTestId('plan-selfGuided')).toBeInTheDocument();
    expect(await screen.findByTestId('plan-coached')).toBeInTheDocument();
    expect(await screen.findByTestId('plan-elite')).toBeInTheDocument();
  });

  it('filters trainer cards by specialty chip', async () => {
    renderPage();
    await screen.findByTestId('trainer-card-omar');
    fireEvent.click(screen.getByRole('button', { name: 'Strength' }));
    expect(screen.getByTestId('trainer-card-youssef')).toBeInTheDocument();
    expect(screen.queryByTestId('trainer-card-omar')).not.toBeInTheDocument();
  });

  it('opens the trainer profile modal from a card', async () => {
    renderPage();
    fireEvent.click(await screen.findByTestId('trainer-card-nadia'));
    expect(await screen.findByText('Book intro call with Nadia R.')).toBeInTheDocument();
  });

  it('logs in as admin through the API and shows the admin dashboard', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Get matched' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.change(within(dialog).getByPlaceholderText('Email or username'), {
      target: { value: 'admin' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Continue' }));
    expect(await screen.findByText('·ADMIN')).toBeInTheDocument();
    expect(await screen.findByText('EGP 218k')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Exit admin' }));
    expect(screen.queryByText('·ADMIN')).not.toBeInTheDocument();
  });

  it('logs in as trainer and lands on the coach diet tab', async () => {
    renderPage();
    fireEvent.click(await screen.findByRole('button', { name: 'Get matched' }));
    const dialog = screen.getByRole('dialog');
    fireEvent.change(within(dialog).getByPlaceholderText('Email or username'), {
      target: { value: 'trainer' },
    });
    fireEvent.click(within(dialog).getByRole('button', { name: 'Continue' }));
    expect(await screen.findByText('·COACH')).toBeInTheDocument();
    expect(
      await screen.findByText(
        "Assign each day's meal plan with a reference photo your clients see in-chat.",
      ),
    ).toBeInTheDocument();
  });

  it('switches the whole UI to Arabic with RTL direction', async () => {
    renderPage();
    fireEvent.click(screen.getAllByRole('button', { name: 'العربية' })[0]);
    expect(document.documentElement.dir).toBe('rtl');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'تدرّب مع مدربين حقيقيين.',
    );
  });

  it('opens the coach chat thread fetched from the API', async () => {
    renderPage();
    await screen.findByTestId('trainer-card-omar');
    fireEvent.click(screen.getByRole('button', { name: 'Open in coach chat' }));
    expect(await screen.findByPlaceholderText('Message…')).toBeInTheDocument();
  });
});
