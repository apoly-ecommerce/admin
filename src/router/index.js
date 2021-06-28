import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Layouts
import Layout from '@/layouts';

/**
 * @type ConstantRoutes
 *
 * @description
 *  - A base page that does not have permission requirements
 *  - All roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard/index'),
        meta: { title: 'Dashboard' }
      }
    ]
  },
  {
    path: '/404',
    name: 'error-404',
    component: () => import('@/views/Error404')
  },
  {
    path: '/401',
    name: 'error-401',
    component: () => import('@/views/Error401')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/profile',
    name: 'profile',
    component: Layout,
    redirect: '/profile/me',
    children: [
      {
        path: 'me',
        component: () => import('@/views/Profile')
      }
    ]
  }
];

/**
 * @type AsyncRoutes
 * @description
 *  - The routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/catalog/category-group',
    component: Layout,
    redirect: '/category-group/',
    meta: { title: 'Nhóm danh mục' },
    children: [
      {
        path: '',
        name: 'list-category-group',
        component: () => import('@/views/CategoryGroups/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-category-group',
        component: () => import('@/views/CategoryGroups/components/FormCategoryGroup'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-category-group',
        component: () => import('@/views/CategoryGroups/components/FormCategoryGroup'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/category-sub-group',
    component: Layout,
    redirect: '/category-sub-group/',
    meta: { title: 'Nhóm danh mục phụ' },
    children: [
      {
        path: '',
        name: 'list-category-sub-group',
        component: () => import('@/views/CategorySubGroups/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-category-sub-group',
        component: () => import('@/views/CategorySubGroups/components/FormCategorySubGroup'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-category-sub-group',
        component: () => import('@/views/CategorySubGroups/components/FormCategorySubGroup'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/category',
    component: Layout,
    redirect: '/category',
    meta: { title: 'Category' },
    children: [
      {
        path: '',
        name: 'list-category',
        component: () => import('@/views/Categories/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-category',
        component: () => import('@/views/Categories/components/FormCategory'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-category',
        component: () => import('@/views/Categories/components/FormCategory'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/product',
    component: Layout,
    redirect: '/product/',
    meta: { title: 'Product' },
    children: [
      {
        path: '',
        name: 'list-product',
        component: () => import('@/views/Products/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-product',
        component: () => import('@/views/Products/components/FormProduct'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-product',
        component: () => import('@/views/Products/components/FormProduct'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/manufacturer',
    component: Layout,
    redirect: '/manufacturer/',
    meta: { title: 'Nhà cung cấp' },
    children: [
      {
        path: '',
        name: 'list-manufacturer',
        component: () => import('@/views/Manufacturers/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-manufacturer',
        component: () => import('@/views/Manufacturers/components/FormManufacturer'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-manufacturer',
        component: () => import('@/views/Manufacturers/components/FormManufacturer'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/admin/user',
    component: Layout,
    redirect: '/user/',
    meta: { title: 'User' },
    children: [
      {
        path: '',
        name: 'list-user',
        component: () => import('@/views/Users/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-user',
        component: () => import('@/views/Users/Components/FormUser'),
        meta: { title: 'Thêm mới' },
      },
      {
        path: 'update/:id',
        name: 'update-user',
        component: () => import('@/views/Users/Components/FormUser'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/admin/customer',
    component: Layout,
    redirect: '/user/',
    meta: { title: 'Khách hàng' },
    children: [
      {
        path: '',
        name: 'list-customer',
        component: () => import('@/views/Customers/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-customer',
        component: () => import('@/views/Customers/Components/FormCustomer'),
        meta: { title: 'Thêm mới' },
      },
      {
        path: 'update/:id',
        name: 'update-customer',
        component: () => import('@/views/Customers/Components/FormCustomer'),
        meta: { title: 'Cập nhật' }
      }
    ],
  },
  {
    path: '/address/addresses/:addressable_type/:addressable_id',
    component: Layout,
    redirect: '/address/',
    meta: { title: 'Địa chỉ'},
    children: [
      {
        path: '',
        name: 'list-address',
        component: () => import('@/views/Addresses/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-address',
        component: () => import('@/views/Addresses/Components/FormAddress'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-address',
        component: () => import('@/views/Addresses/Components/FormAddress'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/vendor/merchant',
    component: Layout,
    redirect: '/merchant/',
    meta: { title: 'Người buôn bán' },
    children: [
      {
        path: '',
        name: 'list-merchant',
        component: () => import('@/views/Merchants/index'),
        meta: { title: 'Danh sách'}
      },
      {
        path: 'add',
        name: 'add-merchant',
        component: () => import('@/views/Merchants/components/FormMerchant'),
        meta: { title: 'Thêm mới'}
      },
      {
        path: 'update/:id',
        name: 'update-merchant',
        component: () => import('@/views/Merchants/components/FormUserMerchant'),
        meta: { title: 'Cập nhật'}
      }
    ]
  },
  {
    path: '/vendor/shop',
    component: Layout,
    redirect: '/shop/',
    meta: { title: 'Cửa hàng' },
    children: [
      {
        path: '',
        name: 'list-shop',
        component: () => import('@/views/Shops/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-shop',
        component: () => import('@/views/Merchants/components/FormMerchant'),
        meta: { title: 'Thêm mới'}
      },
      {
        path: 'update/:id',
        name: 'update-shop',
        component: () => import('@/views/Shops/components/FormShop'),
        meta: { title: 'Cập nhật'}
      }
    ]
  },
  {
    path: '/appearance/banner',
    component: Layout,
    redirect: '/banner/',
    meta: { title: 'Banner' },
    children: [
      {
        path: '',
        name: 'list-banner',
        component: () => import('@/views/Banners/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-banner',
        component: () => import('@/views/Banners/components/FormBanner'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-banner',
        component: () => import('@/views/Banners/components/FormBanner'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/appearance/slider',
    component: Layout,
    redirect: '/slider/',
    meta: { title: 'Slider' },
    children: [
      {
        path: '',
        name: 'list-slider',
        component: () => import('@/views/Sliders/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-slider',
        component: () => import('@/views/Sliders/components/FormSlider'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-slider',
        component: () => import('@/views/Sliders/components/FormSlider'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/appearance/theme/option',
    component: Layout,
    redirect: '/theme/option/',
    meta: { title: 'Slider' },
    children: [
      {
        path: '',
        name: 'list-theme-options',
        component: () => import('@/views/ThemeOptions/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'update/featuredBrands',
        name: 'update-featured-brands',
        component: () => import('@/views/ThemeOptions/components/FormFeaturedBrand'),
        meta: { title: 'Nhà cung cấp nổi bậc' }
      },
      {
        path: 'update/trendingNowCategories',
        name: 'update-trending-now-categories',
        component: () => import('@/views/ThemeOptions/components/FormTrendingNowCat'),
        meta: { title: 'Danh mục thịnh hành' }
      },
    ]
  },
  {
    path: '/setting/role',
    component: Layout,
    redirect: '/role/',
    meta: { title: 'Quyền' },
    children: [
      {
        path: '',
        name: 'list-role',
        component: () => import('@/views/Roles/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-role',
        component: () => import('@/views/Roles/Components/FormRole'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-role',
        component: () => import('@/views/Roles/Components/FormRole'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/setting/system/general',
    component: Layout,
    redirect: '/system/general/',
    meta: { title: 'Cấu hình' },
    children: [
      {
        path: '',
        name: 'update-system-general',
        component: () => import('@/views/SettingSystemGenerals/index'),
        meta: { title: 'Cấu hình chung' }
      }
    ]
  },
  {
    path: '/utility/faq',
    component: Layout,
    redirect: '/faq/',
    meta: { title: 'Câu hỏi thường gặp' },
    children: [
      {
        path: '',
        name: 'list-faq',
        component: () => import('@/views/Faqs/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'topic/add',
        name: 'add-faq-topic',
        component: () => import('@/views/Faqs/components/FormFaqTopic'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'topic/update/:id',
        name: 'update-faq-topic',
        component: () => import('@/views/Faqs/components/FormFaqTopic'),
        meta: { title: 'Cập nhật' }
      },
      {
        path: 'add',
        name: 'add-faq',
        component: () => import('@/views/Faqs/components/FormFaq'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'update/:id',
        name: 'update-faq',
        component: () => import('@/views/Faqs/components/FormFaq'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  { path: '*', redirect: '/404' }
];

const routes = [ ...constantRoutes, ...asyncRoutes ];

const createRouter = () => new VueRouter({
  // mode: 'history',
  routes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router.
}

export default router;