import Modules from './Modules';
import ViewModule from './ViewModule';

export default [
  { path: '/modules', component: Modules },
  { path: '/modules/:uuid', component: ViewModule },
];
