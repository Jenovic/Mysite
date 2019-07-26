import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import './scss/style.scss';

const App = () => (
  <BrowserRouter>
    <>
      <Helmet titleTemplate="%s | My Site" />
      <Hero />
      <Switch />
    </>
  </BrowserRouter>
);

const app = document.getElementById('app');
if (app) {
  render(<App />, app);
}
