import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import './scss/style.scss';

const App = () => (
  <BrowserRouter>
    <>
      <Helmet titleTemplate="%s | My Site" />
      <Navbar />
      <Switch />
      Hello World
    </>
  </BrowserRouter>
);

const app = document.getElementById('app');
if (app) {
  render(<App />, app);
}
