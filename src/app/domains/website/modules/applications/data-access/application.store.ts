import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import {
  IApiError,
  IApiSuccess,
  IApplicationKind,
  ICommitteeApplication,
  ICommitteeApplicationInput,
  IVolunteerApplication,
  IVolunteerApplicationInput
} from '@/app/shared/interfaces';
import { catchError, filter, of, pipe, switchMap, tap } from 'rxjs';
import { IApplicationState } from '../interfaces';
import { APPLICATION_STORAGE_KEYS } from '../helpers/application-storage';

const initialState: IApplicationState = {
  isLoading: false,
  isSubmitted: false,
  isAlreadyApplied: false,
  error: ''
};

const getErrorMessage = (error: HttpErrorResponse): string => {
  const apiError = error.error as IApiError | undefined;
  return apiError?.message ?? 'La candidature n’a pas pu être envoyée. Veuillez réessayer.';
};

const hasStoredApplication = (key: string): boolean => {
  try {
    return window.localStorage.getItem(key) === 'true';
  } catch {
    return false;
  }
};

const storeApplication = (key: string): void => {
  try {
    window.localStorage.setItem(key, 'true');
  } catch {
    // Submission remains successful when storage is unavailable.
  }
};

export const ApplicationStore = signalStore(
  withState(initialState),
  withProps(() => ({
    _http: inject(HttpClient),
    _platformId: inject(PLATFORM_ID)
  })),
  withMethods(({ _http, _platformId, isAlreadyApplied, ...store }) => ({
    initialize(kind: IApplicationKind): void {
      if (!isPlatformBrowser(_platformId)) return;

      patchState(store, {
        isAlreadyApplied: hasStoredApplication(APPLICATION_STORAGE_KEYS[kind])
      });
    },
    submitCommittee: rxMethod<ICommitteeApplicationInput>(
      pipe(
        filter(() => !isAlreadyApplied()),
        tap(() => patchState(store, { isLoading: true, isSubmitted: false, error: '' })),
        switchMap((payload) => {
          const formData = new FormData();

          Object.entries(payload).forEach(([key, value]) => {
            if (value !== undefined && value !== '') {
              formData.append(key, value instanceof File ? value : String(value));
            }
          });

          return _http.post<IApiSuccess<ICommitteeApplication>>('/applications/committee', formData).pipe(
            tap(() => {
              if (isPlatformBrowser(_platformId)) {
                storeApplication(APPLICATION_STORAGE_KEYS.COMMITTEE);
              }
              patchState(store, { isLoading: false, isSubmitted: true, isAlreadyApplied: true });
            }),
            catchError((error: HttpErrorResponse) => {
              patchState(store, { isLoading: false, error: getErrorMessage(error) });
              return of(null);
            })
          );
        })
      )
    ),
    submitVolunteer: rxMethod<IVolunteerApplicationInput>(
      pipe(
        filter(() => !isAlreadyApplied()),
        tap(() => patchState(store, { isLoading: true, isSubmitted: false, error: '' })),
        switchMap((payload) =>
          _http.post<IApiSuccess<IVolunteerApplication>>('/applications/volunteer', payload).pipe(
            tap(() => {
              if (isPlatformBrowser(_platformId)) {
                storeApplication(APPLICATION_STORAGE_KEYS.VOLUNTEER);
              }
              patchState(store, { isLoading: false, isSubmitted: true, isAlreadyApplied: true });
            }),
            catchError((error: HttpErrorResponse) => {
              patchState(store, { isLoading: false, error: getErrorMessage(error) });
              return of(null);
            })
          )
        )
      )
    ),
    clearError(): void {
      patchState(store, { error: '' });
    }
  }))
);
