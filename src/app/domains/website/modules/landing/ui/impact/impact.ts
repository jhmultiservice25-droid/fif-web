import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { IMPACT_TARGETS } from '../../data/impact-targets';

@Component({
  selector: 'impact',
  imports: [MatCardModule],
  templateUrl: './impact.html'
})
export class Impact {
  protected readonly impactTargets = IMPACT_TARGETS;
}
