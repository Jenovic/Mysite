import * as React from 'react';
import { Formik } from 'formik';
import Module from '../models/Module';
import Tooltip from './Tooltip';
import Icon from './Icon';
import AdminAuth from '../services/Auth';

interface Props {
  module?: Module;
  handleSubmit: Function;
  buttonText: string;
}

export default class ModuleForm extends React.Component<Props> {
  static defaultProps = {
    buttonText: 'Submit',
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Formik
        initialValues={{
          title: this.props.module ? this.props.module.title : '',
          isVerifiable: false,
          verifiableHours: 0,
          questionCount: '',
          passMark: '',
          version: this.props.module ? this.props.module.version : '1.0',
          createdBy: AdminAuth.user.name,
        }}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          this.props.handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="title" className="label">
                Title{' '}
                <Tooltip>Name of the module. This is also searchable.</Tooltip>
              </label>
              <div className="control">
                <input
                  name="title"
                  id="title"
                  type="text"
                  className="input"
                  onChange={handleChange}
                  value={values.title}
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
