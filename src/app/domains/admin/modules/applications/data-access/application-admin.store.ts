import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IApiError, IApiSuccess, IApplicationListQuery, IPatchApplicationResponse } from '@/app/shared/interfaces';
import { catchError, exhaustMap, finalize, of, pipe, tap } from 'rxjs';
import { buildApplicationUrl } from '../helpers';
import { IApplicationMutationState, IApplicationUpdateRequest } from '../interfaces';

const initialState: IApplicationMutationState = {
  isUpdating: false,
  isExporting: false,
  error: '',
  exportError: '',
  updatedApplication: null,
  revision: 0
};

export const ApplicationAdminStore = signalStore(
  withState(initialState),
  withProps(() => ({
    _document: inject(DOCUMENT),
    _http: inject(HttpClient)
  })),
  withMethods(({ _document, _http, revision, ...store }) => ({
    update: rxMethod<IApplicationUpdateRequest>(
      pipe(
        tap(() => patchState(store, { isUpdating: true, error: '' })),
        exhaustMap(({ id, payload }) =>
          _http
            .patch<IApiSuccess<IPatchApplicationResponse>>(`/admin/applications/${encodeURIComponent(id)}`, payload)
            .pipe(
              tap(({ data }) => {
                patchState(store, {
                  isUpdating: false,
                  updatedApplication: data,
                  revision: revision() + 1
                });
              }),
              catchError((error: HttpErrorResponse) => {
                const apiError = error.error as IApiError | undefined;
                patchState(store, {
                  isUpdating: false,
                  error: apiError?.message ?? "La candidature n'a pas pu être mise à jour."
                });
                return of(null);
              })
            )
        )
      )
    ),
    exportCsv: rxMethod<IApplicationListQuery>(
      pipe(
        tap(() => patchState(store, { isExporting: true, exportError: '' })),
        exhaustMap((query) =>
          _http
            .get(buildApplicationUrl(query, '/admin/applications/export.csv', false), {
              responseType: 'blob'
            })
            .pipe(
              tap((file) => {
                const url = URL.createObjectURL(file);
                const anchor = _document.createElement('a');
                anchor.href = url;
                anchor.download = 'fif-candidatures.csv';
                anchor.click();
                URL.revokeObjectURL(url);
              }),
              catchError((error: HttpErrorResponse) => {
                const apiError = error.error as IApiError | undefined;
                patchState(store, {
                  exportError: apiError?.message ?? "Le fichier CSV n'a pas pu être exporté."
                });
                return of(null);
              }),
              finalize(() => patchState(store, { isExporting: false }))
            )
        )
      )
    ),
    clearError(): void {
      patchState(store, { error: '' });
    },
    clearExportError(): void {
      patchState(store, { exportError: '' });
    }
  }))
);
