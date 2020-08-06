import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import * as queryString from 'query-string';
import { find } from 'lodash';
// import * as ReactGA from 'react-ga';
import Category from '../../models/Category';
import Auth from '../../services/Auth';
import CategoryManager from '../../services/CategoryManager';
import ModuleManager from '../../services/ModuleManager';

import Section from '../../components/Section';
import ModuleItem from '../../components/ModuleItem';
import Notification from '../../components/Notification';
import SearchForm from '../../components/SearchForm';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import Card from '../../components/Card';
import Breadcrumb from '../../components/Breadcrumb';
import Icon from '../../components/Icon';
import Article from '../../components/Article';

declare var location: any;

interface Props {
  history: any;
}

interface State {
  category?: Category;
  search?: string;
  isInitialised: boolean;
  isMandatory: boolean;
  isLoaded: boolean;
  page: number;
}

/**
 * Module archive with filtering
 */
@observer
export default class View extends React.Component<Props, State> {
  MODULES_PER_PAGE = 8;

  constructor(props) {
    super(props);
    this.state = {
      isInitialised: false,
      isMandatory: false,
      isLoaded: false,
      page: 1,
    };
  }

  async componentDidMount() {
    if (!Auth.user) {
      this.props.history.replace('/');
      return;
    }

    const query = queryString.parse(location.search);
    if (query) {
      if (query.category) {
        await this.setCategory(query.category as string);
        return;
      }
      if (query.search) {
        await this.setSearchQuery(query.search as string);
        return;
      }
    }
    await this.setMandatory();
  }

  /**
   * Show modules from a specific category
   */
  async setCategory(uuid: string, page: number = 1) {
    let category = undefined;
    try {
      category = await CategoryManager.find(uuid);
      await ModuleManager.findByCategory(category, {
        page,
        limit: this.MODULES_PER_PAGE,
      });
      this.setState({
        category,
        page,
        search: undefined,
        isInitialised: true,
        isMandatory: false,
        isLoaded: true,
      });
    } catch (e) {
      this.props.history.replace('/modules');
      await this.setMandatory();
    }
  }

  /**
   * Show modules related to a search query
   */
  async setSearchQuery(search: string, page: number = 1) {
    await ModuleManager.search(search);
    this.setState({
      search,
      page,
      category: undefined,
      isInitialised: true,
      isMandatory: false,
      isLoaded: true,
    });
  }

  /**
   * Show mandatory modules
   */
  async setMandatory(page: number = 1) {
    this.setState({
      page,
      search: undefined,
      category: undefined,
      isInitialised: true,
      isMandatory: true,
      isLoaded: true,
    });
  }

  /**
   * Get the page title
   */
  getTitle() {
    if (this.state.category) {
      return this.state.category.name;
    }
    if (this.state.search) {
      return `Search results for "${this.state.search}"`;
    }
    return 'Your Mandatory Modules';
  }

  render() {
    if (!this.state.isInitialised) {
      return null;
    }

    // Determine what modules to show
    let modules = ModuleManager.modules;
    if (this.state.isMandatory) {
      // modules = Auth.mandatoryModules;
    }

    // Determine if we should paginate locally
    if ((this.state.search || this.state.isMandatory) && modules) {
      const offset = (this.state.page - 1) * this.MODULES_PER_PAGE;
      modules = modules.slice(offset, offset + this.MODULES_PER_PAGE + 1);
    }

    return (
      <>
        <Helmet title={this.getTitle()} />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Home',
              link: '/',
            },
            {
              name: 'Articles',
              link: 'articles',
            },
            {
              name: this.state.category ? this.state.category.name : '',
              link: window.location.pathname,
            },
          ]}
          backText="Return to Home"
          handleBack={() => {
            this.props.history.push('/');
          }}
        />
        <section className="admin section">
          <div className="container">
            <div className="columns is-centered has-margin-top-1em">
              <div className="column is-10-desktop is-12-tablet">
                <div className="columns">
                  <div className="column is-9-desktop is-7-tablet">
                    <h1 className="title is-4">
                      {this.state.category && 'Category >'} {this.getTitle()}
                    </h1>
                  </div>
                  <div className="column is-3-desktop is-5-tablet">
                    <SearchForm
                      search={this.state.search}
                      placeholder="Search articles"
                      handleSubmit={async ({ search }, setSubmitting) => {
                        if (search) {
                          this.setState({ isLoaded: false });
                          await this.setSearchQuery(search);
                          this.props.history.replace(
                            `/modules?search=${search}`,
                          );
                        }
                        setSubmitting(false);
                      }}
                    />
                  </div>
                </div>
                <br />
                {!this.state.isLoaded ? (
                  <Loader />
                ) : modules && modules.length > 0 ? (
                  <>
                    <div className="columns is-multiline is-mobile">
                      {modules.slice(0, this.MODULES_PER_PAGE).map((module) => (
                        <Article
                          key={module.uuid}
                          title={module.title}
                          author="Sanil Purryag"
                          date={module.createdAt.fromNow()}
                          module={module}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="columns is-centered">
                    <div className="column is-8">
                      <Notification>
                        <div className="media">
                          <div className="media-left">
                            <Icon
                              iconName="question"
                              className="has-text-grey"
                            />
                          </div>
                          <div className="media-content">
                            <strong className="heading">
                              No modules found
                            </strong>
                            Please try searching for something else, or{' '}
                            <Link to="/">click here</Link> to return home.
                          </div>
                        </div>
                      </Notification>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        {this.state.isLoaded && modules && modules.length > 0 ? (
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-10-desktop is-12-tablet">
                <Pagination
                  page={this.state.page}
                  isLoading={!this.state.isLoaded}
                  hasNextPage={modules.length > this.MODULES_PER_PAGE}
                  handlePaginate={async (page) => {
                    this.setState({ isLoaded: false });
                    if (this.state.category) {
                      this.setCategory(this.state.category.uuid, page);
                      return;
                    }
                    if (this.state.search) {
                      this.setSearchQuery(this.state.search, page);
                      return;
                    }
                    this.setMandatory(page);
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}
