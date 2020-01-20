import * as React from 'react';

interface Props {
  className?: string;
}

export default class Notification extends React.Component<Props> {
  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div className={`notification ${this.props.className}`}>
        {this.props.children}
      </div>
    );
  }
}
