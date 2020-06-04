import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
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
  questions: Question[];
  answers: Answer[];
  isLoaded: boolean;
  isLoadingTest: boolean;
  isTakingTest: boolean;
  isSubmittingTest: boolean;
  // isCompleted: boolean;
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
      questions: [],
      answers: [],
      isLoaded: false,
      isLoadingTest: false,
      isTakingTest: false,
      isSubmittingTest: false,
      isLeaving: false,
      // isCompleted: !!find(Auth.completedModules, {
      //   uuid: this.props.match.params.uuid,
      // }),
      isMobile: false,
      isSidebarMinimised: true,
      errors: [],
      slideHeight: 0,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleTest = this.handleTest.bind(this);
    this.renderSidebar = this.renderSidebar.bind(this);
    this.renderSlide = this.renderSlide.bind(this);
    // this.renderTest = this.renderTest.bind(this);
    this.renderControls = this.renderControls.bind(this);
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
      if (query) {
        if (query.test && module.questionCount > 0) {
          await this.handleTest();
        }
      }
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

  /**
   * Initiate the module's test
   */
  async handleTest() {
    let questions = this.state.questions;
    let answers = this.state.answers;
    try {
      if (questions.length === 0) {
        this.setState({ isLoadingTest: true });
        questions = await ModuleManager.generateTest(this.state.module);
        answers = questions.map(() => null);
      }
      this.setState({
        questions,
        answers,
        isLoadingTest: false,
        isTakingTest: true,
        errors: [],
      });
      this.handleResetScroll();
    } catch (e) {
      this.setState({
        isLoadingTest: false,
        errors: [e.response ? e.response.data : e.message],
      });
    }
  }

  renderSidebar() {
    return (
      <Card
        image={this.state.isLoaded ? this.state.module.thumbnail : ''}
        className="is-fixed-height module-sidebar"
        footer={
          this.state.isLoaded &&
          this.state.module.questionCount > 0 &&
          (!this.state.isMobile || !this.state.isSidebarMinimised) &&
          !this.state.isTakingTest ? (
            <button
              className={`button is-fullwidth is-medium${
                this.state.questions.length === 0 ? ' is-dark' : ' is-white'
              }`}
              disabled={this.state.isLoadingTest}
              onClick={this.handleTest}
            >
              <span>
                {this.state.questions.length === 0
                  ? 'Take the Test'
                  : 'Resume Test'}
              </span>
              <Icon iconName="arrow-right" />
            </button>
          ) : (
            undefined
          )
        }
      >
        {this.state.isMobile && (
          <div className="buttons">
            <button
              className="button is-fullwidth"
              onClick={() => {
                this.setState({
                  isSidebarMinimised: !this.state.isSidebarMinimised,
                });
              }}
            >
              <Icon
                iconName={this.state.isSidebarMinimised ? 'eye' : 'eye-slash'}
              />
              <span>
                {this.state.isSidebarMinimised ? 'Show' : 'Hide'} Module
                Overview
              </span>
            </button>
          </div>
        )}
        {this.state.isLoaded &&
          (!this.state.isMobile || !this.state.isSidebarMinimised) && (
            <>
              <progress
                className="progress is-primary is-hidden-touch"
                value={this.state.slideIndex}
                max={this.state.module.slides.length - 1}
              />
              <ModuleContents
                module={this.state.module}
                selectedIndex={
                  this.state.isTakingTest ? undefined : this.state.slideIndex
                }
                handleSelect={(slide, slideIndex) => {
                  if (!this.state.isSubmittingTest) {
                    this.setState({
                      slideIndex,
                      isTakingTest: false,
                      errors: [],
                    });
                    this.handleResetScroll();
                  }
                }}
              />
            </>
          )}
      </Card>
    );
  }

  renderSlide() {
    const slide = this.state.module.slides[this.state.slideIndex];
    return (
      <Card
        className="is-fixed-height module-content"
        footer={null}
        // handleRef={(e) => (this.contentWindow = e)}
      >
        <div
          className="module-content-inner"
          style={{ height: this.state.slideHeight }}
        >
          <h1 className="title">{slide.title}</h1>
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: slide.content }}
          />
        </div>
      </Card>
    );
  }

  // renderTest() {
  //   return (
  //     <Card
  //       className="is-fixed-height module-content"
  //       footer={null}
  //       handleRef={(e) => (this.contentWindow = e)}
  //     >
  //       <div
  //         className="content module-content-inner"
  //         style={{ height: this.state.slideHeight }}
  //       >
  //         <ModuleTest
  //           questions={this.state.questions}
  //           answers={this.state.answers}
  //           handleSelect={(answers) => {
  //             this.setState({ answers, errors: [] });
  //           }}
  //         />
  //       </div>
  //     </Card>
  //   );
  // }

  renderControls() {
    return (
      <div className="columns is-mobile">
        {/* Previous */}
        {!this.state.isTakingTest && this.state.slideIndex > 0 && (
          <div className="column is-3">
            <div className="buttons is-left">
              <button
                className="button is-dark"
                onClick={() => {
                  this.setState({
                    slideIndex: this.state.slideIndex - 1,
                    errors: [],
                  });
                  this.handleResetScroll();
                }}
              >
                <Icon iconName="arrow-left" />
                <span>Previous</span>
              </button>
            </div>
          </div>
        )}

        {/* Error */}
        <div
          className={`column is-${
            this.state.isTakingTest || this.state.slideIndex === 0 ? '9' : '6'
          }`}
        >
          {/* <Errors errors={this.state.errors} isThin /> */}
        </div>

        {/* Next/Take Test/Submit Test/Finish */}
        <div className="column is-3">
          <div className="buttons is-right">
            {this.state.isTakingTest ? (
              <button
                className="button is-dark"
                disabled={this.state.isSubmittingTest}
                onClick={async () => {
                  this.setState({ isSubmittingTest: true, errors: [] });
                  try {
                    const result = await ModuleManager.submitTest(
                      this.state.module,
                      this.state.questions,
                      this.state.answers,
                    );
                    this.props.history.push(`/results/${result.uuid}`);
                  } catch (e) {
                    this.setState({
                      isSubmittingTest: false,
                      errors: [e.response ? e.response.data : e.message],
                    });
                  }
                }}
              >
                <span>Submit Answers</span>
                <Icon iconName="arrow-right" />
              </button>
            ) : this.state.slideIndex ===
              this.state.module.slides.length - 1 ? (
              this.state.module.questionCount > 0 ? (
                <button
                  className="button is-dark"
                  disabled={this.state.isLoadingTest}
                  onClick={this.handleTest}
                >
                  <span>
                    {this.state.questions.length > 0
                      ? 'Continue Test'
                      : 'Take the Test'}
                  </span>
                  <Icon iconName="arrow-right" />
                </button>
              ) : (
                <Link className="button is-dark" to="/">
                  <span>Finish</span>
                  <Icon iconName="arrow-right" />
                </Link>
              )
            ) : (
              <button
                className="button is-dark"
                disabled={
                  this.state.slideIndex === this.state.module.slides.length - 1
                }
                onClick={() => {
                  this.setState({
                    slideIndex: this.state.slideIndex + 1,
                    errors: [],
                  });
                  this.handleResetScroll();
                }}
              >
                <span>Next</span>
                <Icon iconName="arrow-right" />
              </button>
            )}
          </div>
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
              name: 'Modules',
              link: '/modules',
            },
            {
              name: this.state.isLoaded ? this.state.module.title : '',
              link: window.location.pathname,
            },
          ]}
          backText="Return to Home"
          handleBack={() => {
            if (!this.state.isTakingTest) {
              this.props.history.push('/');
              return;
            }
            this.setState({ isLeaving: true });
          }}
        />
        <Section>
          <div className="columns is-multiline">
            <div className="column is-3-desktop is-12-tablet">
              <div ref={(e) => (this.sidebar = e)}>{this.renderSidebar()}</div>
            </div>
            {this.state.isLoaded && (
              <div className="column is-9-desktop is-12-tablet">
                {this.renderSlide()}
              </div>
            )}
          </div>
          {this.state.isLoaded && (
            <div className="columns">
              <div className="column is-3-desktop is-hidden-touch" />
              <div className="column is-9-desktop is-12-tablet">
                {this.renderControls()}
              </div>
            </div>
          )}
        </Section>

        {/* Leave Modal */}
        <Modal
          isActive={this.state.isLeaving}
          canDismiss={false}
          handleClose={(status) => {
            if (status === 1) {
              this.props.history.push('/');
            }
            this.setState({ isLeaving: false });
          }}
        >
          <div className="content">
            <h2>Leave This Module?</h2>
            <p>
              Are you sure you want to leave this module? Your answers to this
              quiz will not be saved.
            </p>
          </div>
        </Modal>
      </>
    );
  }
}
