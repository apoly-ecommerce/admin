 export default [
   {
     name: 'Dashboard',
     link: '/',
     icon: 'tachometer-alt',
     roles: [],
   },
   {
     name: 'Catalog',
     icon: 'tags',
     roles: ['view_category_group', 'view_category_sub_group', 'view_category','view_product','view_manufacturer', 'super_admin'],
     children: [
       {
         name: 'Categories',
         icon: 'angle-double-right',
         roles: ['view_category_group', 'view_category_sub_group', 'view_category', 'super_admin'],
         children: [
           {
             name: 'Group',
             link: '/catalog/category-group',
             icon: 'angle-right',
             roles: ['view_category_group', 'super_admin'],
           },
           {
             name: 'Sub-group',
             link: '/catalog/category-sub-group',
             icon: 'angle-right',
             roles: ['view_category_sub_group', 'super_admin'],
           },
           {
             name: 'Categories',
             link: '/catalog/category',
             icon: 'angle-right',
             roles: ['view_category', 'super_admin'],
           }
         ]
       },
       {
         name: 'Products',
         link: '/catalog/product',
         icon: 'angle-double-right',
         roles: ['view_product', 'super_admin'],
       },
       {
         name: 'Manufacturers',
         link: '/catalog/manufacturer',
         icon: 'angle-double-right',
         roles: ['view_manufacturer', 'super_admin'],
       },
     ]
   },
   {
     name: 'Stock',
     icon: 'user-secret',
     roles: ['view_inventory'],
     children: [
       {
         name: 'Inventories',
         link: '/stock/inventory',
         icon: 'angle-double-right',
         roles: ['view_inventory'],
       }
 ,    ]
   },
   {
     name: 'Admin',
     icon: 'user-secret',
     roles: ['view_user', 'view_customer', 'super_admin'],
     children: [
       {
         name: 'User',
         link: '/admin/user',
         icon: 'angle-double-right',
         roles: ['view_user', 'super_admin'],
       },
       {
         name: 'Customers',
         link: '/admin/customer',
         icon: 'angle-double-right',
         roles: ['view_customer', 'super_admin'],
       },
     ]
   },
   {
     name: 'Vendor',
     icon: 'user-secret',
     roles: ['view_merchant', 'view_shop', 'super_admin'],
     children: [
       {
         name: 'Merchants',
         link: '/vendor/merchant',
         icon: 'angle-double-right',
         roles: ['view_merchant', 'super_admin'],
       },
       {
         name: 'Shops',
         link: '/vendor/shop',
         icon: 'angle-double-right',
         roles: ['view_shop', 'super_admin'],
       },
     ]
   },
   {
     name: 'Appearance',
     icon: 'user-secret',
     roles: ['view_banner', 'view_slider', 'view_theme', 'super_admin'],
     children: [
       {
         name: 'Banners',
         link: '/appearance/banner',
         icon: 'angle-double-right',
         roles: ['view_banner', 'super_admin'],
       },
       {
         name: 'Sliders',
         link: '/appearance/slider',
         icon: 'angle-double-right',
         roles: ['view_slider', 'super_admin'],
       },
       {
         name: 'Theme Options',
         link: '/appearance/theme/option',
         icon: 'angle-double-right',
         roles: ['view_theme', 'super_admin'],
       },
     ]
   },
   {
     name: 'Utilities',
     icon: 'cogs',
     roles: ['view_faq', 'super_admin'],
     children: [
       {
         name: 'Faqs',
         link: '/utility/faq',
         icon: 'angle-double-right',
         roles: ['view_faq', 'super_admin'],
       }
     ]
   },
   {
     name: 'Settings',
     icon: 'cogs',
     roles: ['view_role', 'view_system', 'super_admin', 'view_config'],
     children: [
       {
         name: 'User roles',
         link: '/setting/role',
         icon: 'angle-double-right',
         roles: ['view_role', 'super_admin'],
       },
       {
         name: 'System settings',
         link: '/setting/system/general',
         icon: 'angle-double-right',
         roles: ['view_system', 'super_admin'],
       },
       {
        name: 'General config',
        link: '/setting/general',
        icon: 'angle-double-right',
        roles: ['view_config'],
      },
      {
        name: 'Configuration',
        link: '/setting/shopConfig',
        icon: 'angle-double-right',
        roles: ['view_config'],
      }
     ]
   }
 ];