import '@testing-library/jest-dom';
import { container } from '../server/container';
import { resolveUserRole } from '../domain/usecases/auth';

// jsdom lacks scrollIntoView
Element.prototype.scrollIntoView = Element.prototype.scrollIntoView ?? (() => {});

// Allow relative Request URLs (fetchBaseQuery builds `new Request('/api/…')`)
const OriginalRequest = globalThis.Request;
class RelativeRequest extends OriginalRequest {
  constructor(input: RequestInfo | URL, init?: RequestInit) {
    if (typeof input === 'string' && input.startsWith('/')) {
      input = `http://localhost${input}`;
    }
    super(input, init);
  }
}
globalThis.Request = RelativeRequest as typeof Request;

function json(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * In-process stand-in for the Next API routes: requests to /api/* are answered
 * straight from the server-side repositories.
 */
globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
  const req = input instanceof Request ? input : new RelativeRequest(input, init);
  const url = new URL(req.url, 'http://localhost');
  switch (url.pathname) {
    case '/api/trainers':
      return json(container.trainerRepository.getAll());
    case '/api/catalog': {
      const repo = container.catalogRepository;
      return json({
        features: repo.getFeatures(),
        plans: repo.getPlans(),
        offers: repo.getOffers(),
        challenges: repo.getChallenges(),
      });
    }
    case '/api/daily-plan':
      return json(container.dailyPlanRepository.getToday());
    case '/api/chat':
      return json(container.chatRepository.getThread(url.searchParams.get('name') ?? ''));
    case '/api/admin': {
      const repo = container.adminRepository;
      return json({ stats: repo.getStats(), members: repo.getMembers(), inbox: repo.getInbox() });
    }
    case '/api/coach': {
      const repo = container.coachRepository;
      return json({
        stats: repo.getStats(),
        dietDays: repo.getDietDays(),
        workoutDays: repo.getWorkoutDays(),
        inbox: repo.getInbox(),
      });
    }
    case '/api/auth/login': {
      const body = (await req.json().catch(() => null)) as { identifier?: string } | null;
      return json({ role: resolveUserRole(body?.identifier ?? '') });
    }
    default:
      throw new Error(`Unhandled fetch in tests: ${url.pathname}`);
  }
}) as typeof fetch;
