import * as React from 'react';

interface Props {
  title: string;
  color: string;
  size: string;
  hasMaxWidth: boolean;
}

export default class Title extends React.Component<Props> {
  static defaultProps = {
    color: 'black',
    size: '3',
    hasMaxWidth: false,
  };
  render() {
    return (
      <h2
        className={`title is-${this.props.size} has-text-${this.props.color} ${
          this.props.hasMaxWidth ? 'has-width' : ''
        }`}
      >
        {this.props.title}
      </h2>
    );
  }
}
