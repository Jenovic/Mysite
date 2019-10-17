import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './scss/style.scss';
import Navbar from './components/Navbar';
import views from './views';

const App = () => (
  <BrowserRouter>
    <>
      <Helmet titleTemplate="%s | My Site" />
      <Navbar />
      <Switch>
        {views.map((view, index) => (
          <Route
            key={index}
            path={view.path}
            component={view.component}
            exact
          />
        ))}
      </Switch>
    </>
  </BrowserRouter>
);

const app = document.getElementById('app');
if (app) {
  render(<App />, app);
}
