import * as React from 'react';

interface Props {
  text: string;
}

export default class Quote extends React.Component<Props> {
  render() {
    return (
      <blockquote className="quote">
        <p>{this.props.text}</p>
      </blockquote>
    );
  }
}
