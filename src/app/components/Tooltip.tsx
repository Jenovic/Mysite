import * as React from 'react';
import { Tooltip as Tippy } from 'react-tippy';
import Icon from './Icon';

interface Props {
  children: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default class Tooltip extends React.Component<Props> {
  static defaultProps = {
    position: 'top',
  };

  render() {
    return (
      <Tippy title={this.props.children} position={this.props.position}>
        <Icon iconName="question-circle" className="has-text-grey" />
      </Tippy>
    );
  }
}
