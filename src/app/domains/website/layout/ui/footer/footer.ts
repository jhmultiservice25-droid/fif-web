import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './footer.html'
})
export class Footer {
  protected readonly currentYear = new Date().getUTCFullYear();
}
