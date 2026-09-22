import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import {
  IApiError,
  IApiSuccess,
  INeed,
  INeedPayloadInput,
  IOrganizationProfile,
  IOrganizationProfilePayload
} from '@/app/shared/interfaces';

interface IOrganizationMutationState {
  isSaving: boolean;
  error: string;
  revision: number;
}

export const OrganizationStore = signalStore(
  withState<IOrganizationMutationState>({ isSaving: false, error: '', revision: 0 }),
  withProps(() => ({ _http: inject(HttpClient) })),
  withMethods(({ _http, revision, ...store }) => {
    const handleError = (error: HttpErrorResponse) => {
      const apiError = error.error as IApiError | undefined;
      patchState(store, {
        isSaving: false,
        error: apiError?.message ?? 'L’enregistrement a échoué.'
      });
      return of(null);
    };

    const bumpRevision = (): void => {
      patchState(store, { isSaving: false, revision: revision() + 1 });
    };

    return {
      saveProfile: rxMethod<IOrganizationProfilePayload>(
        pipe(
          tap(() => patchState(store, { isSaving: true, error: '' })),
          exhaustMap((payload) =>
            _http.patch<IApiSuccess<IOrganizationProfile>>('/me/organization', payload).pipe(
              tap(() => bumpRevision()),
              catchError(handleError)
            )
          )
        )
      ),
      createNeed: rxMethod<INeedPayloadInput>(
        pipe(
          tap(() => patchState(store, { isSaving: true, error: '' })),
          exhaustMap((payload) =>
            _http.post<IApiSuccess<INeed>>('/me/needs', payload).pipe(
              tap(() => bumpRevision()),
              catchError(handleError)
            )
          )
        )
      ),
      saveNeed: rxMethod<{ id: string; payload: INeedPayloadInput }>(
        pipe(
          tap(() => patchState(store, { isSaving: true, error: '' })),
          exhaustMap(({ id, payload }) =>
            _http.patch<IApiSuccess<INeed>>(`/me/needs/${encodeURIComponent(id)}`, payload).pipe(
              tap(() => bumpRevision()),
              catchError(handleError)
            )
          )
        )
      ),
      clearError(): void {
        patchState(store, { error: '' });
      }
    };
  })
);
