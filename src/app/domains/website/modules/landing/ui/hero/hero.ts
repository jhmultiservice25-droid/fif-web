import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { FESTIVAL } from '../../data/festival';

@Component({
  selector: 'hero',
  imports: [MatButtonModule, RouterLink],
  templateUrl: './hero.html'
})
export class Hero {
  protected readonly festival = FESTIVAL;
  protected readonly heroImages = [
    '/images/gallery/img-2.jpg',
    '/images/gallery/img-3.jpg',
    '/images/gallery/img-4.jpg',
    '/images/gallery/img-5.jpg'
  ] as const;
}
