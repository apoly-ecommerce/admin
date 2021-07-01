import Layout from '@/layouts';

const catalogRoutes = [
  {
    path: '/catalog/category-group',
    component: Layout,
    redirect: '/category-group/',
    meta: { title: 'Nhóm danh mục' },
    children: [
      {
        path: '',
        name: 'list-category-group',
        component: () => import('@/views/CategoryGroups/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-category-group',
        component: () => import('@/views/CategoryGroups/components/FormCategoryGroup'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-category-group',
        component: () => import('@/views/CategoryGroups/components/FormCategoryGroup'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/category-sub-group',
    component: Layout,
    redirect: '/category-sub-group/',
    meta: { title: 'Nhóm danh mục phụ' },
    children: [
      {
        path: '',
        name: 'list-category-sub-group',
        component: () => import('@/views/CategorySubGroups/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-category-sub-group',
        component: () => import('@/views/CategorySubGroups/components/FormCategorySubGroup'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-category-sub-group',
        component: () => import('@/views/CategorySubGroups/components/FormCategorySubGroup'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/category',
    component: Layout,
    redirect: '/category',
    meta: { title: 'Category' },
    children: [
      {
        path: '',
        name: 'list-category',
        component: () => import('@/views/Categories/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-category',
        component: () => import('@/views/Categories/components/FormCategory'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-category',
        component: () => import('@/views/Categories/components/FormCategory'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/product',
    component: Layout,
    redirect: '/product/',
    meta: { title: 'Product' },
    children: [
      {
        path: '',
        name: 'list-product',
        component: () => import('@/views/Products/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-product',
        component: () => import('@/views/Products/components/FormProduct'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-product',
        component: () => import('@/views/Products/components/FormProduct'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/catalog/manufacturer',
    component: Layout,
    redirect: '/manufacturer/',
    meta: { title: 'Nhà cung cấp' },
    children: [
      {
        path: '',
        name: 'list-manufacturer',
        component: () => import('@/views/Manufacturers/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-manufacturer',
        component: () => import('@/views/Manufacturers/components/FormManufacturer'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-manufacturer',
        component: () => import('@/views/Manufacturers/components/FormManufacturer'),
        meta: { title: 'Cập nhật' }
      }
    ]
  }
];

export default catalogRoutes;