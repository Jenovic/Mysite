import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Article from './Article';

interface Props {
  history: any;
  location: any;
  match: any;
}

class Content extends React.Component<Props> {
  render() {
    return (
      <section className="hero is-fullheight is-primary">
        <div className="container">
          <div className="main">
            <p>just a sample text</p>
          </div>
          <div className="columns is-centered is-multiline articles">
            <Article></Article>
            <Article></Article>
            <Article></Article>
            <Article></Article>
            <Article></Article>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Content);
