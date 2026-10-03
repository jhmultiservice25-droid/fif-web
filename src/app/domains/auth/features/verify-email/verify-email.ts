import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  templateUrl: './verify-email.html',
  imports: [MatButtonModule, MatInputModule, RouterLink]
})
export class AuthVerifyEmail {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly email = signal(this.route.snapshot.queryParamMap.get('email')?.trim().toLowerCase() ?? '');
  protected readonly otp = signal('');
  protected readonly isLoading = signal(false);
  protected readonly isResending = signal(false);
  protected readonly error = signal('');
  protected readonly message = signal('');

  protected onOtpInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '').slice(0, 6);
    input.value = value;
    this.otp.set(value);
    this.error.set('');
  }

  protected verify(): void {
    if (!this.email()) {
      this.error.set('Adresse e-mail manquante. Recommencez votre inscription.');
      return;
    }
    if (this.otp().length !== 6) {
      this.error.set('Saisissez le code à 6 chiffres reçu par e-mail.');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');
    this.message.set('');

    this.http
      .post('/api/auth/email-otp/verify-email', {
        email: this.email(),
        otp: this.otp()
      })
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          void this.router.navigate(['/auth/connexion'], {
            queryParams: { verified: '1', email: this.email() }
          });
        },
        error: (error) => {
          this.isLoading.set(false);
          this.error.set(error?.error?.message ?? 'Code invalide ou expiré. Demandez un nouveau code.');
        }
      });
  }

  protected resend(): void {
    if (!this.email()) {
      this.error.set('Adresse e-mail manquante. Recommencez votre inscription.');
      return;
    }

    this.isResending.set(true);
    this.error.set('');
    this.message.set('');

    this.http
      .post('/api/auth/email-otp/send-verification-otp', {
        email: this.email(),
        type: 'email-verification'
      })
      .subscribe({
        next: () => {
          this.isResending.set(false);
          this.message.set('Un nouveau code vient d’être envoyé à votre adresse e-mail.');
        },
        error: (error) => {
          this.isResending.set(false);
          this.error.set(error?.error?.message ?? 'Impossible de renvoyer le code pour le moment.');
        }
      });
  }
}
