import * as React from 'react';

interface Props {
  citeLink?: string;
  cite?: string;
  paragraph: string;
  footer?: string;
  background?: string;
  borderColor?: string;
}

export default class Blockquote extends React.Component<Props> {
  render() {
    return (
      <blockquote
        cite={this.props.citeLink ? this.props.citeLink : ''}
        className={`${
          this.props.borderColor ? `border ${this.props.borderColor}` : ''
        }`}
      >
        <p>{this.props.paragraph}</p>
        <footer>
          {this.props.footer ? this.props.footer : ''}
          {this.props.cite ? `, ${this.props.cite}` : ''}
        </footer>
      </blockquote>
    );
  }
}
