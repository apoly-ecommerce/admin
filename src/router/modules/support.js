import Layout from '@/layouts';

const supportRoutes = [
  {
    path: '/support/message',
    component: Layout,
    redirect: '/message/',
    children: [
      {
        path: '',
        name: 'message',
        component: () => import('@/views/Messages/index')
      }
    ]
  }
];

export default supportRoutes;