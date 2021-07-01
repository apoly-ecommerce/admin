import Layout from '@/layouts';

const adminRoutes = [
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
        path: 'edit/:id',
        name: 'edit-user',
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
        path: 'edit/:id',
        name: 'edit-customer',
        component: () => import('@/views/Customers/Components/FormCustomer'),
        meta: { title: 'Cập nhật' }
      }
    ],
  }
];

export default adminRoutes;