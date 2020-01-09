import * as React from 'react';
import { withRouter } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {}

class Navbar extends React.Component<Props, State> {
  render() {
    return (
      <nav className="navbar is-fixed-top">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={require('../assets/telegram-logo.png')} />
            </a>
            <a className="navbar-item logo-text" href="/">
              eXplore
            </a>
            <a
              role="button"
              className="navbar-burger burger"
              aria-label="menu"
              aria-expanded="true"
              data-target="mainNavbar"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div id="mainNavbar" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/">
                Home
              </a>
              <a className="navbar-item" href="#">
                About
              </a>
              <a className="navbar-item" href="/articles">
                Articles
              </a>
              <a className="navbar-item" href="#">
                Contact us
              </a>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button">Subscribe</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
