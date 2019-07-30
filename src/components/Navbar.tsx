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
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            <img src="https://bulma.io/images/bulma-logo.png" />
          </a>
        </div>

        <div className="navbar-start">
          <a className="navbar-item" href="#">
            Home
          </a>
        </div>
        <div className="navbar-end">
          <a className="navbar-item" href="#">
            <img src="https://bulma.io/images/bulma-logo.png" />
          </a>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
