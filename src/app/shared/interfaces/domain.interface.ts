/** String unions mirror the values accepted and returned by the API. */
export type ICommitteeStatus =
  | "RECEIVED"
  | "SHORTLISTED"
  | "INTERVIEW"
  | "SELECTED"
  | "REJECTED";

export type IVolunteerStatus =
  | "RECEIVED"
  | "SHORTLISTED"
  | "SELECTED"
  | "WAITLIST"
  | "REJECTED"
  | "ASSIGNED"
  | "TRAINED";

export type IApplicationStatus = ICommitteeStatus | IVolunteerStatus;
export type IApplicationKind = "COMMITTEE" | "VOLUNTEER";
export type ISex = "FEMME" | "HOMME" | "AUTRE";
export type IEducationLevel =
  | "SECONDAIRE"
  | "LICENCE"
  | "MASTER"
  | "DOCTORAT"
  | "AUTRE";
export type IProfessionalSituation =
  | "ETUDIANT"
  | "SALARIE"
  | "INDEPENDANT"
  | "CHERCHEUR_EMPLOI"
  | "BENEVOLE"
  | "AUTRE";
export type IVolunteerTeamId =
  | "accueil"
  | "registration"
  | "village"
  | "programme"
  | "b2b"
  | "communication"
  | "studio"
  | "tech"
  | "protocole"
  | "logistique";
export type IJobRoleKind = "LEAD" | "DEPUTY";

export interface IVolunteerTeam {
  id: IVolunteerTeamId;
  name: string;
}
