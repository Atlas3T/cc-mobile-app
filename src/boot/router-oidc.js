import Mgr from './security-oidc';

export default ({ router }) => {
  const mgr = new Mgr();
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth) {
      mgr.getToken().then(
        (sucess) => {
          if (sucess.id_token) {
            next();
          } else {
            next('/accessdenied');
          }
        },
        (err) => {
          console.log(err);
        },
      );
    } else {
      next();
    }
  });
};
