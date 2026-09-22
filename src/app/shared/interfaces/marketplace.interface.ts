export type IUserRole = 'ORGANIZATION' | 'INNOVATOR' | 'ADMIN';

export type IRecordStatus = 'DRAFT' | 'SUBMITTED';

export type IPublicationConsent = 'NAMED' | 'ANONYMOUS' | 'NO' | 'DISCUSS';

export interface ICatalogOption {
  value: string;
  label?: string;
}

export type ICatalogItems = ICatalogOption[] | string[];

export interface IMarketplaceCatalog {
  orgTypes: ICatalogItems;
  sectors: ICatalogItems;
  problemDomains: ICatalogItems;
  solutionTypes: ICatalogItems;
  priorityLevels: ICatalogItems;
  timelines: ICatalogItems;
  yesMaybeNo: ICatalogItems;
  budgetBands: ICatalogItems;
  publicationConsents: ICatalogItems;
  fikiriChallenge: ICatalogItems;
  recordStatuses: ICatalogItems;
  projectStages: ICatalogItems;
  projectCapabilities: ICatalogItems;
  digitizationLevels: ICatalogItems;
}

export interface IOrganizationProfile {
  name: string;
  type: string;
  sector: string;
  city: string;
  contactName: string;
  contactTitle: string;
  phone: string;
  professionalEmail: string;
}

export interface IOrganizationProfilePayload {
  name?: string;
  type?: string;
  sector?: string;
  city?: string;
  contactName?: string;
  contactTitle?: string;
  phone?: string;
  professionalEmail?: string;
}

export interface INeedPayload {
  digitizationLevel?: string;
  challengeDescription?: string;
  currentSituation?: string;
  expectedImpact?: string;
  successCriteria?: string;
  stakeholders?: string;
  constraints?: string;
  additionalInfo?: string;
  [key: string]: unknown;
}

export interface INeed {
  id: string;
  status: IRecordStatus;
  priorityChallenge: string;
  problemDomains: string[];
  solutionTypes: string[];
  priority: string;
  timeline: string;
  pilotWillingness: string;
  budgetBand: string;
  publicationConsent: IPublicationConsent;
  fikiriChallenge: string;
  payload: INeedPayload;
  createdAt: string;
  updatedAt: string;
}

export interface INeedPayloadInput {
  status?: IRecordStatus;
  priorityChallenge?: string;
  problemDomains?: string[];
  solutionTypes?: string[];
  priority?: string;
  timeline?: string;
  pilotWillingness?: string;
  budgetBand?: string;
  publicationConsent?: IPublicationConsent;
  fikiriChallenge?: string;
  payload?: INeedPayload;
}

export interface IInnovatorProfile {
  displayName: string;
  organization: string | null;
  city: string;
  phone: string;
  email: string;
}

export interface IInnovatorProfilePayload {
  displayName?: string;
  organization?: string | null;
  city?: string;
  phone?: string;
  email?: string;
}

export interface IProject {
  id: string;
  status: IRecordStatus;
  title: string;
  problemSolved: string;
  solution: string;
  sectors: string[];
  capabilities: string[];
  stage: string;
  publicationConsent: IPublicationConsent;
  createdAt: string;
  updatedAt: string;
}

export interface IProjectPayloadInput {
  status?: IRecordStatus;
  title?: string;
  problemSolved?: string;
  solution?: string;
  sectors?: string[];
  capabilities?: string[];
  stage?: string;
  publicationConsent?: IPublicationConsent;
}

export interface IMatchNeedSummary {
  id: string;
  priorityChallenge: string;
  status: IRecordStatus;
  organizationName?: string;
}

export interface IMatchProjectSummary {
  id: string;
  title: string;
  status: IRecordStatus;
  displayName?: string;
}

export interface IMatch {
  id: string;
  score: number;
  rationale: string;
  need: IMatchNeedSummary;
  project: IMatchProjectSummary;
  createdAt: string;
}

export interface IRegisterPayload {
  email: string;
  password: string;
  name: string;
}

export interface IRegisterResponse {
  id: string;
  email: string;
  name: string;
  role: IUserRole;
}

export interface IAdminNeedListItem {
  id: string;
  status: IRecordStatus;
  priorityChallenge: string;
  organizationName: string;
  publicationConsent: IPublicationConsent;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminProjectListItem {
  id: string;
  status: IRecordStatus;
  title: string;
  displayName: string;
  publicationConsent: IPublicationConsent;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminListPage<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IAdminNeedDetail extends INeed {
  organizationName: string;
  organizationId: string;
}

export interface IAdminProjectDetail extends IProject {
  innovatorDisplayName: string;
  innovatorId: string;
}

export interface IAdminMatch extends IMatch {
  needId: string;
  projectId: string;
}

export interface IComputeMatchesPayload {
  needId?: string;
  projectId?: string;
  force?: boolean;
}
