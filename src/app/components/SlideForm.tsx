import * as React from 'react';
import { Formik } from 'formik';
import Slide from '../models/Slide';
import Module from '../models/Module';

import Editor from './Editor';
import Tooltip from './Tooltip';
import Icon from './Icon';

interface Props {
  module?: Module;
  slide?: Slide;
  handleSubmit: Function;
  buttonText: string;
}

interface State {
  content: string;
}

export default class SlideForm extends React.Component<Props, State> {
  static defaultProps = {
    buttonText: 'Submit',
  };

  constructor(props) {
    super(props);
    this.state = {
      content: this.props.slide ? this.props.slide.content : '',
    };
  }

  render() {
    return (
      <Formik
        initialValues={{
          title: this.props.slide ? this.props.slide.title : '',
        }}
        onSubmit={async ({ title }, { setSubmitting }) => {
          setSubmitting(true);
          this.props.handleSubmit(
            { title, content: this.state.content },
            setSubmitting,
          );
        }}
      >
        {({ values, handleChange, isSubmitting, submitForm }) => (
          <>
            <div className="field">
              <label htmlFor="title" className="label">
                Title{' '}
                <Tooltip>
                  Name of the slide to appear in the contents menu.
                </Tooltip>
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
              <label htmlFor="content" className="label">
                Content{' '}
                <Tooltip>
                  Content of the module when the slide is chosen.
                </Tooltip>
              </label>
              <div className="control">
                <Editor
                  value={this.state.content}
                  onChange={(content) => {
                    this.setState({ content });
                  }}
                  module={this.props.module}
                  slide={this.props.slide}
                />
              </div>
            </div>
            <div className="field">
              <div className="buttons is-right">
                <button
                  className="button is-dark"
                  disabled={isSubmitting}
                  onClick={() => submitForm()}
                >
                  <span>{this.props.buttonText}</span>
                  <Icon iconName="arrow-right" />
                </button>
              </div>
            </div>
          </>
        )}
      </Formik>
    );
  }
}
