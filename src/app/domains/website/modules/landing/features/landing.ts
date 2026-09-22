import { Component } from '@angular/core';
import { Hero } from '../ui/hero/hero';
import { Concept } from '../ui/concept/concept';
import { Experiences } from '../ui/experiences/experiences';
import { Impact } from '../ui/impact/impact';

@Component({
  imports: [Hero, Concept, Experiences, Impact],
  templateUrl: './landing.html'
})
export default class Landing {}
