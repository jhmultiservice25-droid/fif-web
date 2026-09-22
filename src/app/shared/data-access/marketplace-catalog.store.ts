import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { IApiSuccess, IMarketplaceCatalog } from '@/app/shared/interfaces';
import { normalizeCatalogItems } from '@/app/shared/helpers';

interface IMarketplaceCatalogState {
  catalog: IMarketplaceCatalog | null;
  isLoading: boolean;
  error: string;
  loaded: boolean;
}

const emptyCatalog: IMarketplaceCatalog = {
  orgTypes: [],
  sectors: [],
  problemDomains: [],
  solutionTypes: [],
  priorityLevels: [],
  timelines: [],
  yesMaybeNo: [],
  budgetBands: [],
  publicationConsents: [],
  fikiriChallenge: [],
  recordStatuses: [],
  projectStages: [],
  projectCapabilities: [],
  digitizationLevels: []
};

export const MarketplaceCatalogStore = signalStore(
  { providedIn: 'root' },
  withState<IMarketplaceCatalogState>({
    catalog: null,
    isLoading: false,
    error: '',
    loaded: false
  }),
  withProps(() => ({ _http: inject(HttpClient) })),
  withComputed(({ catalog }) => ({
    orgTypes: computed(() => normalizeCatalogItems(catalog()?.orgTypes)),
    sectors: computed(() => normalizeCatalogItems(catalog()?.sectors)),
    problemDomains: computed(() => normalizeCatalogItems(catalog()?.problemDomains)),
    solutionTypes: computed(() => normalizeCatalogItems(catalog()?.solutionTypes)),
    priorityLevels: computed(() => normalizeCatalogItems(catalog()?.priorityLevels)),
    timelines: computed(() => normalizeCatalogItems(catalog()?.timelines)),
    yesMaybeNo: computed(() => normalizeCatalogItems(catalog()?.yesMaybeNo)),
    budgetBands: computed(() => normalizeCatalogItems(catalog()?.budgetBands)),
    publicationConsents: computed(() => normalizeCatalogItems(catalog()?.publicationConsents)),
    fikiriChallenge: computed(() => normalizeCatalogItems(catalog()?.fikiriChallenge)),
    recordStatuses: computed(() => normalizeCatalogItems(catalog()?.recordStatuses)),
    projectStages: computed(() => normalizeCatalogItems(catalog()?.projectStages)),
    projectCapabilities: computed(() => normalizeCatalogItems(catalog()?.projectCapabilities)),
    digitizationLevels: computed(() => normalizeCatalogItems(catalog()?.digitizationLevels))
  })),
  withMethods(({ _http, loaded, ...store }) => ({
    load: (): Observable<void> => {
      if (loaded()) {
        return of(undefined);
      }

      patchState(store, { isLoading: true, error: '' });

      return _http.get<IApiSuccess<IMarketplaceCatalog>>('/catalogs/marketplace').pipe(
        tap(({ data }) => {
          patchState(store, { catalog: data, isLoading: false, loaded: true });
        }),
        catchError(() => {
          patchState(store, {
            catalog: emptyCatalog,
            isLoading: false,
            loaded: true,
            error: 'Les catalogues marketplace n’ont pas pu être chargés.'
          });
          return of(undefined);
        }),
        map(() => undefined)
      );
    }
  }))
);
