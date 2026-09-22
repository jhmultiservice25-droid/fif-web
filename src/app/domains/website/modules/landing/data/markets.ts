import { IMarket } from '../interfaces';

export const MARKETS: IMarket[] = [
  {
    kicker: 'Je construis',
    title: 'Marché des solutions',
    actions: 'Exposer · Démontrer · Vendre',
    description: 'Startups et entreprises présentent leurs solutions aux décideurs, clients et partenaires.'
  },
  {
    kicker: 'Je sais faire',
    title: 'Marché des talents',
    actions: 'Montrer · Rencontrer · Être recruté',
    description:
      'Développeurs, designers, data scientists, experts IA, cloud et cybersécurité rendent leurs compétences visibles.'
  },
  {
    kicker: 'Je veux apprendre',
    title: 'Marché des compétences',
    actions: 'Apprendre · Pratiquer · Progresser',
    description: 'Masterclasses et ateliers donnent aux jeunes des compétences immédiatement mobilisables.'
  }
];
