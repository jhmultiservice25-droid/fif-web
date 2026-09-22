import { NavigationItem } from '@/app/domains/admin/layout/data/navigation';

export const ORGANIZATION_NAVIGATION: NavigationItem[] = [
  {
    id: 'organization-space',
    label: 'Organisation',
    description: 'Gérez votre profil et vos fiches de besoin',
    children: [
      {
        id: 'profile',
        label: 'Profil',
        icon: 'building-2',
        route: '/organisation/profil',
        activeOptions: { exact: true }
      },
      {
        id: 'needs',
        label: 'Fiches de besoin',
        icon: 'files',
        route: '/organisation/fiches',
        activeOptions: { exact: false }
      },
      {
        id: 'matches',
        label: 'Correspondances',
        icon: 'sparkles',
        route: '/organisation/correspondances',
        activeOptions: { exact: true }
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'bell',
        route: '/organisation/notifications',
        activeOptions: { exact: true }
      }
    ]
  }
];
