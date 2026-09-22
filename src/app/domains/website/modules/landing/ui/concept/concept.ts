import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FESTIVAL } from '../../data/festival';
import { MARKETS } from '../../data/markets';

@Component({
  selector: 'concept',
  imports: [MatCardModule],
  templateUrl: './concept.html'
})
export class Concept {
  protected readonly festival = FESTIVAL;
  protected readonly markets = MARKETS;
}
