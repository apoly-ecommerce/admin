import Layout from '@/layouts';

const supportRoutes = [
  {
    path: '/support/message',
    component: Layout,
    redirect: '/message/',
    children: [
      {
        path: '',
        name: 'list-message',
        component: () => import('@/views/Messages/index')
      },
      {
        path: 'group/create',
        name: 'create-group',
        component: () => import('@/views/Messages/FormComponents/FormCreateChatRoom.vue')
      }
    ]
  }
];

export default supportRoutes;