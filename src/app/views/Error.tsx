import * as React from 'react';
import { Helmet } from 'react-helmet';

import { Link } from 'react-router-dom';

/**
 * 404 page
 */
export default class View extends React.Component {
  render() {
    return (
      <>
        <Helmet title="Error" />
        <div className="hero is-fullheight-with-navbar login-page">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Page Not Found</h1>
              <Link className="button" to="/">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}
