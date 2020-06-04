import * as React from 'react';
import { Formik } from 'formik';
import Icon from './Icon';

interface Props {
  progress?: number;
  handleSubmit: Function;
  buttonText: string;
  labelText: string;
  isTextarea: boolean;
}

export default class UploadForm extends React.Component<Props> {
  static defaultProps = {
    labelText: 'File',
    buttonText: 'Upload',
    isTextarea: false,
  };

  render() {
    return (
      <Formik
        initialValues={{
          file: '' as any,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          this.props.handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, isSubmitting, submitForm, setFieldValue }) => (
          <>
            <div className="field">
              <label htmlFor="name" className="label">
                {this.props.labelText}
              </label>
              <div className="control">
                <div className="file">
                  <label htmlFor="file" className="file-label">
                    <input
                      id="file"
                      type="file"
                      name="file"
                      className="file-input"
                      onChange={(e) => {
                        setFieldValue('file', e.currentTarget.files[0]);
                      }}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload" />
                      </span>
                      <span className="file-label">Choose a file...</span>
                    </span>
                    {!!values.file && (
                      <span className="file-name">{values.file.name}</span>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="field">
              <div className="level is-mobile">
                <div className="level-left" />
                <div className="level-right">
                  {!!this.props.progress && (
                    <div className="level-item">
                      {this.props.progress === 100
                        ? 'Processing...'
                        : `Uploading (${this.props.progress}%)...`}
                    </div>
                  )}
                  <div className="level-item">
                    <button
                      className={`button is-dark${
                        isSubmitting ? ' is-loading' : ''
                      }`}
                      disabled={isSubmitting}
                      onClick={() => submitForm()}
                    >
                      <span>{this.props.buttonText}</span>
                      <Icon iconName="arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </Formik>
    );
  }
}
