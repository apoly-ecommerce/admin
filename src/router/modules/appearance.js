import Layout from '@/layouts';

const appearanceRoutes = [
  {
    path: '/appearance/banner',
    component: Layout,
    redirect: '/banner/',
    meta: { title: 'Banner' },
    children: [
      {
        path: '',
        name: 'list-banner',
        component: () => import('@/views/Banners/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-banner',
        component: () => import('@/views/Banners/components/FormBanner'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-banner',
        component: () => import('@/views/Banners/components/FormBanner'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/appearance/slider',
    component: Layout,
    redirect: '/slider/',
    meta: { title: 'Slider' },
    children: [
      {
        path: '',
        name: 'list-slider',
        component: () => import('@/views/Sliders/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'add',
        name: 'add-slider',
        component: () => import('@/views/Sliders/components/FormSlider'),
        meta: { title: 'Thêm mới' }
      },
      {
        path: 'edit/:id',
        name: 'edit-slider',
        component: () => import('@/views/Sliders/components/FormSlider'),
        meta: { title: 'Cập nhật' }
      }
    ]
  },
  {
    path: '/appearance/theme/option',
    component: Layout,
    redirect: '/theme/option/',
    meta: { title: 'Slider' },
    children: [
      {
        path: '',
        name: 'list-theme-options',
        component: () => import('@/views/ThemeOptions/index'),
        meta: { title: 'Danh sách' }
      },
      {
        path: 'edit/featuredBrands',
        name: 'edit-featured-brands',
        component: () => import('@/views/ThemeOptions/components/FormFeaturedBrand'),
        meta: { title: 'Nhà cung cấp nổi bậc' }
      },
      {
        path: 'edit/trendingNowCategories',
        name: 'edit-trending-now-categories',
        component: () => import('@/views/ThemeOptions/components/FormTrendingNowCat'),
        meta: { title: 'Danh mục thịnh hành' }
      },
    ]
  },
];

export default appearanceRoutes;