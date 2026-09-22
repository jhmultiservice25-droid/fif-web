import { IApplicationKind } from '@/app/shared/interfaces';

export type IApplicationStorageKind = IApplicationKind | 'PARTICIPANT';

export const APPLICATION_STORAGE_KEYS: Record<IApplicationStorageKind, string> = {
  COMMITTEE: 'fif-2026-committee-application-submitted',
  VOLUNTEER: 'fif-2026-volunteer-application-submitted',
  PARTICIPANT: 'fif-2026-participant-registration-submitted'
};
