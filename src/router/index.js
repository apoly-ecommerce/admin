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
        meta: { title: 'Danh sách nhóm danh mục phụ' }
      },
      {
        path: 'add',
        name: 'add-category-sub-group',
        component: () => import('@/views/CategorySubGroups/components/FormCategorySubGroup'),
        meta: { title: 'Thêm nhóm danh mục phụ' }
      },
      {
        path: 'update/:id',
        name: 'update-category-sub-group',
        component: () => import('@/views/CategorySubGroups/components/FormCategorySubGroup'),
        meta: { title: 'Cập nhật nhóm danh mục phụ' }
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
        meta: { title: 'Danh sách danh mục' }
      },
      {
        path: 'add',
        name: 'add-category',
        component: () => import('@/views/Categories/components/FormCategory'),
        meta: { title: 'Thêm danh mục' }
      },
      {
        path: 'update/:id',
        name: 'update-category',
        component: () => import('@/views/Categories/components/FormCategory'),
        meta: { title: 'Cập nhật danh mục' }
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
        meta: { title: 'Danh sách sản phẩm' }
      },
      {
        path: 'add',
        name: 'add-product',
        component: () => import('@/views/Products/components/FormProduct'),
        meta: { title: 'Thêm sản phẩm' }
      },
      {
        path: 'update/:id',
        name: 'update-product',
        component: () => import('@/views/Products/components/FormProduct'),
        meta: { title: 'Cập nhật sản phẩm' }
      }
    ]
  },
  {
    path: '/catalog/manufacturer',
    component: Layout,
    redirect: '/manufacturer/',
    meta: { title: 'Manufacturer' },
    children: [
      {
        path: '',
        name: 'list-manufacturer',
        component: () => import('@/views/Manufacturers/index'),
        meta: { title: 'Danh sách nhà cung cấp' }
      },
      {
        path: 'add',
        name: 'add-manufacturer',
        component: () => import('@/views/Manufacturers/components/FormManufacturer'),
        meta: { title: 'Thêm nhà cung cấp' }
      },
      {
        path: 'update/:id',
        name: 'update-manufacturer',
        component: () => import('@/views/Manufacturers/components/FormManufacturer'),
        meta: { title: 'Cập nhật nhà cung cấp' }
      }
    ]
  },
  {
    path: '/roles',
    component: Layout,
    redirect: '/roles/',
    meta: { title: 'Roles' },
    children: [
      {
        path: '',
        name: 'list-role',
        component: () => import('@/views/Roles/index'),
        meta: { title: 'List role' }
      },
      {
        path: 'add',
        name: 'add-role',
        component: () => import('@/views/Roles/Components/FormRole'),
        meta: { title: 'Add role' }
      },
      {
        path: 'update/:id',
        name: 'update-role',
        component: () => import('@/views/Roles/Components/FormRole'),
        meta: { title: 'Update role' }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    redirect: '/users/',
    meta: { title: 'Users' },
    children: [
      {
        path: '',
        name: 'list-user',
        component: () => import('@/views/Users/index'),
        meta: { title: 'List user' }
      },
      {
        path: 'add',
        name: 'add-user',
        component: () => import('@/views/Users/Components/FormUser'),
        meta: { title: 'Add user' },
      },
      {
        path: 'update/:id',
        name: 'update-user',
        component: () => import('@/views/Users/Components/FormUser'),
        meta: { title: 'Update role' }
      }
    ]
  },
  {
    path: '/customers',
    component: Layout,
    redirect: '/customers/',
    meta: { title: 'Customers' },
    children: [
      {
        path: '',
        name: 'list-customer',
        component: () => import('@/views/Customers/index'),
        meta: { title: 'List customer' }
      },
      {
        path: 'add',
        name: 'add-customer',
        component: () => import('@/views/Customers/Components/FormCustomer'),
        meta: { title: 'Add customer' }
      },
      {
        path: 'update/:id',
        name: 'update-customer',
        component: () => import('@/views/Customers/Components/FormCustomer'),
        meta: { title: 'Update customer' }
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