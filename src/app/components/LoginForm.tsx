import * as React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';

interface Props {
  handleSubmit: Function;
  forgotPasswordLink?: string;
}

export default class LoginForm extends React.Component<Props> {
  render() {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          this.props.handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="columns">
              <div className="column is-half">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <div className="control">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="input"
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
              </div>
              <div className="column is-half">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="control">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="input"
                    onChange={handleChange}
                    value={values.password}
                  />
                </div>
              </div>
            </div>
            <div className="field">
              <div className="buttons is-right">
                {this.props.forgotPasswordLink !== undefined && (
                  <Link
                    className="button is-text"
                    to={this.props.forgotPasswordLink}
                  >
                    Forgot password
                  </Link>
                )}
                <button
                  type="submit"
                  className="button is-primary"
                  disabled={isSubmitting}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
