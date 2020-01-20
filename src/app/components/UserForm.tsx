import * as React from 'react';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import User from '../models/User';

interface Props {
  user?: User;
  buttonText?: string;
  handleSubmit: Function;
}

export default class LoginForm extends React.Component<Props> {
  static defaultProps = {
    buttonText: 'Save',
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: this.props.user ? this.props.user.name : '',
          email: this.props.user ? this.props.user.email : '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          this.props.handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="name" className="label">
                Name
              </label>
              <div className="control">
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="input"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
            </div>
            <div className="field">
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
            <div className="field">
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
            <div className="field">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <div className="control">
                <input
                  name="confirmPassword"
                  id="confirm_password"
                  type="password"
                  className="input"
                  onChange={handleChange}
                  value={values.confirmPassword}
                />
              </div>
            </div>
            <div className="field">
              <div className="buttons is-right">
                <button
                  type="submit"
                  className="button is-primary"
                  disabled={isSubmitting}
                >
                  {this.props.buttonText}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
