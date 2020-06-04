import * as React from 'react';
import { Formik } from 'formik';
import Icon from './Icon';

interface Props {
  placeholder?: string;
  handleSubmit: Function;
  search?: string;
}

export default class SearchForm extends React.Component<Props> {
  static defaultProps = {
    placeholder: 'Search...',
  };

  render() {
    return (
      <Formik
        initialValues={{
          search: this.props.search ? this.props.search : '',
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
                  name="search"
                  id="search"
                  type="text"
                  className="input"
                  onChange={handleChange}
                  value={values.search}
                  disabled={isSubmitting}
                />
              </div>
              <div className="control">
                <button className="button is-light" disabled={isSubmitting}>
                  <Icon iconName="search" />
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    );
  }
}
