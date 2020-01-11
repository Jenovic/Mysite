import * as React from 'react';

interface Props {
  tagName: string;
  link: string;
}

export default class Tag extends React.Component<Props> {
  static defaultProps = {
    link: '#',
  };

  render() {
    return (
      <a className="button" href={this.props.link}>
        {this.props.tagName}
      </a>
    );
  }
}
