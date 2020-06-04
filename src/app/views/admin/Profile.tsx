import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import AdminAuth from '../../services/Auth';
import AdminManager from '../../services/UserManager';

import Notification from '../../components/Notification';
import Section from '../../components/Section';
import AdminForm from '../../components/AdminForm';
import Card from '../../components/Card';
import Errors from '../../components/Errors';
import Breadcrumb from '../../components/Breadcrumb';

interface State {
  errors: string[];
  didSucceed: boolean;
}

@observer
export default class View extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      didSucceed: false,
    };
  }

  render() {
    if (!AdminAuth.user) {
      return <Redirect to="/admin/login" />;
    }
    return (
      <>
        <Helmet title="My Details" />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Admin Panel',
              link: '/admin',
            },
            {
              name: 'My Details',
              link: '/admin/profile',
            },
          ]}
        />
        <Section>
          <Card className="is-min-height">
            <div className="columns is-centered">
              <div className="column is-8">
                <Errors errors={this.state.errors} />
                {this.state.didSucceed && (
                  <Notification className="is-primary">
                    <span>Your details have been updated.</span>
                  </Notification>
                )}
                <h1 className="title is-3">My Details</h1>
                <AdminForm
                  admin={AdminAuth.user}
                  handleSubmit={async (
                    { name, email, password },
                    setSubmitting,
                  ) => {
                    this.setState({ errors: [], didSucceed: false });
                    try {
                      const admin = await AdminManager.update('me', {
                        name,
                        email,
                        password,
                      });
                      AdminAuth.setUser(admin);
                      this.setState({ didSucceed: true });
                      setSubmitting(false);
                    } catch (e) {
                      setSubmitting(false);
                      if (e.response) {
                        this.setState({ errors: e.response.data });
                      }
                    }
                  }}
                />
              </div>
            </div>
          </Card>
        </Section>
      </>
    );
  }
}
