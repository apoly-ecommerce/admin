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
    path: '/services',
    component: Layout,
    redirect: '/services/',
    meta: { title: 'Services' },
    children: [
      {
        path: '',
        name: 'list-service',
        component: () => import('@/views/Services/index'),
        meta: { title: 'List Service' },
      },
      {
        path: 'add',
        name: 'add-service',
        component: () => import('@/views/Services/components/FormService'),
        meta: { title: 'Add Service' }
      },
      {
        path: 'update/:id',
        name: 'update-service',
        component: () => import('@/views/Services/components/FormService'),
        meta: { title: 'Update Service' }
      }
    ]
  },
  {
    path: '/city',
    component: Layout,
    redirect: '/city/',
    meta: { title: 'Location' },
    children: [
      {
        path: '',
        name: 'list-city',
        component: () => import('@/views/Locations/City/index'),
        meta: { title: 'List City' }
      },
      {
        path: 'add',
        name: 'add-city',
        component: () => import('@/views/Locations/City/components/FormCity'),
        meta: { title: 'Add City' }
      },
      {
        path: 'update/:id',
        name: 'update-city',
        component: () => import('@/views/Locations/City/components/FormCity'),
        meta: { title: 'Update City' }
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