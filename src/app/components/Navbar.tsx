import * as React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../services/Auth';
import Modal from './Modal';

interface Props {
  history: any;
  location: any;
  match: any;
}

interface State {
  isLoggingOut: boolean;
  isOpen: boolean;
}

class Navbar extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingOut: false,
      isOpen: false,
    };
  }

  componentWillUpdate() {
    if (this.state.isOpen) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <header>
        <nav className="navbar is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img src={require('../assets/test-1.png')} />
              </a>
              <a
                role="button"
                className="navbar-burger burger"
                onClick={() => {
                  this.setState({ isOpen: !this.state.isOpen });
                }}
                aria-label="menu"
                aria-expanded="true"
                data-target="mainNavbar"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div
              id="mainNavbar"
              className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}
            >
              <div className="navbar-start">
                <a className="navbar-item" href="/">
                  Home
                </a>
                <a className="navbar-item" href="#">
                  About us
                </a>
                <a className="navbar-item" href="/articles">
                  Articles
                </a>
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <div className="buttons">
                    <a className="button">Contact us</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default withRouter(Navbar);
