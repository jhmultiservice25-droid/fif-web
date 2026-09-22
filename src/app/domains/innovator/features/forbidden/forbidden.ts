import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  template: `
    <div class="mx-auto max-w-lg p-10 text-center">
      <h1 class="text-2xl font-semibold">Accès refusé</h1>
      <p class="mt-2 text-gray-500">Cet espace est réservé aux comptes innovateur.</p>
      <a matButton="filled" class="mt-6" routerLink="/">Retour à l’accueil</a>
    </div>
  `,
  imports: [MatButtonModule, RouterLink]
})
export default class InnovatorForbidden {}
