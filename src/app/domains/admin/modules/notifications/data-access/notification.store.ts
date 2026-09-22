import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IApiError, IApiSuccess, INotificationList } from '@/app/shared/interfaces';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { INotificationMutationState } from '../interfaces';

const initialState: INotificationMutationState = {
  isUpdating: false,
  error: '',
  notifications: null,
  revision: 0
};

export const NotificationStore = signalStore(
  withState(initialState),
  withProps(() => ({ _http: inject(HttpClient) })),
  withMethods(({ _http, revision, ...store }) => {
    const updateState = ({ data }: IApiSuccess<INotificationList>): void => {
      patchState(store, {
        isUpdating: false,
        notifications: data,
        revision: revision() + 1
      });
    };
    const handleError = (error: HttpErrorResponse) => {
      const apiError = error.error as IApiError | undefined;
      patchState(store, {
        isUpdating: false,
        error: apiError?.message ?? "Les notifications n'ont pas pu être mises à jour."
      });
      return of(null);
    };

    return {
      markRead: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isUpdating: true, error: '' })),
          exhaustMap((id) =>
            _http
              .patch<IApiSuccess<INotificationList>>(`/admin/notifications/${encodeURIComponent(id)}/read`, {})
              .pipe(tap(updateState), catchError(handleError))
          )
        )
      ),
      markAllRead: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isUpdating: true, error: '' })),
          exhaustMap(() =>
            _http
              .patch<IApiSuccess<INotificationList>>('/admin/notifications/read-all', {})
              .pipe(tap(updateState), catchError(handleError))
          )
        )
      ),
      clearError(): void {
        patchState(store, { error: '' });
      }
    };
  })
);
