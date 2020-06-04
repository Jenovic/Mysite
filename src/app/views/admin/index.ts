import Admin from './Admin';
// import Login from './Login';
// import ForgotPassword from './ForgotPassword';
import Profile from './Profile';
import Users from './Users';
import Categories from './Categories';
import Modules from './Modules';
import EditModule from './EditModule';
// import Groups from './Groups';
// import Practices from './Practices';
// import Results from './Results';

export default [
  { path: '/admin', component: Admin },
  // { path: '/admin/login', component: Login },
  // {
  //   path: '/admin/forgot-password',
  //   component: ForgotPassword,
  // },
  {
    path: '/admin/profile',
    component: Profile,
  },
  {
    path: '/admin/users',
    component: Users,
  },
  {
    path: '/admin/categories',
    component: Categories,
  },
  {
    path: '/admin/modules',
    component: Modules,
  },
  {
    path: '/admin/modules/:uuid',
    component: EditModule,
  },
  // {
  //   path: '/admin/groups',
  //   component: Groups,
  // },
  // {
  //   path: '/admin/practices',
  //   component: Practices,
  // },
  // {
  //   path: '/admin/results',
  //   component: Results,
  // },
];
