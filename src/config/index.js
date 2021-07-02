/**
 * @description This is it will handle authentication to get sidebar menu allow for user
 */
import { handleCheckRoleToShow, checkPermissions } from '@/middleware/auth';

/**
 * @description All menu app
 */
const mapSidebarMenu = [
  {
    name: 'Dashboard',
    link: '/',
    icon: 'tachometer-alt',
    roles: true,
  },
  {
    name: 'Catalog',
    icon: 'tags',
    roles: true,
    children: [
      {
        name: 'Categories',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_category_group', 'view_category_sub_group', 'view_category']),
        children: [
          {
            name: 'Group',
            link: '/catalog/category-group',
            icon: 'angle-right',
            roles: checkPermissions(['view_category_group']),
          },
          {
            name: 'Sub-group',
            link: '/catalog/category-sub-group',
            icon: 'angle-right',
            roles: checkPermissions(['view_category_sub_group']),
          },
          {
            name: 'Categories',
            link: '/catalog/category',
            icon: 'angle-right',
            roles: checkPermissions(['view_category']),
          }
        ]
      },
      {
        name: 'Products',
        link: '/catalog/product',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_product']),
      },
      {
        name: 'Manufacturers',
        link: '/catalog/manufacturer',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_manufacturer']),
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
        roles: checkPermissions(['view_inventory']),
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
        roles: checkPermissions(['view_user', 'super_admin']),
      },
      {
        name: 'Customers',
        link: '/admin/customer',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_customer', 'super_admin']),
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
        roles: checkPermissions(['view_merchant', 'super_admin']),
      },
      {
        name: 'Shops',
        link: '/vendor/shop',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_shop', 'super_admin']),
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
        roles: checkPermissions(['view_banner', 'super_admin']),
      },
      {
        name: 'Sliders',
        link: '/appearance/slider',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_slider', 'super_admin']),
      },
      {
        name: 'Theme Options',
        link: '/appearance/theme/option',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_theme', 'super_admin']),
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
        roles: checkPermissions(['view_faq', 'super_admin']),
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
        roles: checkPermissions(['view_role', 'super_admin']),
      },
      {
        name: 'System settings',
        link: '/setting/system/general',
        icon: 'angle-double-right',
        roles: checkPermissions(['view_system', 'super_admin']),
      }
    ]
  }
];

export {
  mapSidebarMenu,
};