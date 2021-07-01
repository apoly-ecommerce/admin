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
    meta: { title: 'Cấu hình' },
    children: [
      {
        path: '',
        name: 'edit-system-general',
        component: () => import('@/views/SettingSystemGenerals/index'),
        meta: { title: 'Cấu hình chung' }
      }
    ]
  },
];

export default settingRoutes