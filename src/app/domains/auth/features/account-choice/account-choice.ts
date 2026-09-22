import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: './account-choice.html',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink]
})
export class AuthAccountChoice {}
