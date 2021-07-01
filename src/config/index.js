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
        roles: true,
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
        roles: true
      },
      {
        name: 'Manufacturers',
        link: '/catalog/manufacturer',
        icon: 'angle-double-right',
        roles: true
      },
    ]
  },
  {
    name: 'Stock',
    icon: 'user-secret',
    roles: true,
    children: [
      {
        name: 'Inventories',
        link: '/stock/inventory',
        icon: 'angle-double-right',
        roles: true,
      }
,    ]
  },
  {
    name: 'Admin',
    icon: 'user-secret',
    roles: true,
    children: [
      {
        name: 'User',
        link: '/admin/user',
        icon: 'angle-double-right',
        roles: true,
      },
      {
        name: 'Customers',
        link: '/admin/customer',
        icon: 'angle-double-right',
        roles: true,
      },
    ]
  },
  {
    name: 'Vendor',
    icon: 'user-secret',
    roles: true,
    children: [
      {
        name: 'Merchants',
        link: '/vendor/merchant',
        icon: 'angle-double-right',
        roles: true,
      },
      {
        name: 'Shops',
        link: '/vendor/shop',
        icon: 'angle-double-right',
        roles: true,
      },
    ]
  },
  {
    name: 'Appearance',
    icon: 'user-secret',
    roles: true,
    children: [
      {
        name: 'Banners',
        link: '/appearance/banner',
        icon: 'angle-double-right',
        roles: true,
      },
      {
        name: 'Sliders',
        link: '/appearance/slider',
        icon: 'angle-double-right',
        roles: true,
      },
      {
        name: 'Theme Options',
        link: '/appearance/theme/option',
        icon: 'angle-double-right',
        roles: true,
      },
    ]
  },
  {
    name: 'Utilities',
    icon: 'cogs',
    roles: true,
    children: [
      {
        name: 'Faqs',
        link: '/utility/faq',
        icon: 'angle-double-right',
        roles: true,
      }
    ]
  },
  {
    name: 'Settings',
    icon: 'cogs',
    roles: true,
    children: [
      {
        name: 'User roles',
        link: '/setting/role',
        icon: 'angle-double-right',
        roles: true,
      },
      {
        name: 'System settings',
        link: '/setting/system/general',
        icon: 'angle-double-right',
        roles: true,
      }
    ]
  }
];

export {
  mapSidebarMenu,
};