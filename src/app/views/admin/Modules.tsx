import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Module from '../../models/Module';
import AdminAuth from '../../services/Auth';
import ModuleManager from '../../services/ModuleManager';

import Section from '../../components/Section';
import Card from '../../components/Card';
import ModuleForm from '../../components/ModuleForm';
import Notification from '../../components/Notification';
import Errors from '../../components/Errors';
import ResourceList from '../../components/ResourceList';
import Icon from '../../components/Icon';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import SearchForm from '../../components/SearchForm';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
  history: any;
}

interface State {
  module: Module;
  errors: string[];
  isLoaded: boolean;
  page: number;
}

@observer
export default class View extends React.Component<Props, State> {
  MODULES_PER_PAGE = 10;

  constructor(props) {
    super(props);
    this.state = {
      module: null,
      errors: [],
      isLoaded: false,
      page: 1,
    };
  }

  async componentDidMount() {
    await ModuleManager.findAll({
      page: this.state.page,
      limit: this.MODULES_PER_PAGE,
    });
    this.setState({ isLoaded: true });
  }

  render() {
    if (!AdminAuth.user) {
      return <Redirect to="/admin/login" />;
    }
    return (
      <>
        <Helmet title="Modules" />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Admin Panel',
              link: '/admin',
            },
            {
              name: 'Modules',
              link: '/admin/modules',
            },
          ]}
        />
        <Section>
          <div className="columns">
            <div className="column is-8">
              <Card className="is-fixed-height">
                <h1 className="title is-3">Modules</h1>
                <SearchForm
                  handleSubmit={async ({ search }, setSubmitting) => {
                    await ModuleManager.findAll({
                      search,
                      page: 1,
                      limit: this.MODULES_PER_PAGE,
                    });
                    setSubmitting(false);
                  }}
                />
                <br />
                {!this.state.isLoaded && <Loader />}
                {this.state.isLoaded && ModuleManager.modules.length === 0 ? (
                  <Notification>No modules found</Notification>
                ) : (
                  this.state.isLoaded && (
                    <>
                      <ResourceList
                        items={ModuleManager.modules.slice(
                          0,
                          this.MODULES_PER_PAGE,
                        )}
                        renderContent={(module: Module) => (
                          <div>
                            <strong>{module.shortTitle}</strong>
                            <br />
                            <small className="has-text-grey">
                              v{module.version}
                              &nbsp;&bull;&nbsp;
                              <span
                                className={`has-text-${
                                  module.categories.length === 0
                                    ? 'primary'
                                    : 'grey'
                                }`}
                              >
                                {module.categoriesText}
                              </span>
                            </small>
                          </div>
                        )}
                        renderControls={(module: Module) => {
                          switch (module.status) {
                            case 'DRAFT':
                              return (
                                <small className="has-text-grey">
                                  <Icon iconName="plus-circle" />
                                  <strong>Draft</strong>
                                  <br />
                                  <small className="has-text-grey">
                                    Updated {module.updatedAt.fromNow()}
                                  </small>
                                </small>
                              );
                            case 'APPROVED':
                              return (
                                <small className="has-text-primary">
                                  <Icon iconName="check-circle" />
                                  <strong>Approved</strong>
                                  <br />
                                  <small className="has-text-grey">
                                    {module.approvedAt.calendar()}
                                  </small>
                                </small>
                              );
                            case 'IN REVIEW':
                              return (
                                <small className="has-text-grey">
                                  <Icon iconName="exclamation-circle" />
                                  <strong>In Review</strong>
                                  <br />
                                  <small className="has-text-grey">
                                    Updated {module.updatedAt.fromNow()}
                                  </small>
                                </small>
                              );
                            default:
                              return null;
                          }
                        }}
                        renderLink={(module: Module) =>
                          `/admin/modules/${module.uuid}`
                        }
                      />
                      <br />
                      <Pagination
                        page={this.state.page}
                        isLoading={!this.state.isLoaded}
                        hasNextPage={
                          ModuleManager.modules.length > this.MODULES_PER_PAGE
                        }
                        handlePaginate={async (page) => {
                          this.setState({ isLoaded: false });
                          await ModuleManager.findAll({
                            page,
                            limit: this.MODULES_PER_PAGE,
                          });
                          this.setState({ page, isLoaded: true });
                        }}
                      />
                    </>
                  )
                )}
              </Card>
            </div>
            <div className="column is-4">
              <Card className="is-fixed-height">
                <h2 className="title is-4">New Module</h2>
                <ModuleForm
                  buttonText="Create"
                  handleSubmit={async (fields, setSubmitting) => {
                    try {
                      const module = await ModuleManager.create(fields);
                      setSubmitting(false);
                      this.setState({
                        errors: [],
                      });
                      this.props.history.push(`/admin/modules/${module.uuid}`);
                    } catch (e) {
                      setSubmitting(false);
                      if (e.response) {
                        this.setState({ errors: e.response.data });
                      }
                    }
                  }}
                />
                <br />
                <Errors errors={this.state.errors} />
              </Card>
            </div>
          </div>
        </Section>
      </>
    );
  }
}
