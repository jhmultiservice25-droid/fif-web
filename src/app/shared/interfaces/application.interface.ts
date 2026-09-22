import type { IJob, IJobWithPole } from "./catalog.interface";
import type {
  IApplicationKind,
  IApplicationStatus,
  ICommitteeStatus,
  IEducationLevel,
  IProfessionalSituation,
  ISex,
  IVolunteerStatus,
  IVolunteerTeamId,
} from "./domain.interface";

export interface IApplicantIdentity {
  lastName: string;
  postnom: string;
  firstName: string;
  sex: ISex;
  /** ISO date, for example 1998-04-12. */
  birthDate: string;
  city: string;
  whatsapp: string;
  email: string;
}

/** Multipart form fields accepted by POST /applications/committee. */
export interface ICommitteeApplicationInput extends IApplicantIdentity {
  primaryJobId: string;
  secondaryJobId?: string;
  educationLevel: IEducationLevel;
  fieldOfStudy: string;
  professionalSituation: IProfessionalSituation;
  yearsOfExperience: number;
  motivation: string;
  experience: string;
  availability: string;
  linkedin?: string;
  cv: File;
}

/** JSON body accepted by POST /applications/volunteer. */
export interface IVolunteerApplicationInput extends IApplicantIdentity {
  organization?: string;
  educationLevel: IEducationLevel;
  fieldOfStudy: string;
  primaryTeamId: IVolunteerTeamId;
  secondaryTeamId?: IVolunteerTeamId;
  skills?: string;
  eventExperience?: string;
  languages: string;
  availability: string;
  motivation: string;
}

export interface ICommitteeApplication extends IApplicantIdentity {
  id: string;
  primaryJobId: string;
  secondaryJobId: string | null;
  educationLevel: IEducationLevel;
  fieldOfStudy: string;
  professionalSituation: IProfessionalSituation;
  yearsOfExperience: number;
  motivation: string;
  experience: string;
  availability: string;
  linkedin: string | null;
  status: ICommitteeStatus;
  /** ISO date-time returned by the API. */
  createdAt: string;
  /** ISO date-time returned by the API. */
  updatedAt: string;
}

export interface IVolunteerApplication extends IApplicantIdentity {
  id: string;
  organization: string | null;
  educationLevel: IEducationLevel;
  fieldOfStudy: string;
  primaryTeamId: IVolunteerTeamId;
  secondaryTeamId: IVolunteerTeamId | null;
  skills: string | null;
  eventExperience: string | null;
  languages: string;
  availability: string;
  motivation: string;
  status: IVolunteerStatus;
  assignmentTeamId: string | null;
  assignmentZone: string | null;
  assignmentLead: string | null;
  assignmentShift: string | null;
  /** ISO date-time returned by the API. */
  createdAt: string;
  /** ISO date-time returned by the API. */
  updatedAt: string;
}

export interface ICommitteeApplicationDetail extends ICommitteeApplication {
  kind: "COMMITTEE";
  primaryJob: IJobWithPole;
  secondaryJob: IJob | null;
}

export interface IVolunteerApplicationDetail extends IVolunteerApplication {
  kind: "VOLUNTEER";
}

export type IApplicationDetail =
  | ICommitteeApplicationDetail
  | IVolunteerApplicationDetail;

export interface IApplicationListItem {
  id: string;
  kind: IApplicationKind;
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  status: IApplicationStatus;
  primaryChoice: string;
  secondaryChoice?: string;
  createdAt: string;
}

export interface IApplicationListPage {
  total: number;
  page: number;
  pageSize: number;
  items: IApplicationListItem[];
}

/** Query parameters accepted by the admin list and CSV export routes. */
export interface IApplicationListQuery {
  kind?: IApplicationKind;
  q?: string;
  status?: IApplicationStatus;
  poleId?: string;
  jobId?: string;
  teamId?: IVolunteerTeamId;
  page?: number;
  pageSize?: number;
}

/** Body accepted by PATCH /admin/applications/:id. */
export interface IPatchApplicationInput {
  status?: IApplicationStatus;
  assignmentTeamId?: string;
  assignmentZone?: string;
  assignmentLead?: string;
  assignmentShift?: string;
}

export type IPatchApplicationResponse =
  | ICommitteeApplication
  | IVolunteerApplication;
