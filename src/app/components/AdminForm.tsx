import * as React from 'react';
import { Formik } from 'formik';
import User from '../models/User';
import Icon from './Icon';

interface Props {
  handleSubmit: Function;
  buttonText: string;
  admin?: User;
}

export default class AdminForm extends React.Component<Props> {
  static defaultProps = {
    buttonText: 'Save',
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: this.props.admin ? this.props.admin.name : '',
          email: this.props.admin ? this.props.admin.email : '',
          password: '',
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
              <div className="buttons is-right">
                <button
                  type="submit"
                  className="button is-dark"
                  disabled={isSubmitting}
                >
                  <span>{this.props.buttonText}</span>
                  <Icon iconName="arrow-right" />
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
