import { httpResource } from '@angular/common/http';
import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { IApiSuccess, INeed, INeedPayload, INeedPayloadInput } from '@/app/shared/interfaces';
import { MarketplaceCatalogStore } from '@/app/shared/data-access';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { OrganizationStore } from '../../data-access';

interface INeedFormModel {
  status: 'DRAFT' | 'SUBMITTED';
  priorityChallenge: string;
  problemDomains: string[];
  solutionTypes: string[];
  priority: string;
  timeline: string;
  pilotWillingness: string;
  budgetBand: string;
  publicationConsent: 'NAMED' | 'ANONYMOUS' | 'NO' | 'DISCUSS';
  fikiriChallenge: string;
  digitizationLevel: string;
  challengeDescription: string;
  currentSituation: string;
  expectedImpact: string;
  successCriteria: string;
  stakeholders: string;
  constraints: string;
  additionalInfo: string;
}

const defaultNeedModel = (): INeedFormModel => ({
  status: 'DRAFT',
  priorityChallenge: '',
  problemDomains: [],
  solutionTypes: [],
  priority: '',
  timeline: '',
  pilotWillingness: '',
  budgetBand: '',
  publicationConsent: 'DISCUSS',
  fikiriChallenge: '',
  digitizationLevel: '',
  challengeDescription: '',
  currentSituation: '',
  expectedImpact: '',
  successCriteria: '',
  stakeholders: '',
  constraints: '',
  additionalInfo: ''
});

@Component({
  templateUrl: './need-form.html',
  providers: [OrganizationStore],
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, Message]
})
export default class NeedForm implements OnInit {
  readonly id = input<string | undefined>();

  protected readonly store = inject(OrganizationStore);
  protected readonly catalogStore = inject(MarketplaceCatalogStore);
  private readonly router = inject(Router);

  protected readonly needResource = httpResource<IApiSuccess<INeed>>(() => {
    const needId = this.id();
    return needId && needId !== 'nouveau' ? `/me/needs/${encodeURIComponent(needId)}` : undefined;
  });

  protected readonly model = signal<INeedFormModel>(defaultNeedModel());
  protected readonly needForm = form(this.model, (schemaPath) => {
    required(schemaPath.priorityChallenge);
  });

  protected readonly isNew = () => !this.id() || this.id() === 'nouveau';

  constructor() {
    effect(() => {
      if (this.needResource.hasValue()) {
        const need = this.needResource.value().data;
        this.model.set({
          status: need.status,
          priorityChallenge: need.priorityChallenge,
          problemDomains: [...need.problemDomains],
          solutionTypes: [...need.solutionTypes],
          priority: need.priority,
          timeline: need.timeline,
          pilotWillingness: need.pilotWillingness,
          budgetBand: need.budgetBand,
          publicationConsent: need.publicationConsent,
          fikiriChallenge: need.fikiriChallenge,
          digitizationLevel: need.payload?.digitizationLevel ?? '',
          challengeDescription: need.payload?.challengeDescription ?? '',
          currentSituation: need.payload?.currentSituation ?? '',
          expectedImpact: need.payload?.expectedImpact ?? '',
          successCriteria: need.payload?.successCriteria ?? '',
          stakeholders: need.payload?.stakeholders ?? '',
          constraints: need.payload?.constraints ?? '',
          additionalInfo: need.payload?.additionalInfo ?? ''
        });
      }
    });

    let revision = 0;
    effect(() => {
      const currentRevision = this.store.revision();
      if (currentRevision > revision) {
        revision = currentRevision;
        if (this.isNew()) {
          void this.router.navigate(['/organisation/fiches']);
        } else {
          this.needResource.reload();
        }
      }
    });
  }

  ngOnInit(): void {
    this.catalogStore.load().subscribe();
  }

  protected save(asSubmitted = false): void {
    submit(this.needForm, async () => {
      const value = this.model();
      const payload: INeedPayload = {
        digitizationLevel: value.digitizationLevel || undefined,
        challengeDescription: value.challengeDescription || undefined,
        currentSituation: value.currentSituation || undefined,
        expectedImpact: value.expectedImpact || undefined,
        successCriteria: value.successCriteria || undefined,
        stakeholders: value.stakeholders || undefined,
        constraints: value.constraints || undefined,
        additionalInfo: value.additionalInfo || undefined
      };

      const body: INeedPayloadInput = {
        status: asSubmitted ? 'SUBMITTED' : value.status,
        priorityChallenge: value.priorityChallenge,
        problemDomains: value.problemDomains,
        solutionTypes: value.solutionTypes,
        priority: value.priority,
        timeline: value.timeline,
        pilotWillingness: value.pilotWillingness,
        budgetBand: value.budgetBand,
        publicationConsent: value.publicationConsent,
        fikiriChallenge: value.fikiriChallenge,
        payload
      };

      if (this.isNew()) {
        this.store.createNeed(body);
      } else {
        this.store.saveNeed({ id: this.id()!, payload: body });
      }
    });
  }
}
