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

const paginates = {

  /**
   * @of PageServices
   */
  service: {
    currentPage: 1,
    perPage: 10,
    options: [
      { value: 10, text: '10/Page' },
      { value: 20, text: '20/Page' },
      { value: 30, text: '30/Page' },
    ]
  },

  /**
   * @of City Location
   */
  city: {
    currentPage: 1,
    perPage: 10,
    options: [
      { value: 10, text: '10/Page'  },
      { value: 20, text: '20/Page' },
      { value: 30, text: '30/Page' },
    ]
  },

  /**
   * @of Role
   */
  role: {
    currentPage: 1,
    perPage: 10,
    options: [
      { value: 10, text: '10/Page' },
      { value: 20, text: '20/Page' },
      { value: 30, text: '30/Page' },
    ]
  },

  /**
   * @of User
   */
   user: {
    currentPage: 1,
    perPage: 10,
    options: [
      { value: 10, text: '10/Page' },
      { value: 20, text: '20/Page' },
      { value: 30, text: '30/Page' },
    ]
  },

  /**
   * @of Customer
   */
   customer: {
    currentPage: 1,
    perPage: 10,
    options: [
      { value: 10, text: '10/Page' },
      { value: 20, text: '20/Page' },
      { value: 30, text: '30/Page' },
    ]
  }

};

export {
  mapSidebarMenu,
  paginates
};