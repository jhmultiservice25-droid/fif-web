import { IApplicationListQuery } from '@/app/shared/interfaces';

export const buildApplicationUrl = (
  query: IApplicationListQuery,
  path = '/admin/applications',
  includePagination = true
): string => {
  const params = new URLSearchParams();

  if (query.q?.trim()) params.set('q', query.q.trim());
  if (query.kind) params.set('kind', query.kind);
  if (query.status) params.set('status', query.status);
  if (query.poleId?.trim()) params.set('poleId', query.poleId.trim());
  if (query.jobId?.trim()) params.set('jobId', query.jobId.trim());
  if (query.teamId) params.set('teamId', query.teamId);

  if (includePagination) {
    if (query.page) params.set('page', String(query.page));
    if (query.pageSize) params.set('pageSize', String(query.pageSize));
  }

  const queryString = params.toString();
  return queryString ? `${path}?${queryString}` : path;
};
