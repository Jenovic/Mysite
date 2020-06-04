import * as React from 'react';
import { Formik } from 'formik';
import Tooltip from './Tooltip';
import Icon from './Icon';

interface Props {
  name?: string;
  handleSubmit: Function;
  buttonText: string;
  labelText: string;
  isTextarea: boolean;
  tooltip?: string;
}

export default class NameForm extends React.Component<Props> {
  static defaultProps = {
    labelText: 'Name',
    buttonText: 'Submit',
    isTextarea: false,
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: this.props.name ? this.props.name : '',
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
                {this.props.labelText}
                {this.props.tooltip && (
                  <>
                    {' '}
                    <Tooltip>{this.props.tooltip}</Tooltip>
                  </>
                )}
              </label>
              <div className="control">
                {this.props.isTextarea ? (
                  <textarea
                    name="name"
                    id="name"
                    className="textarea"
                    onChange={handleChange}
                  >
                    {values.name}
                  </textarea>
                ) : (
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="input"
                    onChange={handleChange}
                    value={values.name}
                  />
                )}
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
