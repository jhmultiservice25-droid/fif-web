import { signalStore, withState, withMethods, patchState, withProps, withComputed } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IApiSuccess, IUser } from '@/app/shared/interfaces';

interface IAuthStore {
  user: IUser | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<IAuthStore>({ user: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router)
  })),
  withComputed(({ user }) => ({
    hasRights: computed(() => user()?.role === 'ADMIN'),
    isOrganization: computed(() => user()?.role === 'ORGANIZATION'),
    isInnovator: computed(() => user()?.role === 'INNOVATOR'),
    isParticipant: computed(() => {
      const role = user()?.role;
      return role === 'ORGANIZATION' || role === 'INNOVATOR';
    })
  })),
  withMethods(({ _http, _router, ...store }) => ({
    initialize: () => {
      return _http.get<IApiSuccess<IUser>>('/me').pipe(
        map(({ data }) => {
          patchState(store, { user: data });
          return data;
        }),
        catchError(() => {
          patchState(store, { user: null });
          return of(null);
        })
      );
    },
    signOut: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          _http.post<{ success: true }>('/api/auth/sign-out', {}).pipe(
            tap(() => {
              patchState(store, { user: null });
              _router.navigate(['/auth/connexion']);
            }),
            catchError(() => of(null))
          )
        )
      )
    ),
    setUser: (user: IUser | null) => {
      patchState(store, { user });
    },
    homeRoute: (): string => {
      const role = store.user()?.role;
      if (role === 'ADMIN') return '/admin';
      if (role === 'ORGANIZATION') return '/organisation';
      if (role === 'INNOVATOR') return '/innovateur';
      return '/';
    }
  }))
);
