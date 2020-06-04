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
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item" href="/">
              <img src={require('../assets/test-1.png')} />
            </a>
            {/* <a className="navbar-item logo-text" href="/">
              OutData
            </a> */}
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
              {/* {Auth.user && (
                <>
                  <div className="navbar-item has-dropdown is-hoverable">
                    <div className="navbar-link">{Auth.user.name}</div>
                    <div className="navbar-dropdown is-right">
                      <a
                        className="navbar-item has-text-danger"
                        onClick={() => {
                          this.setState({ isLoggingOut: true });
                        }}
                      >
                        Logout
                      </a>
                    </div>
                  </div>
                </>
              )} */}
            </div>
          </div>
        </div>
        {/* <Modal
          isActive={this.state.isLoggingOut}
          handleClose={async (status) => {
            if (status === 1) {
              await Auth.logout();
              this.props.history.push('/');
            }
            this.setState({ isLoggingOut: false });
          }}
        >
          <div className="content">
            <h2>Log Out?</h2>
            <p>Are you sure you want to log out?</p>
          </div>
        </Modal> */}
      </nav>
    );
  }
}

export default withRouter(Navbar);
