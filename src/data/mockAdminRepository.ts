import type { AdminRepository } from '../domain/repositories';

export const mockAdminRepository: AdminRepository = {
  getStats: () => ({ activeMembers: 2412, activeTrainers: 4, retentionPct: 92 }),
  getMembers: () => [
    { name: 'Youssef A.', planId: 'coached', joined: 'Jun 2026' },
    { name: 'Malak S.', planId: 'elite', joined: 'May 2026' },
    { name: 'Karim H.', planId: 'selfGuided', joined: 'May 2026' },
    { name: 'Rana F.', planId: 'coached', joined: 'Apr 2026' },
    { name: 'Ziad M.', planId: 'elite', joined: 'Mar 2026' },
  ],
  getInbox: () => [
    { id: 'a1', from: 'Youssef A. → Omar K.', preview: 'Can we move Thursday session?', time: '2h ago' },
    { id: 'a2', from: 'Malak S. → Nadia R.', preview: "Loved this week's meal plan!", time: '5h ago' },
    { id: 'a3', from: 'Karim H. → Support', preview: "Payment didn't go through", time: '1d ago' },
    { id: 'a4', from: 'Rana F. → Youssef T.', preview: 'Form check video attached', time: '2d ago' },
  ],
};
