import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-application-hero',
  templateUrl: './application-hero.html',
  imports: [RouterLink, MatButtonModule, MatIconModule]
})
export class ApplicationHero {
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
}
