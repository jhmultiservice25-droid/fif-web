import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { email, form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Message } from '@/app/shared/ui/app-message/app-message';
import { RegisterStore } from '../../data-access/register.store';
import { IRegisterKind, IRegisterPayload } from '../../interfaces';

@Component({
  templateUrl: './register.html',
  providers: [RegisterStore],
  imports: [Message, MatButtonModule, MatIconModule, MatInputModule, FormField, RouterLink]
})
export class AuthRegister implements OnInit {
  private route = inject(ActivatedRoute);

  protected kind = computed(
    () => (this.route.snapshot.data['kind'] as IRegisterKind | undefined) ?? 'organization'
  );

  protected store = inject(RegisterStore);
  protected model = signal<IRegisterPayload>({ email: '', password: '', name: '' });
  protected registerForm = form(this.model, (schemaPath) => {
    required(schemaPath.name);
    required(schemaPath.email);
    email(schemaPath.email);
    required(schemaPath.password);
    minLength(schemaPath.password, 8);
  });
  protected hidePassword = true;

  ngOnInit(): void {
    this.store.clearError();
  }

  protected title(): string {
    return this.kind() === 'organization' ? 'Créer un compte organisation' : 'Créer un compte innovateur';
  }

  protected subtitle(): string {
    return this.kind() === 'organization'
      ? 'Vous avez un besoin ou un défi à partager avec l’écosystème FIF.'
      : 'Vous proposez une solution ou un projet innovant.';
  }

  protected onRegister(): void {
    submit(this.registerForm, async () => {
      this.store.register({ kind: this.kind(), payload: this.model() });
    });
  }
}