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
    path: '/account/profile',
    component: Layout,
    redirect: '/profile/',
    children: [
      {
        path: '',
        name: 'profile',
        component: () => import('@/views/Profile')
      },
      {
        name: 'profile-update-password',
        path: 'updatePassword',
        component: () => import('@/views/Profile/components/FormUpdatePassword')
      }
    ]
  }
];

/**
 * @type AsyncRoutes
 * @description
 *  - The routes that need to be dynamically loaded based on user roles
 */

// Route module. Admin|Merchant
import commonRoutes from './modules/common';
import catalogRoutes from './modules/catalog';
import adminRoutes from './modules/admin';
import addressRoutes from './modules/address';
import vendorRoutes from './modules/vendor';
import appearanceRoutes from './modules/appearance';
import utilityRoutes from './modules/utility';
import settingRoutes from './modules/setting';
import supportRoutes from './modules/support';

// Route modules. Merchant
import stockRoutes from './modules/stock';

export const asyncRoutes = [
  ...commonRoutes,
  ...catalogRoutes,
  ...adminRoutes,
  ...addressRoutes,
  ...vendorRoutes,
  ...appearanceRoutes,
  ...utilityRoutes,
  ...settingRoutes,
  ...stockRoutes,
  ...supportRoutes,
  { path: '*', redirect: '/404' }
];

const routes = [ ...constantRoutes, ...asyncRoutes ];

const createRouter = () => new VueRouter({
  mode: 'history',
  routes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router.
}

export default router;