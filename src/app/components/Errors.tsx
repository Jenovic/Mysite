import * as React from 'react';
import * as shortid from 'shortid';

import Notification from './Notification';
import Icon from './Icon';

interface Props {
  errors?: string[];
}

export default class Errors extends React.Component<Props> {
  static defaultProps = {
    errors: [],
  };

  render() {
    if (this.props.errors.length === 0) {
      return null;
    }
    return (
      <Notification className="is-danger" key={shortid.generate()}>
        {Array.isArray(this.props.errors) ? (
          <>
            <strong className="heading">
              Error{this.props.errors.length === 1 ? '' : 's'}
            </strong>
            {this.props.errors.map((error, index) => (
              <div key={index}>
                <Icon iconName="times" />
                <span>{error}</span>
              </div>
            ))}
          </>
        ) : (
          "Couldn't process your request"
        )}
      </Notification>
    );
  }
}
