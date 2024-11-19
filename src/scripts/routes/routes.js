const routes = {
  '/': () => import('../views/pages/home' /* webpackChunkName: "home" */),
  '/favorite': () => import('../views/pages/favorite' /* webpackChunkName: "favorite" */),
  '/detail/:id': () => import('../views/pages/detail' /* webpackChunkName: "detail" */),
};

export default routes;
