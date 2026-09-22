import { NavigationItem } from '@/app/domains/admin/layout/data/navigation';

export const INNOVATOR_NAVIGATION: NavigationItem[] = [
  {
    id: 'innovator-space',
    label: 'Innovateur',
    description: 'Gérez votre profil et vos projets',
    children: [
      {
        id: 'profile',
        label: 'Profil',
        icon: 'user',
        route: '/innovateur/profil',
        activeOptions: { exact: true }
      },
      {
        id: 'projects',
        label: 'Projets',
        icon: 'lightbulb',
        route: '/innovateur/projets',
        activeOptions: { exact: false }
      },
      {
        id: 'matches',
        label: 'Correspondances',
        icon: 'sparkles',
        route: '/innovateur/correspondances',
        activeOptions: { exact: true }
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'bell',
        route: '/innovateur/notifications',
        activeOptions: { exact: true }
      }
    ]
  }
];
