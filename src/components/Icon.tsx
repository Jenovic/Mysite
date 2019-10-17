import * as React from 'react';

interface Props {
  iconName: string;
  className?: string;
  iconPack: string;
}

export default class Icon extends React.Component<Props> {
  static defaultProps = {
    className: '',
    iconPack: 'fas',
  };

  render() {
    return (
      <span className={`icon ${this.props.className}`}>
        <i className={`${this.props.iconPack} fa-${this.props.iconName}`} />
      </span>
    );
  }
}
