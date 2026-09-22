import { afterNextRender, Component, inject, signal } from '@angular/core';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink } from '@angular/router';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { ApplicationStore } from '../../data-access';
import { PARTICIPANT_DAYS } from '../../helpers/participant-program';
import { ApplicationHero } from '../../ui/application-hero/application-hero';

interface IParticipantIdentityForm {
  lastName: string;
  postnom: string;
  firstName: string;
  city: string;
  whatsapp: string;
  email: string;
  organization: string;
}

@Component({
  templateUrl: './participant-registration.html',
  providers: [ApplicationStore],
  imports: [
    FormField,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
    Message,
    ApplicationHero
  ]
})
export class ParticipantRegistration {
  protected readonly store = inject(ApplicationStore);
  protected readonly days = PARTICIPANT_DAYS;
  protected readonly selectedDays = signal<string[]>([]);
  protected readonly selectedActivities = signal<string[]>([]);
  protected readonly expandedDays = signal<string[]>([]);

  protected readonly identityModel = signal<IParticipantIdentityForm>({
    lastName: '',
    postnom: '',
    firstName: '',
    city: '',
    whatsapp: '',
    email: '',
    organization: ''
  });

  protected readonly identityForm = form(this.identityModel, (schemaPath) => {
    required(schemaPath.lastName);
    required(schemaPath.postnom);
    required(schemaPath.firstName);
    required(schemaPath.city);
    required(schemaPath.whatsapp);
    minLength(schemaPath.whatsapp, 8);
    required(schemaPath.email);
    email(schemaPath.email);
  });

  constructor() {
    afterNextRender(() => this.store.initialize('PARTICIPANT'));
  }

  protected daySelected(dayId: string): boolean {
    return this.selectedDays().includes(dayId);
  }

  protected dayExpanded(dayId: string): boolean {
    return this.expandedDays().includes(dayId);
  }

  protected activitySelected(activityId: string): boolean {
    return this.selectedActivities().includes(activityId);
  }

  protected selectedActivityCount(dayId: string): number {
    const day = this.days.find((item) => item.id === dayId);
    if (!day) return 0;
    const ids = new Set(day.activities.map((activity) => activity.id));
    return this.selectedActivities().filter((activityId) => ids.has(activityId)).length;
  }

  protected toggleExpandedDay(dayId: string): void {
    this.expandedDays.update((days) =>
      days.includes(dayId) ? days.filter((id) => id !== dayId) : [...days, dayId]
    );
  }

  protected toggleDay(dayId: string): void {
    if (this.daySelected(dayId)) {
      const day = this.days.find((item) => item.id === dayId);
      const activityIds = new Set(day?.activities.map((activity) => activity.id) ?? []);
      this.selectedDays.update((days) => days.filter((id) => id !== dayId));
      this.selectedActivities.update((activities) => activities.filter((id) => !activityIds.has(id)));
      return;
    }

    this.selectedDays.update((days) => [...days, dayId]);
    this.expandedDays.update((days) => (days.includes(dayId) ? days : [...days, dayId]));
  }

  protected selectAllDays(): void {
    this.selectedDays.set(this.days.map((day) => day.id));
    this.expandedDays.set(this.days.map((day) => day.id));
  }

  protected toggleActivity(dayId: string, activityId: string): void {
    if (!this.daySelected(dayId)) {
      this.selectedDays.update((days) => [...days, dayId]);
    }
    this.selectedActivities.update((activities) =>
      activities.includes(activityId)
        ? activities.filter((id) => id !== activityId)
        : [...activities, activityId]
    );
  }

  protected attendanceValid(): boolean {
    const selectedDays = this.selectedDays();
    if (selectedDays.length === 0) return false;

    return selectedDays.every((dayId) => this.selectedActivityCount(dayId) > 0);
  }

  protected onSubmit(): void {
    if (!this.attendanceValid()) return;

    submit(this.identityForm, async (formState) => {
      const identity = formState().value();
      this.store.submitParticipant({
        ...identity,
        organization: identity.organization || undefined,
        selectedDays: this.selectedDays(),
        selectedActivities: this.selectedActivities()
      });
    });
  }
}
