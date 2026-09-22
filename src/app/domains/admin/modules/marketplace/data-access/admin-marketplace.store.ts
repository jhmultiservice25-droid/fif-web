import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { IApiError, IApiSuccess, IComputeMatchesPayload, IMatch } from '@/app/shared/interfaces';

interface IAdminMarketplaceState {
  isUpdating: boolean;
  error: string;
  revision: number;
}

export const AdminMarketplaceStore = signalStore(
  withState<IAdminMarketplaceState>({ isUpdating: false, error: '', revision: 0 }),
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
      computeMatches: rxMethod<IComputeMatchesPayload>(
        pipe(
          tap(() => patchState(store, { isUpdating: true, error: '' })),
          exhaustMap((payload) =>
            _http.post<IApiSuccess<IMatch[]>>('/admin/matches/compute', payload).pipe(
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
