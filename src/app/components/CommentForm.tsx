import * as React from 'react';
import { Formik } from 'formik';
import Icon from './Icon';

interface Props {
  placeholder?: string;
  handleSubmit: Function;
  comment?: string;
}

export default class CommentForm extends React.Component<Props> {
  static defaultProps = {
    placeholder: 'Comment...',
  };

  render() {
    return (
      <Formik
        initialValues={{
          comment: this.props.comment ? this.props.comment : '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          this.props.handleSubmit(values, setSubmitting);
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  placeholder={this.props.placeholder}
                  name="comment"
                  id="comment"
                  type="text"
                  className="input"
                  onChange={handleChange}
                  value={values.comment}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
