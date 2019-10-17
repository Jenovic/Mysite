import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Article from '../components/Article';

interface Props {
  history: any;
}

interface State {
  isLoaded: boolean;
}

export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoaded: true });
  }

  render() {
    return (
      <>
        <Helmet title="Home" />
        <Hero />
        <section className="is-fullheight is-primary" id="content">
          <div className="container archive">
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
        <Footer />
      </>
    );
  }
}
