import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EXPERIENCES } from '../../data/experiences';

@Component({
  selector: 'experiences',
  imports: [MatCardModule],
  templateUrl: './experiences.html'
})
export class Experiences {
  protected readonly experiences = EXPERIENCES;
}
