import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Content from './components/content';
import './scss/style.scss';

const App = () => (
  <BrowserRouter>
    <>
      <Helmet titleTemplate="%s | My Site" />
      <Navbar />
      <Hero />
      <Content />
      <Switch />
    </>
  </BrowserRouter>
);

const app = document.getElementById('app');
if (app) {
  render(<App />, app);
}
