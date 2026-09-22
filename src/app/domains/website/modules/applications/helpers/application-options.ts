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
  {
    id: 'accueil',
    name: 'Accueil & Orientation',
    description: 'Accueillir, informer et orienter les participants vers les salles, stands, activités et services.'
  },
  {
    id: 'registration',
    name: 'Registration & Badges',
    description: 'Assurer le check-in, les badges, l’information d’accès et la fluidité des files.'
  },
  {
    id: 'village',
    name: 'Innovation Village',
    description: 'Accompagner les exposants, les démonstrations, les visiteurs et les flux dans le Village.'
  },
  {
    id: 'programme',
    name: 'Programme, Salles & Masterclasses',
    description: 'Assister les salles, les speakers, les modérateurs, les ateliers et le respect du programme.'
  },
  {
    id: 'b2b',
    name: 'B2B & Networking',
    description: 'Orienter les rendez-vous B2B, faciliter les rencontres et appuyer les espaces de networking.'
  },
  {
    id: 'communication',
    name: 'Communication & Social Media',
    description: 'Appuyer la couverture en direct, les réseaux sociaux, les contenus et l’information du public.'
  },
  {
    id: 'studio',
    name: 'Photo, Vidéo & FIKIRI Studio',
    description: 'Appuyer les prises de vue, interviews, podcasts et contenus produits pendant le Festival.'
  },
  {
    id: 'tech',
    name: 'Tech Support',
    description: 'Assister le QR/check-in, les salles, écrans, microphones, Wi-Fi, AV et besoins techniques.'
  },
  {
    id: 'protocole',
    name: 'Protocole & VIP',
    description: 'Accueillir et accompagner les VIP, gérer les parcours, les zones réservées et le protocole.'
  },
  {
    id: 'logistique',
    name: 'Logistique & Opérations',
    description: 'Appuyer les flux, le mobilier, les consommables, les mouvements, les réapprovisionnements et le site.'
  },
  {
    id: 'securite',
    name: 'Sécurité & Premiers secours',
    description: 'Appuyer le contrôle des accès, la sûreté des espaces, la gestion des incidents et l’orientation vers les premiers secours.'
  },
  {
    id: 'talent',
    name: 'Career & Talent Corner',
    description: 'Accueillir les talents et recruteurs, orienter les profils et faciliter les rencontres autour des compétences et opportunités.'
  },
  {
    id: 'mentoring',
    name: 'Mentoring Corner',
    description: 'Organiser les files et rendez-vous de mentorat, accueillir mentors et participants et assurer la fluidité des sessions.'
  },
  {
    id: 'investors',
    name: 'Investors Corner',
    description: 'Accueillir startups, investisseurs, banques et partenaires et faciliter leurs rencontres.'
  },
  {
    id: 'arena',
    name: 'FIKIRI Arena, Pitch & Challenges',
    description: 'Assister les équipes de pitch, jurys et compétitions, gérer les passages et soutenir le vote du public.'
  },
  {
    id: 'experience',
    name: 'FIKIRI Experience & Démonstrations',
    description: 'Accompagner les expériences IA, technologies immersives, robotique et démonstrations auprès du public.'
  },
  {
    id: 'hospitalite',
    name: 'Hospitalité, Catering & Espaces participants',
    description: 'Orienter les participants vers les espaces de pause, restauration et services et appuyer la fluidité de ces zones.'
  }
];
