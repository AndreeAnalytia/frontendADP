import { NavItem } from './nav-item/nav-item';
export const navItems: NavItem[] = [
  {
    displayName: 'Gestión de Usuarios',
    iconName: 'users',
    route: '/starter',
  },
  {
    displayName: 'Gestión Usuarios ClaveSol',
    iconName: 'users',
    route: '/users-clavesol',
  },
  {
    displayName: 'Documentación APIs',
    iconName: 'link',
    route: '/services',
  },
  {
    displayName: 'Gestión de Logs',
    iconName: 'settings',
    route: '/logs',
  },
  {
    displayName: 'Estadisticas Generales',
    iconName: 'graph',
    route: '/statistics',
  },
  {
    displayName: 'Estadisticas',
    iconName: 'graph',
    route: '/statistics-user',
  },
];
