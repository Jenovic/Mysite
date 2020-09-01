import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Fade } from 'react-reveal';
import * as queryString from 'query-string';
import { find } from 'lodash';
import { Link } from 'react-router-dom';
// import * as ReactGA from 'react-ga';
import Module from '../../models/Module';
import Question from '../../models/Question';
import ModuleManager from '../../services/ModuleManager';
import Auth from '../../services/Auth';
import Answer from '../../models/Answer';

import Section from '../../components/Section';
import ModuleContents from '../../components/ModuleContents';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Errors from '../../components/Errors';
// import ModuleTest from '../../components/ModuleTest';
import Breadcrumb from '../../components/Breadcrumb';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';
import ArticleViewMeta from '../../components/ArticleViewMeta';
import Category from '../../models/Category';
import Loader from '../../components/Loader';
const bgImage = require('../../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg');

declare var location: any;

interface Props {
  match: {
    params: {
      uuid: string;
    };
  };
  history: any;
}

interface State {
  module: Module;
  slideIndex: number;
  category?: Category;
  isLoaded: boolean;
  isTakingTest: boolean;
  isSubmittingTest: boolean;
  isLeaving: boolean;
  isMobile: boolean;
  isSidebarMinimised: boolean;
  errors: string[];
  slideHeight: number | string;
}

/**
 * Single module page with slides
 */
