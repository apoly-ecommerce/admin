/**
 * @description This is it will handle authentication to get sidebar menu allow for user
 */
import { handleCheckRoleToShow } from '@/middleware/auth';

/**
 * @description All menu app
 */
const mapSidebarMenu = [
  {
    name: 'Dashboard',
    link: '/',
    icon: 'tachometer-alt',
    roles: true
  },
  {
    name: 'Catalog',
    icon: 'tags',
    roles: true,
    children: [
      {
        name: 'Categories',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
        children: [
          {
            name: 'Group',
            link: '/catalog/category-group',
            icon: 'angle-right',
            roles: true,
          },
          {
            name: 'Sub-group',
            link: '/catalog/category-sub-group',
            icon: 'angle-right',
            roles: true
          },
          {
            name: 'Categories',
            link: '/catalog/category',
            icon: 'angle-right',
            roles: true
          }
        ]
      },
      {
        name: 'Products',
        link: '/catalog/product',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor'])
      },
      {
        name: 'Manufacturers',
        link: '/catalog/manufacturer',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor'])
      },
    ]
  },
  {
    name: 'Admin',
    icon: 'user-secret',
    roles: handleCheckRoleToShow(['admin', 'editor']),
    children: [
      {
        name: 'Users',
        link: '/users',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      },
      {
        name: 'Customers',
        link: '/customers',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor'])
      }
    ]
  },
  {
    name: 'Settings',
    icon: 'cogs',
    roles: handleCheckRoleToShow(['admin', 'editor']),
    children: [
      {
        name: 'User roles',
        link: '/roles',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      },
      {
        name: 'System settings',
        link: '/',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      },
      {
        name: 'Configuration',
        link: '/',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      },
      {
        name: 'Business area',
        link: '/',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      },
      {
        name: 'Currencies',
        link: '/',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      },
      {
        name: 'Languages',
        link: '/',
        icon: 'angle-double-right',
        roles: handleCheckRoleToShow(['admin', 'editor']),
      }
    ]
  }
];

export {
  mapSidebarMenu,
};