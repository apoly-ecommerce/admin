import Layout from '@/layouts';

const settingRoutes = [
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
        path: 'edit/:id',
        name: 'edit-role',
        component: () => import('@/views/Roles/Components/FormRole'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/setting/system/general',
    component: Layout,
    redirect: '/system/general/',
    meta: { title: 'Cấu hình hệ thống' },
    children: [
      {
        path: '',
        name: 'edit-system-general',
        component: () => import('@/views/SettingSystemGenerals/index'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/setting/general',
    component: Layout,
    redirect: '/general/',
    meta: { title: 'Cấu hình hệ thống' },
    children: [
      {
        path: '',
        name: 'edit-general',
        component: () => import('@/views/SettingGenerals/index'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/setting/shopConfig',
    component: Layout,
    redirect: '/shopConfig/',
    meta: { title: 'Cấu hình shop' },
    children: [
      {
        path: '',
        name: 'edit-config',
        component: () => import('@/views/ShopConfigurationSettings/index'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/setting/systemConfig',
    component: Layout,
    redirect: '/systemConfig/',
    meta: { title: 'Cấu hình hệ thống' },
    children: [
      {
        path: '',
        name: 'edit-system-config',
        component: () => import('@/views/SystemConfigurationSettings/index'),
        meta: { title: 'Cập nhật' }
      }
    ]
  }
];

export default settingRoutes