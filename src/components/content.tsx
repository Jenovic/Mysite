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
      <section className="is-fullheight is-primary" id="content">
        <div className="container">
          <div className="content-top">
            <h2 className="title is-3 has-text-black">
              Find here what you're looking for
            </h2>

            <form>
              <label>Search: </label>
              <input type="text" placeholder="search..." />
            </form>
          </div>
          <div className="meta-category is-centered">
            <a className="button" href="#">
              #
            </a>
            <a className="button" href="#">
              Analysis
            </a>
            <a className="button" href="#">
              Data
            </a>
            <a className="button" href="#">
              Research
            </a>
          </div>
          <div className="columns is-centered is-multiline articles">
            <Article
              category="card data"
              tag="Data"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card research"
              tag="Research"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card analysis"
              tag="Analysis"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card data"
              tag="Data"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card analysis"
              tag="Analysis"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card data"
              tag="Data"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card research"
              tag="Research"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
            <Article
              category="card research"
              tag="Research"
              title="The title"
              author="Sanil Purryag"
              date="18 Aug 2019"
            ></Article>
          </div>
        </div>
      </section>
    );
  }
}
export default withRouter(Content);
