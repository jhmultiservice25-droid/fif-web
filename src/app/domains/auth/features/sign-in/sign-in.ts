import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { SignInStore } from '../../data-access/sign-in.store';
import { ISignInPayload } from '../../interfaces';

@Component({
  templateUrl: './sign-in.html',
  providers: [SignInStore],
  imports: [Message, MatButtonModule, MatIconModule, MatInputModule, FormField, RouterLink]
})
export class AuthSignIn {
  protected store = inject(SignInStore);
  protected signInModel = signal<ISignInPayload>({ email: '', password: '' });
  protected signInForm = form(this.signInModel, (schemaPath) => {
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.password);
  });
  protected hidePassword = true;

  protected onSignIn(): void {
    submit(this.signInForm, async (form) => {
      this.store.signIn(form().value());
    });
  }
}
