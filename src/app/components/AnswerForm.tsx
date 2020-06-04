import * as React from 'react';
import { Formik } from 'formik';
import Answer from '../models/Answer';
import Tooltip from './Tooltip';
import Icon from './Icon';

interface Props {
  answer?: Answer;
  handleSubmit: Function;
  buttonText: string;
}

export default class AnswerForm extends React.Component<Props> {
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
          text: this.props.answer ? this.props.answer.text : '',
          isCorrect: this.props.answer ? this.props.answer.isCorrect : false,
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
              <label htmlFor="text" className="label">
                Answer <Tooltip>A possible answer to be presented.</Tooltip>
              </label>
              <div className="control">
                <input
                  name="text"
                  id="text"
                  type="text"
                  className="input"
                  onChange={handleChange}
                  value={values.text}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="isCorrect" className="label">
                Status <Tooltip>Whether or not this answer is correct.</Tooltip>
              </label>
              <label className="checkbox">
                <input
                  name="isCorrect"
                  id="isCorrect"
                  type="checkbox"
                  onChange={handleChange}
                  checked={values.isCorrect}
                />
                &nbsp;This answer is correct
              </label>
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
