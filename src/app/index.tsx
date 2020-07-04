import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './scss/style.scss';
import Navbar from './components/Navbar';
import Icon from './components/Icon';
import views from './views';
import Axios from 'axios';
import Auth from './services/Auth';
Axios.defaults.baseURL = '/api/v1/';

(async () => {
  await Auth.check();

  let body = (
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container">
          <h3 className="has-text-link">
            <Icon iconName="exclamation-circle" /> App Offline
          </h3>
          <p>There was a problem connecting to the site.</p>
          <p>We apologise for any inconvenience caused.</p>

          <div className="buttons">
            <a href="/" target="_self" className="button">
              <Icon iconName="sync-alt" />
              <span>Reload</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (Auth.isOnline) {
    body = (
      <BrowserRouter>
        <>
          <Helmet titleTemplate="%s - OutData" />
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
  }

  render(body, document.getElementById('app'));
})();
