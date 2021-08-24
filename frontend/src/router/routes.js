const routes = [
  {
    name: 'mainPage',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    name: 'loginPage',
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/LoginForm.vue') },
    ],
  },
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/RegisterForm.vue') },
    ],
  },
  {
    path: '/add-recipe',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AddRecipeForm.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
