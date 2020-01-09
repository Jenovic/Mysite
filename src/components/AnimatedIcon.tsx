import * as React from 'react';

interface Props {
  className?: string;
  link: string;
  iconName: string;
}

export default class AnimatedIcon extends React.Component<Props> {
  render() {
    return (
      <a href={this.props.link} className={this.props.className}>
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span className="icon is-large fas fa-3x has-text-centered">
            <i className={`fab fa-${this.props.iconName}`} />
          </span>
        </div>
      </a>
    );
  }
}