@observer
export default class View extends React.Component<Props, State> {
  sidebar?: HTMLDivElement;
  contentWindow?: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      module: null,
      slideIndex: 0,
      isLoaded: false,
      isTakingTest: false,
      isSubmittingTest: false,
      isLeaving: false,
      isMobile: false,
      isSidebarMinimised: true,
      errors: [],
      slideHeight: 0,
    };
    this.handleResize = this.handleResize.bind(this);
    // this.renderSidebar = this.renderSidebar.bind(this);
    this.renderSlide = this.renderSlide.bind(this);
  }

  async componentDidMount() {
    if (!Auth.user) {
      this.props.history.replace('/');
      return;
    }

    // Log pageview
    // if (process.env.APP_ENV !== 'development') {
    //   ReactGA.pageview(window.location.pathname + window.location.search);
    // }

    const module = await ModuleManager.find(this.props.match.params.uuid);
    this.setState({ module, isLoaded: true }, async () => {
      this.handleResize();
      const query = queryString.parse(location.search);
    });
    window.addEventListener('resize', this.handleResize);
  }

  async componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  /**
   * Handle resizing of the screen
   */
  handleResize() {
    if (this.sidebar) {
      this.setState({
        slideHeight: `calc(${this.sidebar.offsetHeight - 6}px - 6em - 4em)`,
        isMobile: window.innerWidth < 1088,
      });
    }
  }

  /**
   * Handle resetting of scroll position in scroll containers
   */
  handleResetScroll() {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    if (this.contentWindow) {
      this.contentWindow.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
  }

  // renderSidebar() {
  //   return (
  //     <Card
  //       image={this.state.isLoaded ? this.state.module.thumbnail : ''}
  //       className="is-fixed-height module-sidebar"
  //     >
  //       {this.state.isMobile && (
  //         <div className="buttons">
  //           <button
  //             className="button is-fullwidth"
  //             onClick={() => {
  //               this.setState({
  //                 isSidebarMinimised: !this.state.isSidebarMinimised,
  //               });
  //             }}
  //           >
  //             <Icon
  //               iconName={this.state.isSidebarMinimised ? 'eye' : 'eye-slash'}
  //             />
  //             <span>
  //               {this.state.isSidebarMinimised ? 'Show' : 'Hide'} Module
  //               Overview
  //             </span>
  //           </button>
  //         </div>
  //       )}
  //       {this.state.isLoaded &&
  //         (!this.state.isMobile || !this.state.isSidebarMinimised) && (
  //           <>
  //             <progress
  //               className="progress is-primary is-hidden-touch"
  //               value={this.state.slideIndex}
  //               max={this.state.module.slides.length - 1}
  //             />
  //             <ModuleContents
  //               module={this.state.module}
  //               selectedIndex={
  //                 this.state.isTakingTest ? undefined : this.state.slideIndex
  //               }
  //               handleSelect={(slide, slideIndex) => {
  //                 if (!this.state.isSubmittingTest) {
  //                   this.setState({
  //                     slideIndex,
  //                     isTakingTest: false,
  //                     errors: [],
  //                   });
  //                   this.handleResetScroll();
  //                 }
  //               }}
  //             />
  //           </>
  //         )}
  //     </Card>
  //   );
  // }

  renderTop() {
    return (
      <Fade bottom>
        <div className="column is-12-desktop is-12-tablet article-view-title">
          <div className="container single">
            <h1>{this.state.module.title}</h1>
            <div className="media meta">
              <div className="media-left image is-64x64">
                <img
                  src={require('../../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')}
                  alt="author-avatar"
                />
              </div>
              <div className="media-content">
                <p className="author-name">{this.state.module.createdBy}</p>
                <p className="date">{this.state.module.createdAt.fromNow()}</p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    );
  }

  renderThumbnail() {
    console.log(this.state.module.thumbnail);
    return (
      <Fade bottom>
        <div className="column is-2-desktop is-12-tablet"></div>
        {this.state.module.thumbnail !== null ? (
          <div
            className="column is-8-desktop is-12-tablet article-thumbnail"
            style={{
              backgroundImage: `url(${this.state.module.thumbnail})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
        ) : (
          <div
            className="column is-8-desktop is-12-tablet article-thumbnail"
            style={{
              backgroundImage: `
              url(${require('../../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          ></div>
        )}
        <div className="column is-2-desktop is-12-tablet"></div>
      </Fade>
    );
  }

  renderArticleMeta() {
    return (
      <Fade bottom>
        <div className="column is-2-desktop is-12-tablet article-left-sidebar">
          <div className="article-left-sidebar__content">
            <Icon iconPack="far" iconName="comments fa-lg" />
            <p>2</p>
            <Icon iconPack="far" iconName="thumbs-up fa-lg" />
            <p>15</p>
            <Icon iconPack="far" iconName="bookmark" />
          </div>
        </div>
      </Fade>
    );
  }

  renderSocial() {
    return (
      <Fade bottom>
        <div className="column is-2-desktop is-12-tablet">
          <div className="article-social">
            <h1>Share this article</h1>
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=example.org"
              target="blank"
            >
              <Icon iconPack="fab" iconName="facebook fa-lg" />
            </a>
            <a
              href="https://twitter.com/intent/tweet"
              className="twitter-share-button"
            >
              <Icon iconPack="fab" iconName="twitter fa-lg" />
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite">
              <Icon iconPack="fab" iconName="linkedin fa-lg" />
            </a>
          </div>
        </div>
      </Fade>
    );
  }

  renderSlide() {
    console.log(this.state.module.slides);
    const slide = this.state.module.slides[this.state.slideIndex];
    const slides = this.state.module.slides;
    return (
      <div
        className="is-fixed-height article-content"
        // footer={null}
        // image={this.state.isLoaded ? this.state.module.thumbnail : ''}
      >
        <div
          className="article-content-inner"
          // style={{ height: this.state.slideHeight }}
        >
          {slides.map((slide) => {
            return (
              <>
                <Fade bottom>
                  <h1 className="title">{slide.title}</h1>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: slide.content }}
                  />
                </Fade>
              </>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <>
        <Helmet title={this.state.isLoaded ? this.state.module.title : ''} />
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
            {
              name: this.state.isLoaded ? this.state.module.title : '',
              link: window.location.pathname,
            },
          ]}
          backText="Return to Articles"
          handleBack={() => {
            if (!this.state.isTakingTest) {
              this.props.history.push('/articles');
              return;
            }
            this.setState({ isLeaving: true });
          }}
        />
        <section className="article-view">
          <div className="container">
            <div className="columns is-multiline has-padding ">
              {/* <div className="column is-3-desktop is-12-tablet"> */}
              {/* <div ref={(e) => (this.sidebar = e)}> */}
              {/* {this.renderSidebar()} */}
              {/* </div> */}
              {/* </div> */}
              {this.state.isLoaded && (
                <>
                  {this.renderTop()}
                  {this.renderThumbnail()}
                  {this.renderArticleMeta()}
                  <div className="column is-8-desktop is-12-tablet">
                    {this.renderSlide()}
                  </div>
                  {this.renderSocial()}
                </>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }
}
