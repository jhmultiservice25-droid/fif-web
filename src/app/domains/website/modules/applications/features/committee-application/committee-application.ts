import { httpResource } from '@angular/common/http';
import { afterNextRender, Component, computed, inject, signal } from '@angular/core';
import {
  disabled,
  email,
  form,
  FormField,
  maxDate,
  min,
  minLength,
  required,
  submit,
  validate
} from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { IApiSuccess, ICommitteeApplicationInput, IPoleWithJobs } from '@/app/shared/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { ApplicationStore } from '../../data-access';
import { createEmptyDate, toIsoDate } from '../../helpers/application-date';
import {
  EDUCATION_LEVEL_OPTIONS,
  PROFESSIONAL_SITUATION_OPTIONS,
  SEX_OPTIONS
} from '../../helpers/application-options';
import { ICommitteeApplicationForm } from '../../interfaces';
import { ApplicationHero } from '../../ui/application-hero/application-hero';

@Component({
  templateUrl: './committee-application.html',
  providers: [ApplicationStore],
  imports: [
    FormField,
    RouterLink,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    Message,
    ApplicationHero
  ]
})
export class CommitteeApplication {
  protected readonly store = inject(ApplicationStore);
  protected readonly polesResource = httpResource<IApiSuccess<IPoleWithJobs[]>>(() => '/poles');
  protected readonly poles = computed(() => this.polesResource.value()?.data ?? []);
  protected readonly sexOptions = SEX_OPTIONS;
  protected readonly educationOptions = EDUCATION_LEVEL_OPTIONS;
  protected readonly professionalOptions = PROFESSIONAL_SITUATION_OPTIONS;
  protected readonly today = new Date();

  protected readonly applicationModel = signal<ICommitteeApplicationForm>({
    identity: {
      lastName: '',
      postnom: '',
      firstName: '',
      sex: '',
      birthDate: createEmptyDate(),
      city: '',
      whatsapp: '',
      email: ''
    },
    profile: {
      primaryJobId: '',
      secondaryJobId: '',
      educationLevel: '',
      fieldOfStudy: '',
      professionalSituation: '',
      yearsOfExperience: 0,
      linkedin: ''
    },
    commitment: {
      motivation: '',
      experience: '',
      availability: '',
      cv: ''
    }
  });

  protected readonly applicationForm = form(this.applicationModel, (schemaPath) => {
    disabled(schemaPath, { when: () => this.store.isAlreadyApplied() });

    required(schemaPath.identity.lastName);
    required(schemaPath.identity.postnom);
    required(schemaPath.identity.firstName);
    required(schemaPath.identity.sex);
    validate(schemaPath.identity.birthDate, ({ value }) =>
      Number.isNaN(value().getTime())
        ? { kind: 'required', message: 'La date de naissance est obligatoire.' }
        : undefined
    );
    maxDate(schemaPath.identity.birthDate, this.today);
    required(schemaPath.identity.city);
    required(schemaPath.identity.whatsapp);
    minLength(schemaPath.identity.whatsapp, 8);
    required(schemaPath.identity.email);
    email(schemaPath.identity.email);

    required(schemaPath.profile.primaryJobId);
    validate(schemaPath.profile.secondaryJobId, ({ value, valueOf }) =>
      value() && value() === valueOf(schemaPath.profile.primaryJobId)
        ? { kind: 'sameChoice', message: 'Choisissez deux postes différents.' }
        : undefined
    );
    required(schemaPath.profile.educationLevel);
    required(schemaPath.profile.fieldOfStudy);
    required(schemaPath.profile.professionalSituation);
    min(schemaPath.profile.yearsOfExperience, 0);

    required(schemaPath.commitment.motivation);
    minLength(schemaPath.commitment.motivation, 20);
    required(schemaPath.commitment.experience);
    minLength(schemaPath.commitment.experience, 10);
    required(schemaPath.commitment.availability);
    validate(schemaPath.commitment.cv, ({ value }) => {
      const file = value();
      if (typeof file === 'string') {
        return { kind: 'required', message: 'Le CV PDF est obligatoire.' };
      }

      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      return !isPdf || file.size > 5 * 1024 * 1024
        ? { kind: 'invalidFile', message: 'Choisissez un PDF de 5 Mo maximum.' }
        : undefined;
    });
  });

  protected readonly selectedFileName = computed(() => {
    const cv = this.applicationModel().commitment.cv;
    return typeof cv === 'string' ? '' : cv.name;
  });

  constructor() {
    afterNextRender(() => this.store.initialize('COMMITTEE'));
  }

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0) ?? '';

    this.applicationModel.update((model) => ({
      ...model,
      commitment: { ...model.commitment, cv: file }
    }));
    this.applicationForm.commitment.cv().markAsTouched();
  }

  protected onBirthDateSelected(date: Date | null): void {
    if (!date) return;

    this.applicationModel.update((model) => ({
      ...model,
      identity: { ...model.identity, birthDate: date }
    }));
    this.applicationForm.identity.birthDate().markAsTouched();
  }

  protected selectSex(value: ICommitteeApplicationForm['identity']['sex']): void {
    this.applicationForm.identity.sex().value.set(value);
    this.applicationForm.identity.sex().markAsTouched();
  }

  protected selectPrimaryJob(value: string): void {
    this.applicationForm.profile.primaryJobId().value.set(value);
    this.applicationForm.profile.primaryJobId().markAsTouched();
  }

  protected selectSecondaryJob(value: string): void {
    this.applicationForm.profile.secondaryJobId().value.set(value);
    this.applicationForm.profile.secondaryJobId().markAsTouched();
  }

  protected selectEducationLevel(value: ICommitteeApplicationForm['profile']['educationLevel']): void {
    this.applicationForm.profile.educationLevel().value.set(value);
    this.applicationForm.profile.educationLevel().markAsTouched();
  }

  protected selectProfessionalSituation(value: ICommitteeApplicationForm['profile']['professionalSituation']): void {
    this.applicationForm.profile.professionalSituation().value.set(value);
    this.applicationForm.profile.professionalSituation().markAsTouched();
  }

  protected onSubmit(): void {
    submit(this.applicationForm, async (formState) => {
      const { identity, profile, commitment } = formState().value();
      if (typeof commitment.cv === 'string') return;

      this.store.submitCommittee({
        ...identity,
        ...profile,
        ...commitment,
        birthDate: toIsoDate(identity.birthDate),
        sex: identity.sex as ICommitteeApplicationInput['sex'],
        educationLevel: profile.educationLevel as ICommitteeApplicationInput['educationLevel'],
        professionalSituation: profile.professionalSituation as ICommitteeApplicationInput['professionalSituation'],
        secondaryJobId: profile.secondaryJobId || undefined,
        linkedin: profile.linkedin || undefined,
        cv: commitment.cv
      });
    });
  }
}
