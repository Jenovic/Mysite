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
        <div className="is-fullheight-with-navbar">
          <h1 className="title is-3">Page Not Found</h1>
          <Link className="button" to="/">
            Return Home
          </Link>
        </div>
      </>
    );
  }
}
