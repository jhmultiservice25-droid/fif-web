import { INavigationLink } from '../interfaces/navigation.interface';

export const NAVIGATION_LINKS: readonly INavigationLink[] = [
  { name: 'Accueil', path: '/', icon: 'house' },
  { name: 'Concept', path: '/', fragment: 'concept', icon: 'info' },
  { name: 'Expériences', path: '/', fragment: 'experience', icon: 'award' },
  { name: 'Programme', path: '/', fragment: 'programme', icon: 'calendar' },
  { name: 'Participer', path: '/applications/participant', icon: 'ticket' },
  { name: 'Impact', path: '/', fragment: 'impact', icon: 'target' },
  { name: 'Espace participants', path: '/auth/choice', icon: 'target' }
];
