import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';
import ArticleViewMeta from '../../components/ArticleViewMeta';
import Footer from '../../components/Footer';
import Blockquote from '../../components/Blockquote';

interface Props {
  history: any;
}

interface State {
  quote: string;
}

export default class SingleArticle extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      quote: "Lorem Ipsum has been the industry's standard dummy text ever",
    };
  }

  render() {
    return (
      <>
        <Helmet title={'Sample article title'} />
        <section className="article-view">
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

          <div className="container single">
            <div className="cols">
              <ArticleViewMeta
                title={
                  'Setting up automatic failover for your static websites hosted on'
                }
                authorName={'Jenovic Lumu'}
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
                <Blockquote
                  paragraph={this.state.quote}
                  borderColor={'red'}
                ></Blockquote>
                <Blockquote
                  paragraph={this.state.quote}
                  borderColor={'green'}
                ></Blockquote>
                <Blockquote
                  paragraph={this.state.quote}
                  borderColor={'blue'}
                ></Blockquote>
                <Blockquote
                  paragraph={this.state.quote}
                  borderColor={'yellow'}
                ></Blockquote>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
