
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Splash/Index.vue') },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/unauthed.vue'),
    children: [
      { path: '/callback', component: () => import('pages/oidc/callback') },
      { path: '/accessdenied', component: () => import('pages/oidc/accessDenied') },
    ],
  },
  {
    path: '/home',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Home') },
    ],
  },
  {
    path: '/recycle',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Recycle') },
    ],
  },
  {
    path: '/location',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Location') },
    ],
  },
  {
    path: '/settings',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Settings') },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/unauthed.vue'),
    children: [
      { path: '', component: () => import('pages/Login') },
    ],
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
