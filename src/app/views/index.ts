import Home from './Home';
import articleRoutes from './Articles';
import authRoutes from './Auth';

export default [].concat(
  [{ path: '/', component: Home }],
  articleRoutes,
  authRoutes,
  [{ path: undefined, component: Error }],
);
