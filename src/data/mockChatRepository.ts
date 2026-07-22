import type { ChatThread } from '../domain/entities';
import type { ChatRepository } from '../domain/repositories';

export const mockChatRepository: ChatRepository = {
  getThread: (name: string): ChatThread => ({
    name,
    messages: [
      { fromMe: false, text: "Hey! Quick question about today's session.", attachments: [] },
      {
        fromMe: true,
        text: 'Bumped your pull-up sets today, watch the tempo video before you start 👇',
        attachments: [
          { icon: '📄', label: 'Plan.pdf' },
          { icon: '▶', label: 'Tempo.mp4' },
        ],
      },
      { fromMe: false, text: 'Got it, on it now 💪', attachments: [] },
    ],
  }),
};
