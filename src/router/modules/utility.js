import Layout from '@/layouts';

const utilityRoutes = [
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
        path: 'topic/edit/:id',
        name: 'edit-faq-topic',
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
        path: 'edit/:id',
        name: 'edit-faq',
        component: () => import('@/views/Faqs/components/FormFaq'),
        meta: { title: 'Cập nhật' }
      }
    ]
  }
];

export default utilityRoutes;