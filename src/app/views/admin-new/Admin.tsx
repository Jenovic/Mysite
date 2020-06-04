import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import AdminDashboard from '../../components/AdminDashboard';
import AdminArticles from '../../components/AdminArticleIndex';
import AdminUsers from '../../components/AdminUserIndex';
import AdminArticle from '../../components/AdminArticle';
import Icon from '../../components/Icon';
import Footer from '../../components/Footer';
import Auth from '../../services/Auth';
import Error from '../Error';

declare var location: any;

interface Props {
  history: any;
}

interface State {
  showDashboard: boolean;
  showArticles: boolean;
  showUsers: boolean;
  createNewArticle: boolean;
}

/**
 * Admin
 */
export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showDashboard: true,
      showArticles: false,
      showUsers: false,
      createNewArticle: false,
    };
  }

  render() {
    if (!Auth.user) {
      console.log('hello');
      return <Error />;
    }
    return (
      <>
        <Helmet title={'admin'} />
        <section className="admin is-fullheight is-primary content">
          <div className="container">
            <div className="cols is-centered is-multiline articles">
              <div className="col is-12 is-3-md sidebar">
                <aside className="menu">
                  <p className="menu-label">General</p>
                  <ul className="menu-list">
                    <li>
                      <a
                        className={this.state.showDashboard && 'is-active'}
                        onClick={async () => {
                          await this.setState({
                            showDashboard: true,
                            showArticles: false,
                            showUsers: false,
                            createNewArticle: false,
                          });
                        }}
                      >
                        <Icon iconName="columns" />
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        className={
                          (this.state.showArticles ||
                            this.state.createNewArticle) &&
                          'is-active-parent'
                        }
                      >
                        <Icon iconName="newspaper" />
                        Articles
                      </a>
                      <ul>
                        <li>
                          <a
                            className={this.state.showArticles && 'is-active'}
                            onClick={async () => {
                              await this.setState({
                                showArticles: true,
                                showDashboard: false,
                                showUsers: false,
                                createNewArticle: false,
                              });
                            }}
                          >
                            All
                          </a>
                        </li>
                        <li>
                          <a
                            className={
                              this.state.createNewArticle && 'is-active'
                            }
                            onClick={async () => {
                              await this.setState({
                                showArticles: false,
                                showDashboard: false,
                                showUsers: false,
                                createNewArticle: true,
                              });
                            }}
                          >
                            Add an article
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p className="menu-label">Administration</p>
                  <ul className="menu-list">
                    <li>
                      <a className={this.state.showUsers && 'is-active-parent'}>
                        <Icon iconName="users" />
                        Users
                      </a>
                      <ul>
                        <li>
                          <a
                            className={this.state.showUsers && 'is-active'}
                            onClick={async () => {
                              await this.setState({
                                showUsers: true,
                                showArticles: false,
                                showDashboard: false,
                                createNewArticle: false,
                              });
                            }}
                          >
                            All
                          </a>
                        </li>
                        <li>
                          <a>Manage users</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <p className="menu-label">Statistics</p>
                  <ul className="menu-list">
                    <li>
                      <a>
                        <Icon iconName="chart-line" />
                        Users
                      </a>
                    </li>
                    <li>
                      <a>
                        <Icon iconName="chart-line" />
                        Articles
                      </a>
                    </li>
                  </ul>
                </aside>
              </div>

              {this.state.showDashboard && <AdminDashboard />}
              {this.state.showArticles && <AdminArticles />}
              {this.state.showUsers && <AdminUsers />}
              {this.state.createNewArticle && <AdminArticle />}
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
