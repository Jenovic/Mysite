import Articles from './Articles';
import ViewArticle from './ViewArticle';

export default [
  { path: '/articles', component: Articles },
  { path: '/articles/:uuid', component: ViewArticle },
];
