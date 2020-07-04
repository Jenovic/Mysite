import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Admin from '../../models/User';
import AdminAuth from '../../services/Auth';
import AdminManager from '../../services/UserManager';

import Section from '../../components/Section';
import Card from '../../components/Card';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import AdminForm from '../../components/AdminForm';
import Notification from '../../components/Notification';
import Errors from '../../components/Errors';
import ResourceList from '../../components/ResourceList';
import Breadcrumb from '../../components/Breadcrumb';

interface State {
  admin: Admin;
  didCreate: boolean;
  errors: string[];
}

@observer
export default class View extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      admin: null,
      didCreate: false,
    };
  }

  async componentDidMount() {
    await AdminManager.findAll();
  }

  render() {
    if (!AdminAuth.user) {
      return <Redirect to="/admin/login" />;
    }
    return (
      <>
        <Helmet title="Admins" />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Admin Panel',
              link: '/admin',
            },
            {
              name: 'Admins',
              link: '/admin/users',
            },
          ]}
        />
        <section className="admin section">
          <div className="container">
            <div className="columns">
              <div className="column is-8">
                <Card className="is-fixed-height">
                  <h1 className="title is-3">Admins</h1>
                  {AdminManager.users.length === 0 && (
                    <Notification>No admins found</Notification>
                  )}
                  <ResourceList
                    items={AdminManager.users}
                    renderContent={(admin: Admin) => (
                      <div>
                        <strong>{admin.name}</strong>
                        <br />
                        <small className="has-text-grey">{admin.email}</small>
                      </div>
                    )}
                    renderControls={(admin: Admin) => {
                      if (AdminAuth.user.uuid === admin.uuid) {
                        return null;
                      }
                      return (
                        <div className="buttons">
                          <button
                            className="button"
                            onClick={() => {
                              this.setState({
                                admin,
                                errors: [],
                              });
                            }}
                          >
                            <Icon iconName="times" />
                            <span>Remove</span>
                          </button>
                        </div>
                      );
                    }}
                  />
                </Card>
              </div>
              <div className="column is-4">
                {this.state.didCreate ? (
                  <Notification className="is-primary">
                    Admin created.{' '}
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
                      <h2 className="title is-4">New Admin</h2>
                      <AdminForm
                        buttonText="Create"
                        handleSubmit={async (
                          { name, email, password },
                          setSubmitting,
                        ) => {
                          try {
                            await AdminManager.create({
                              name,
                              email,
                              password,
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
                      <br />
                      <Errors errors={this.state.errors} />
                    </Card>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <Modal
          isActive={this.state.admin !== null}
          handleClose={async (status) => {
            try {
              if (status === 1) {
                await AdminManager.destroy(this.state.admin.uuid);
              }
              this.setState({
                admin: null,
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
            <h2>Remove Admin</h2>
            {this.state.admin && (
              <p>
                Are you sure you want to remove{' '}
                <strong>{this.state.admin.name}</strong>? They will no longer be
                able to log in.
              </p>
            )}
          </div>
        </Modal>
      </>
    );
  }
}
