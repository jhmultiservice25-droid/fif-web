import { IEducationLevel, IProfessionalSituation, ISex, IVolunteerTeamId } from '@/app/shared/interfaces';

export interface IApplicantIdentityForm {
  lastName: string;
  postnom: string;
  firstName: string;
  sex: ISex | '';
  birthDate: Date;
  city: string;
  whatsapp: string;
  email: string;
}

export interface ICommitteeApplicationForm {
  identity: IApplicantIdentityForm;
  profile: {
    primaryJobId: string;
    secondaryJobId: string;
    educationLevel: IEducationLevel | '';
    fieldOfStudy: string;
    professionalSituation: IProfessionalSituation | '';
    yearsOfExperience: number;
    linkedin: string;
  };
  commitment: {
    motivation: string;
    experience: string;
    availability: string;
    cv: File | string;
  };
}

export interface IVolunteerApplicationForm {
  identity: IApplicantIdentityForm;
  profile: {
    organization: string;
    educationLevel: IEducationLevel | '';
    fieldOfStudy: string;
    primaryTeamId: IVolunteerTeamId | '';
    secondaryTeamId: IVolunteerTeamId | '';
    skills: string;
    languages: string;
  };
  commitment: {
    eventExperience: string;
    availability: string;
    motivation: string;
  };
}
