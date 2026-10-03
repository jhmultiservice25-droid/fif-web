import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IApiSuccess } from '@/app/shared/interfaces';
import { IRegisterKind, IRegisterPayload, IRegisterRequestState, IRegisterResponse } from '../interfaces/register.interface';

export const RegisterStore = signalStore(
  withState<IRegisterRequestState>({ isLoading: false, error: '' }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router)
  })),
  withMethods(({ _http, _router, ...store }) => ({
    register: rxMethod<{ kind: IRegisterKind; payload: IRegisterPayload }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: '' })),
        switchMap(({ kind, payload }) => {
          const path = kind === 'organization' ? '/register/organization' : '/register/innovator';

          return _http.post<IApiSuccess<IRegisterResponse>>(path, payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              void _router.navigate(['/auth/verification-email'], {
                queryParams: { email: payload.email.trim().toLowerCase() }
              });
            }),
            catchError((error) => {
              const message =
                error?.error?.message ??
                (kind === 'organization'
                  ? 'Impossible de créer le compte organisation.'
                  : 'Impossible de créer le compte innovateur.');
              patchState(store, { isLoading: false, error: message });
              return of(null);
            })
          );
        })
      )
    ),
    clearError(): void {
      patchState(store, { error: '' });
    }
  }))
);
