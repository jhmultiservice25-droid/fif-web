import { IEducationLevel, IProfessionalSituation, ISex, IVolunteerTeam } from '@/app/shared/interfaces';

export const SEX_OPTIONS: readonly { value: ISex; label: string }[] = [
  { value: 'FEMME', label: 'Femme' },
  { value: 'HOMME', label: 'Homme' },
  { value: 'AUTRE', label: 'Autre' }
];

export const EDUCATION_LEVEL_OPTIONS: readonly { value: IEducationLevel; label: string }[] = [
  { value: 'SECONDAIRE', label: 'Études secondaires' },
  { value: 'LICENCE', label: 'Licence / Graduat' },
  { value: 'MASTER', label: 'Master' },
  { value: 'DOCTORAT', label: 'Doctorat' },
  { value: 'AUTRE', label: 'Autre' }
];

export const PROFESSIONAL_SITUATION_OPTIONS: readonly {
  value: IProfessionalSituation;
  label: string;
}[] = [
  { value: 'ETUDIANT', label: 'Étudiant(e)' },
  { value: 'SALARIE', label: 'Salarié(e)' },
  { value: 'INDEPENDANT', label: 'Indépendant(e)' },
  { value: 'CHERCHEUR_EMPLOI', label: "En recherche d'emploi" },
  { value: 'BENEVOLE', label: 'Bénévole' },
  { value: 'AUTRE', label: 'Autre' }
];

export const VOLUNTEER_TEAMS: readonly IVolunteerTeam[] = [
  { id: 'accueil', name: 'Accueil & Orientation' },
  { id: 'registration', name: 'Registration & Badges' },
  { id: 'village', name: 'Innovation Village' },
  { id: 'programme', name: 'Programme, Salles & Masterclasses' },
  { id: 'b2b', name: 'B2B & Networking' },
  { id: 'communication', name: 'Communication & Social Media' },
  { id: 'studio', name: 'Photo, Vidéo & FIKIRI Studio' },
  { id: 'tech', name: 'Tech Support' },
  { id: 'protocole', name: 'Protocole & VIP' },
  { id: 'logistique', name: 'Logistique & Opérations' }
];
