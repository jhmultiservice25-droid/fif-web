import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

interface IBadgeData {
  id: string;
  fullName: string;
  organization: string | null;
  selectedDays: string[];
  selectedActivities: string[];
  badgeEligible: boolean;
}

@Component({
  templateUrl: './participant-badge.html',
  imports: [MatButtonModule, RouterLink]
})
export class ParticipantBadge {
  private readonly http = inject(HttpClient);
  protected readonly badge = signal<IBadgeData | null>(null);
  protected readonly error = signal('');
  protected readonly isLoading = signal(false);

  protected generate(): void {
    const id = window.localStorage.getItem('fif.participant.id');
    if (!id) {
      this.error.set('Aucune inscription participant n’a été trouvée sur cet appareil.');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');
    this.http.post<IBadgeData>(`/applications/participant/${encodeURIComponent(id)}/badge`, {}).subscribe({
      next: (badge) => {
        this.badge.set(badge);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.error.set(error?.error?.message ?? 'La génération du badge est impossible.');
        this.isLoading.set(false);
      }
    });
  }

  protected printBadge(): void {
    window.print();
  }
}
