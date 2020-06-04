import Home from './Home';
import ModuleHome from './ModuleHome';
import articleRoutes from './Articles';
import authRoutes from './Auth';
import adminRoutes from './admin';
import moduleRoutes from './Modules';

export default [].concat(
  [{ path: '/', component: Home }],
  [{ path: '/modules/home', component: ModuleHome }],
  articleRoutes,
  authRoutes,
  adminRoutes,
  moduleRoutes,
  [{ path: undefined, component: Error }],
);
