
const routes = [
  {
    path: '/',
    component: () => import('layouts/unauthed.vue'),
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
      {
        name: 'Home', meta: { requiresAuth: true }, path: '', component: () => import('pages/Home'),
      },
    ],
  },
  {
    path: '/rewards',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'market place', path: '', component: () => import('pages/Rewards') },
    ],
  },
  {
    path: '/withdraw',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'withdraw balance', path: '', component: () => import('pages/Withdraw') },
    ],
  },
  {
    path: '/recycle',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Scan') },
    ],
  },
  {
    path: '/location',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'find a return point', path: '', component: () => import('pages/Location') },
    ],
  },
  {
    path: '/settings',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'Settings', path: '', component: () => import('pages/Settings') },
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
