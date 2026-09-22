import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { IApiSuccess } from '@/app/shared/interfaces';
import { AuthStore } from './auth.store';
import { IRegisterKind, IRegisterPayload, IRegisterRequestState, IRegisterResponse } from '../interfaces/register.interface';

export const RegisterStore = signalStore(
  withState<IRegisterRequestState>({ isLoading: false, error: '' }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _authStore, _router, ...store }) => ({
    register: rxMethod<{ kind: IRegisterKind; payload: IRegisterPayload }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: '' })),
        switchMap(({ kind, payload }) => {
          const path = kind === 'organization' ? '/register/organization' : '/register/innovator';

          return _http.post<IApiSuccess<IRegisterResponse>>(path, payload).pipe(
            switchMap(() =>
              _http.post<{ user: { id: string; email: string; name: string; role: string } }>(
                '/api/auth/sign-in/email',
                { email: payload.email, password: payload.password, rememberMe: true }
              )
            ),
            tap(({ user }) => {
              patchState(store, { isLoading: false });
              _authStore.setUser({
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role as 'ORGANIZATION' | 'INNOVATOR' | 'ADMIN'
              });
              _router.navigateByUrl(_authStore.homeRoute());
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
