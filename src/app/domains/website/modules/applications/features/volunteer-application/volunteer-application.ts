import { afterNextRender, Component, inject, signal } from '@angular/core';
import {
  disabled,
  email,
  form,
  FormField,
  maxDate,
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
import { IVolunteerApplicationInput } from '@/app/shared/interfaces';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { ApplicationStore } from '../../data-access';
import { createEmptyDate, toIsoDate } from '../../helpers/application-date';
import { EDUCATION_LEVEL_OPTIONS, SEX_OPTIONS, VOLUNTEER_TEAMS } from '../../helpers/application-options';
import { countWords } from '../../helpers/application-validators';
import { IVolunteerApplicationForm } from '../../interfaces';
import { ApplicationHero } from '../../ui/application-hero/application-hero';

@Component({
  templateUrl: './volunteer-application.html',
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
export class VolunteerApplication {
  protected readonly store = inject(ApplicationStore);
  protected readonly sexOptions = SEX_OPTIONS;
  protected readonly educationOptions = EDUCATION_LEVEL_OPTIONS;
  protected readonly teams = VOLUNTEER_TEAMS;
  protected readonly today = new Date();

  protected readonly applicationModel = signal<IVolunteerApplicationForm>({
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
      organization: '',
      educationLevel: '',
      fieldOfStudy: '',
      primaryTeamId: '',
      secondaryTeamId: '',
      skills: '',
      languages: ''
    },
    commitment: {
      eventExperience: '',
      availability: '',
      motivation: ''
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

    required(schemaPath.profile.educationLevel);
    required(schemaPath.profile.fieldOfStudy);
    required(schemaPath.profile.primaryTeamId);
    validate(schemaPath.profile.secondaryTeamId, ({ value, valueOf }) =>
      value() && value() === valueOf(schemaPath.profile.primaryTeamId)
        ? { kind: 'sameChoice', message: 'Choisissez deux équipes différentes.' }
        : undefined
    );
    required(schemaPath.profile.languages);

    required(schemaPath.commitment.availability);
    required(schemaPath.commitment.motivation);
    minLength(schemaPath.commitment.motivation, 20);
    validate(schemaPath.commitment.motivation, ({ value }) =>
      countWords(value()) > 150
        ? { kind: 'maxWords', message: 'La motivation ne peut pas dépasser 150 mots.' }
        : undefined
    );
  });

  constructor() {
    afterNextRender(() => this.store.initialize('VOLUNTEER'));
  }

  protected onBirthDateSelected(date: Date | null): void {
    if (!date) return;

    this.applicationModel.update((model) => ({
      ...model,
      identity: { ...model.identity, birthDate: date }
    }));
    this.applicationForm.identity.birthDate().markAsTouched();
  }

  protected selectSex(value: IVolunteerApplicationForm['identity']['sex']): void {
    this.applicationForm.identity.sex().value.set(value);
    this.applicationForm.identity.sex().markAsTouched();
  }

  protected selectEducationLevel(value: IVolunteerApplicationForm['profile']['educationLevel']): void {
    this.applicationForm.profile.educationLevel().value.set(value);
    this.applicationForm.profile.educationLevel().markAsTouched();
  }

  protected selectPrimaryTeam(value: IVolunteerApplicationForm['profile']['primaryTeamId']): void {
    this.applicationForm.profile.primaryTeamId().value.set(value);
    this.applicationForm.profile.primaryTeamId().markAsTouched();
  }

  protected selectSecondaryTeam(value: IVolunteerApplicationForm['profile']['secondaryTeamId']): void {
    this.applicationForm.profile.secondaryTeamId().value.set(value);
    this.applicationForm.profile.secondaryTeamId().markAsTouched();
  }

  protected onSubmit(): void {
    submit(this.applicationForm, async (formState) => {
      const { identity, profile, commitment } = formState().value();

      this.store.submitVolunteer({
        ...identity,
        ...profile,
        ...commitment,
        birthDate: toIsoDate(identity.birthDate),
        sex: identity.sex as IVolunteerApplicationInput['sex'],
        educationLevel: profile.educationLevel as IVolunteerApplicationInput['educationLevel'],
        primaryTeamId: profile.primaryTeamId as IVolunteerApplicationInput['primaryTeamId'],
        secondaryTeamId: profile.secondaryTeamId || undefined,
        organization: profile.organization || undefined,
        skills: profile.skills || undefined,
        eventExperience: commitment.eventExperience || undefined
      });
    });
  }
}
