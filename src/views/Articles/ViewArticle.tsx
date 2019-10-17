import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';
import ArticleViewMeta from '../../components/ArticleViewMeta';
import Footer from '../../components/Footer';

interface Props {
  history: any;
}

interface State {}

export default class SingleArticle extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Helmet title={'Sample article title'} />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Articles',
              link: '/articles',
            },
            {
              name: 'article',
              link: '/article',
            },
          ]}
          className="article"
          backText="Return to Articles"
          handleBack={() => {
            this.props.history.push('/articles');
          }}
        />
        <div className="columns article-view">
          <div className="container single">
            <div className="column">
              <ArticleViewMeta
                title={
                  'Setting up automatic failover for your static websites hosted on'
                }
                authorName={'Sample Name'}
              />

              <div className="article-view-content">
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum has
                been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it
                to make a type specimen book. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
