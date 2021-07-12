import Layout from '@/layouts';

const commonRoutes = [
  {
    path: '/notifications',
    component: Layout,
    redirect: '/notifications/',
    meta: { title: 'Thông báo' },
    children: [
      {
        path: '',
        name: 'list-notifications',
        component: () => import('@/views/Notifications/index'),
        meta: { title: 'Danh sách' }
      },
    ]
  }
];

export default commonRoutes;