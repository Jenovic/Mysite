import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import Auth from '../../services/Auth';

import LoginForm from '../../components/LoginForm';
import Notification from '../../components/Notification';
import Card from '../../components/Card';

interface State {
  didInvalidate: boolean;
}

/**
 * User log in
 */
@observer
export default class View extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      didInvalidate: false,
    };
  }

  render() {
    if (Auth.user) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Helmet title="Login" />
        <div className="hero is-fullheight">
          <div className="hero-body columns is-centered">
            <div className="column is-8">
              {this.state.didInvalidate && (
                <Notification className="is-danger">
                  Could not log you in
                </Notification>
              )}
              <Card>
                <LoginForm
                  handleSubmit={async ({ email, password }, setSubmitting) => {
                    this.setState({ didInvalidate: false });
                    await Auth.login(email, password);
                    if (!Auth.user) {
                      this.setState({ didInvalidate: true });
                      setSubmitting(false);
                      return;
                    }
                  }}
                />
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }
}
