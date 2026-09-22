import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import {
  IApiError,
  IApiSuccess,
  IInnovatorProfile,
  IInnovatorProfilePayload,
  IProject,
  IProjectPayloadInput
} from '@/app/shared/interfaces';

interface IInnovatorMutationState {
  isSaving: boolean;
  error: string;
  revision: number;
}

export const InnovatorStore = signalStore(
  withState<IInnovatorMutationState>({ isSaving: false, error: '', revision: 0 }),
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
      saveProfile: rxMethod<IInnovatorProfilePayload>(
        pipe(
          tap(() => patchState(store, { isSaving: true, error: '' })),
          exhaustMap((payload) =>
            _http.patch<IApiSuccess<IInnovatorProfile>>('/me/innovator', payload).pipe(
              tap(() => bumpRevision()),
              catchError(handleError)
            )
          )
        )
      ),
      createProject: rxMethod<IProjectPayloadInput>(
        pipe(
          tap(() => patchState(store, { isSaving: true, error: '' })),
          exhaustMap((payload) =>
            _http.post<IApiSuccess<IProject>>('/me/projects', payload).pipe(
              tap(() => bumpRevision()),
              catchError(handleError)
            )
          )
        )
      ),
      saveProject: rxMethod<{ id: string; payload: IProjectPayloadInput }>(
        pipe(
          tap(() => patchState(store, { isSaving: true, error: '' })),
          exhaustMap(({ id, payload }) =>
            _http.patch<IApiSuccess<IProject>>(`/me/projects/${encodeURIComponent(id)}`, payload).pipe(
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
