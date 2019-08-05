import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {}

class Navbar extends React.Component<Props, State> {
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="#">
              <img src="https://bulma.io/images/bulma-logo.png" />
            </a>
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="true" data-target="mainNavbar">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="mainNavbar" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="#">
                Home
              </a>
              <a className="navbar-item" href="#">
                About
              </a>
              <a className="navbar-item" href="#">
                Blog
              </a>
              <a className="navbar-item" href="#">
                Contact us
              </a>
            </div>
            <div className="navbar-end">
              <a className="navbar-item button" href="#">
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
