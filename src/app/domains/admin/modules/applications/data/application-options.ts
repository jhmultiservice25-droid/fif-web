import { IApplicationKind, IApplicationStatus } from '@/app/shared/interfaces';

export const APPLICATION_KIND_OPTIONS: readonly { value: IApplicationKind; label: string }[] = [
  { value: 'COMMITTEE', label: 'Comité' },
  { value: 'VOLUNTEER', label: 'Volontaire' }
];

export const COMMITTEE_STATUS_OPTIONS: readonly { value: IApplicationStatus; label: string }[] = [
  { value: 'RECEIVED', label: 'Reçue' },
  { value: 'SHORTLISTED', label: 'Présélectionnée' },
  { value: 'INTERVIEW', label: 'Entretien' },
  { value: 'SELECTED', label: 'Sélectionnée' },
  { value: 'REJECTED', label: 'Rejetée' }
];

export const VOLUNTEER_STATUS_OPTIONS: readonly { value: IApplicationStatus; label: string }[] = [
  { value: 'RECEIVED', label: 'Reçue' },
  { value: 'SHORTLISTED', label: 'Présélectionnée' },
  { value: 'SELECTED', label: 'Sélectionnée' },
  { value: 'WAITLIST', label: "Liste d'attente" },
  { value: 'REJECTED', label: 'Rejetée' },
  { value: 'ASSIGNED', label: 'Affectée' },
  { value: 'TRAINED', label: 'Formée' }
];

export const ALL_STATUS_OPTIONS = [
  ...COMMITTEE_STATUS_OPTIONS,
  ...VOLUNTEER_STATUS_OPTIONS.filter(
    (option) => !COMMITTEE_STATUS_OPTIONS.some((committee) => committee.value === option.value)
  )
];

export const STATUS_LABELS = Object.fromEntries(
  ALL_STATUS_OPTIONS.map((option) => [option.value, option.label])
) as Record<IApplicationStatus, string>;
