import Layout from '@/layouts';

const vendorRoutes = [
  {
    path: '/vendor/merchant',
    component: Layout,
    redirect: '/merchant/',
    meta: { title: 'Người buôn bán' },
    children: [
      {
        path: '',
        name: 'list-merchant',
        component: () => import('@/views/Merchants/index'),
        meta: { title: 'Danh sách'}
      },
      {
        path: 'add',
        name: 'add-merchant',
        component: () => import('@/views/Merchants/components/FormMerchant'),
        meta: { title: 'Thêm mới'}
      },
      {
        path: 'edit/:id',
        name: 'edit-merchant',
        component: () => import('@/views/Merchants/components/FormUserMerchant'),
        meta: { title: 'Cập nhật'}
      }
    ]
  },
  {
    path: '/vendor/shop',
    component: Layout,
    redirect: '/shop/',
    meta: { title: 'Cửa hàng' },
    children: [
      {
        path: '',
        name: 'list-shop',
        component: () => import('@/views/Shops/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-shop',
        component: () => import('@/views/Merchants/components/FormMerchant'),
        meta: { title: 'Thêm mới'}
      },
      {
        path: 'edit/:id',
        name: 'edit-shop',
        component: () => import('@/views/Shops/components/FormShop'),
        meta: { title: 'Cập nhật'}
      }
    ]
  }
];

export default vendorRoutes;