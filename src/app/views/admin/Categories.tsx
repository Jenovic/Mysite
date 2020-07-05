import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Link, Redirect } from 'react-router-dom';
import Category from '../../models/Category';
import AdminAuth from '../../services/Auth';
import CategoryManager from '../../services/CategoryManager';

import Section from '../../components/Section';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import NameForm from '../../components/NameForm';
import Notification from '../../components/Notification';
import Errors from '../../components/Errors';
import ResourceList from '../../components/ResourceList';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';
import Breadcrumb from '../../components/Breadcrumb';

interface Props {
  history: any;
}

interface State {
  category: Category;
  didCreate: boolean;
  isEditing: boolean;
  isRemoving: boolean;
  errors: string[];
  isLoaded: boolean;
  page: number;
}

@observer
export default class View extends React.Component<Props, State> {
  CATEGORIES_PER_PAGE = 10;

  constructor(props) {
    super(props);
    this.state = {
      category: null,
      didCreate: false,
      isEditing: false,
      isRemoving: false,
      errors: [],
      isLoaded: false,
      page: 1,
    };
  }

  async componentDidMount() {
    await CategoryManager.findAll({
      page: this.state.page,
      limit: this.CATEGORIES_PER_PAGE,
    });
    this.setState({ isLoaded: true });
  }

  render() {
    if (!AdminAuth.user) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Helmet title="Categories" />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Admin Panel',
              link: '/admin',
            },
            {
              name: 'Categories',
              link: '/admin/categories',
            },
          ]}
          backText="Return to Admin"
          handleBack={() => {
            this.props.history.push('/admin');
          }}
        />
        <section className="admin section">
          <div className="container">
            <div className="columns">
              <div className="column is-8">
                <Card className="is-fixed-height">
                  <h1 className="title is-3">Categories</h1>
                  {!this.state.isLoaded && <Loader />}
                  {this.state.isLoaded &&
                  CategoryManager.categories.length === 0 ? (
                    <Notification>No categories found</Notification>
                  ) : (
                    this.state.isLoaded && (
                      <>
                        <ResourceList
                          items={CategoryManager.categories.slice(
                            0,
                            this.CATEGORIES_PER_PAGE,
                          )}
                          renderContent={(category: Category) => (
                            <div>
                              <strong className="title is-5">
                                {category.name}
                              </strong>
                              <br />
                              <small className="has-text-grey">
                                Created {category.createdAt.fromNow()}
                              </small>
                            </div>
                          )}
                          renderControls={(category: Category) => (
                            <div className="buttons">
                              <button
                                className="button"
                                onClick={() => {
                                  this.setState({
                                    category,
                                    isEditing: true,
                                    errors: [],
                                  });
                                }}
                              >
                                <Icon iconName="pen" />
                                <span>Edit</span>
                              </button>
                              <button
                                className="button"
                                onClick={() => {
                                  this.setState({
                                    category,
                                    isRemoving: true,
                                    errors: [],
                                  });
                                }}
                              >
                                <Icon iconName="times" />
                                <span>Remove</span>
                              </button>
                            </div>
                          )}
                        />
                        <br />
                        <Pagination
                          page={this.state.page}
                          isLoading={!this.state.isLoaded}
                          hasNextPage={
                            CategoryManager.categories.length >
                            this.CATEGORIES_PER_PAGE
                          }
                          handlePaginate={async (page) => {
                            this.setState({ isLoaded: false });
                            await CategoryManager.findAll({
                              page,
                              limit: this.CATEGORIES_PER_PAGE,
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
                {this.state.didCreate ? (
                  <Notification className="is-primary">
                    Category created.{' '}
                    <a
                      onClick={() => {
                        this.setState({ didCreate: false });
                      }}
                    >
                      Create another?
                    </a>
                  </Notification>
                ) : (
                  <>
                    <Card className="is-fixed-height">
                      <h2 className="title is-4">New Category</h2>
                      <NameForm
                        buttonText="Create"
                        tooltip="Name of the category."
                        handleSubmit={async ({ name }, setSubmitting) => {
                          try {
                            await CategoryManager.create({
                              name,
                            });
                            setSubmitting(false);
                            this.setState({
                              errors: [],
                              didCreate: true,
                            });
                          } catch (e) {
                            setSubmitting(false);
                            if (e.response) {
                              this.setState({ errors: e.response.data });
                            }
                          }
                        }}
                      />
                      {!this.state.isEditing && (
                        <>
                          <br />
                          <Errors errors={this.state.errors} />
                        </>
                      )}
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <Modal
          isActive={this.state.isEditing}
          hasControls={false}
          handleClose={async () => {
            this.setState({
              category: null,
              isEditing: false,
              errors: [],
            });
          }}
        >
          <div className="content">
            <h2>Edit Category</h2>
            <Errors errors={this.state.errors} />
            {this.state.category && (
              <NameForm
                name={this.state.category.name}
                buttonText="Update"
                tooltip="Name of the category."
                handleSubmit={async ({ name }, setSubmitting) => {
                  try {
                    await CategoryManager.update(this.state.category.uuid, {
                      name,
                    });
                    setSubmitting(false);
                    this.setState({
                      errors: [],
                      isEditing: false,
                    });
                  } catch (e) {
                    setSubmitting(false);
                    if (e.response) {
                      this.setState({ errors: e.response.data });
                    }
                  }
                }}
              />
            )}
          </div>
        </Modal>
        <Modal
          isActive={this.state.isRemoving}
          handleClose={async (status) => {
            try {
              if (status === 1) {
                await CategoryManager.destroy(this.state.category.uuid);
              }
              this.setState({
                category: null,
                isRemoving: false,
                errors: [],
              });
            } catch (e) {
              if (e.response) {
                this.setState({ errors: e.response.data });
              }
            }
          }}
          confirmText="Remove"
        >
          <div className="content">
            <h2>Remove Category</h2>
            {this.state.category && (
              <p>
                Are you sure you want to remove{' '}
                <strong>{this.state.category.name}</strong>?
              </p>
            )}
          </div>
        </Modal>
      </>
    );
  }
}
