import Layout from '@/layouts';

const addressRouter = [
  {
    path: '/address/addresses/:addressable_type/:addressable_id',
    component: Layout,
    redirect: '/address/',
    meta: { title: 'Địa chỉ'},
    children: [
      {
        path: '',
        name: 'list-address',
        component: () => import('@/views/Addresses/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-address',
        component: () => import('@/views/Addresses/Components/FormAddress'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-address',
        component: () => import('@/views/Addresses/Components/FormAddress'),
        meta: { title: 'Cập nhật' }
      }
    ]
  }
];

export default addressRouter;