import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { IApiError, IApiSuccess, IMatch, IParticipantNotificationList } from '@/app/shared/interfaces';

interface IParticipantSharedState {
  isUpdating: boolean;
  error: string;
  revision: number;
}

export const ParticipantSharedStore = signalStore(
  withState<IParticipantSharedState>({ isUpdating: false, error: '', revision: 0 }),
  withProps(() => ({ _http: inject(HttpClient) })),
  withMethods(({ _http, revision, ...store }) => {
    const handleError = (error: HttpErrorResponse) => {
      const apiError = error.error as IApiError | undefined;
      patchState(store, {
        isUpdating: false,
        error: apiError?.message ?? 'L’opération a échoué.'
      });
      return of(null);
    };

    return {
      computeMatches: rxMethod<{ force?: boolean }>(
        pipe(
          tap(() => patchState(store, { isUpdating: true, error: '' })),
          exhaustMap(({ force }) => {
            const query = force ? '?force=true' : '';
            return _http.post<IApiSuccess<IMatch[]>>(`/me/matches/compute${query}`, {}).pipe(
              tap(() => patchState(store, { isUpdating: false, revision: revision() + 1 })),
              catchError(handleError)
            );
          })
        )
      ),
      markNotificationRead: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isUpdating: true, error: '' })),
          exhaustMap((id) =>
            _http
              .patch<IApiSuccess<IParticipantNotificationList>>(`/me/notifications/${encodeURIComponent(id)}/read`, {})
              .pipe(
                tap(() => patchState(store, { isUpdating: false, revision: revision() + 1 })),
                catchError(handleError)
              )
          )
        )
      ),
      markAllNotificationsRead: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isUpdating: true, error: '' })),
          exhaustMap(() =>
            _http.patch<IApiSuccess<IParticipantNotificationList>>('/me/notifications/read-all', {}).pipe(
              tap(() => patchState(store, { isUpdating: false, revision: revision() + 1 })),
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
