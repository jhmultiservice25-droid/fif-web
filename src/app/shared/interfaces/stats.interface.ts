import type { ICommitteeStatus, IVolunteerStatus } from "./domain.interface";

export interface IJobCountStat {
  jobId: string;
  title: string;
  poleId: string;
  count: number;
}

export interface ITeamCountStat {
  teamId: string;
  name: string;
  count: number;
}

export interface IDayCountStat {
  date: string;
  committee: number;
  volunteer: number;
}

export interface IAdminStats {
  committeeTotal: number;
  volunteerTotal: number;
  committeeByStatus: Record<ICommitteeStatus, number>;
  volunteerByStatus: Record<IVolunteerStatus, number>;
  committeeByJob: IJobCountStat[];
  volunteerByTeam: ITeamCountStat[];
  byDay: IDayCountStat[];
  thisWeek: number;
  lastWeek: number;
}
