import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Auth from '../../services/Auth';

// import Hero from '../../components/Hero';
import UserForm from '../../components/UserForm';
import Card from '../../components/Card';
import Errors from '../../components/Errors';
import Notification from '../../components/Notification';

interface State {
  didRegister: boolean;
  errors: string[];
}

/**
 * User registration
 */
@observer
export default class View extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      didRegister: false,
      errors: [],
    };
  }

  render() {
    if (Auth.user) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <Helmet title="Login" />
        <div className="hero is-fullheight register-page">
          <div className="hero-body columns is-centered">
            <div className="column is-6">
              <Errors errors={this.state.errors} />
              {this.state.didRegister ? (
                <Notification className="is-success">
                  Thank you for registering! <Link to="/login">Click here</Link>{' '}
                  to login.
                </Notification>
              ) : (
                <div className="card-register box">
                  <UserForm
                    buttonText="Register"
                    handleSubmit={async (
                      { name, email, password, confirmPassword },
                      setSubmitting,
                    ) => {
                      setSubmitting(false);
                      try {
                        await Auth.register(
                          name,
                          email,
                          password,
                          confirmPassword,
                        );
                        this.setState({ didRegister: true, errors: [] });
                      } catch (e) {
                        this.setState({
                          didRegister: false,
                          errors: e.response.data,
                        });
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}
