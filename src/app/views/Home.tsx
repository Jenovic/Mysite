import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import Article from '../components/Article';
import Tag from '../components/Tag';
import Title from '../components/Title';
import SearchForm from '../components/SearchForm';

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
        <section className="is-fullheight is-primary content">
          <div className="container archive">
            <div className="level">
              <Title title="Latest articles and news" size="1" color="blue" />
            </div>
            <div className="meta-category is-centered">
              <Tag tagName="#" />
              <Tag tagName="Analysis" />
              <Tag tagName="Data" />
              <Tag tagName="Research" />
              <Tag tagName="Analysis" />
              <Tag tagName="Data" />
              <Tag tagName="Research" />
              <Tag tagName="Analysis" />
              <Tag tagName="Data" />
              <Tag tagName="Research" />
              <Tag tagName="Analysis" />
              <Tag tagName="Data" />
              <Tag tagName="Research" />
              <Tag tagName="Analysis" />
              <Tag tagName="Data" />
              <Tag tagName="Research" />
              <Tag tagName="Analysis" />
              <Tag tagName="Data" />
              <Tag tagName="Research" />
            </div>
            <div className="cols is-centered is-multiline articles">
              <Article
                category="article_card data"
                tag="Data"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card research"
                tag="Research"
                title="The title"
                author="Sanil Purryag"
                date="18 Aug 2019"
              ></Article>
              <Article
                category="article_card analysis"
                tag="Analysis"
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
