import Home from './Home';
import articleRoutes from './Articles';
import authRoutes from './Auth';
import adminRoutes from './admin';

export default [].concat(
  [{ path: '/', component: Home }],
  articleRoutes,
  authRoutes,
  adminRoutes,
  [{ path: undefined, component: Error }],
);
