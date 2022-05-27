
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/chat', component: () => import('pages/PageChat.vue') },
      { path: '/auth', component: () => import('pages/PageAuth.vue') },
      { path: '/users', component: () => import('pages/PageUsers.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
