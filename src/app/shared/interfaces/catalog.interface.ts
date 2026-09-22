import type { IJobRoleKind } from "./domain.interface";

export interface IPole {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  order: number;
}

export interface IJob {
  id: string;
  slug: string;
  title: string;
  roleKind: IJobRoleKind;
  mission: string;
  responsibilities: string[];
  profile: string[];
  headcount: number;
  poleId: string;
}

export interface IJobWithPole extends IJob {
  pole: IPole;
}

export interface IPoleWithJobs extends IPole {
  jobs: IJob[];
}
