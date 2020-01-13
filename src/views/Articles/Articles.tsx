import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Icon from '../../components/Icon';
import Article from '../../components/Article';
import Footer from '../../components/Footer';
import Tag from '../../components/Tag';
import Title from '../../components/Title';
import SearchForm from '../../components/SearchForm';
import VivusComponent from '../../components/vivusComponent';

declare var location: any;

interface Props {
  history: any;
}

interface State {}

/**
 * Articles archive
 */
export default class View extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Helmet title={'Sample article archive'} />
        <section className="hero archive">
          <VivusComponent />
          <Breadcrumb
            breadcrumbs={[
              {
                name: 'Home',
                link: '/',
              },
              {
                name: 'Articles',
                link: '/articles',
              },
            ]}
            className="articles"
            backText="Return Home"
            handleBack={() => {
              this.props.history.push('/');
            }}
          />
          <div className="level top-content">
            <Title
              title="Find here what you're looking for"
              color="white"
              size="2"
              hasMaxWidth={true}
            />
            <SearchForm color="white" />
          </div>
          <div className="meta-category is-centered">
            <Tag tagName="#" />
            <Tag tagName="Analysis" />
            <Tag tagName="Data" />
            <Tag tagName="Research" />
          </div>
        </section>
        <section className="is-fullheight is-primary content">
          <div className="container archive">
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
