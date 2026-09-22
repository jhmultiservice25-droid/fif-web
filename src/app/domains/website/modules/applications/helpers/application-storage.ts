import { IApplicationKind } from '@/app/shared/interfaces';

export const APPLICATION_STORAGE_KEYS: Record<IApplicationKind, string> = {
  COMMITTEE: 'fif-2026-committee-application-submitted',
  VOLUNTEER: 'fif-2026-volunteer-application-submitted'
};
