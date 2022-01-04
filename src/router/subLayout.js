export default [
  {
    path: 'home',
    name: 'home',
    component: () => import('@/views/common/home/index.vue')
  },
  {
    path: 'productManage',
    name: 'productManage',
    component: () => import('@/views/productList/productManage/index.vue')
  },
  {
    path: 'productTemplate',
    name: 'productTemplate',
    component: () => import('@/views/productList/productTemplate/index.vue')
  },
  {
    path: 'paletteManage',
    name: 'paletteManage',
    component: () => import('@/views/paletteList/paletteManage/index.vue')
  },
  {
    path: 'paletteTemplate',
    name: 'paletteTemplate',
    component: () => import('@/views/paletteList/paletteTemplate/index.vue')
  },
  {
    path: 'languagesManageCorrespondenceTable',
    name: 'languagesManageCorrespondenceTable',
    component: () => import('@/views/languagesManage/correspondenceTable/index.vue')
  }
]
