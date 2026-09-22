import { IPatchApplicationInput, IPatchApplicationResponse } from '@/app/shared/interfaces';

export interface IApplicationUpdateRequest {
  id: string;
  payload: IPatchApplicationInput;
}

export interface IApplicationMutationState {
  isUpdating: boolean;
  isExporting: boolean;
  error: string;
  exportError: string;
  updatedApplication: IPatchApplicationResponse | null;
  revision: number;
}

export interface IApplicationFilterModel {
  q: string;
  kind: string;
  status: string;
  poleId: string;
  jobId: string;
  teamId: string;
}

export interface IApplicationUpdateModel {
  status: string;
  assignmentTeamId: string;
  assignmentZone: string;
  assignmentLead: string;
  assignmentShift: string;
}
