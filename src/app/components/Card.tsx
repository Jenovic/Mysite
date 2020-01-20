import * as React from 'react';
import Loader from './Loader';

interface Props {
  children: any;
  className?: string;
  title?: JSX.Element | string;
  image?: string;
  footer?: any;
}

interface State {
  isImageLoaded: boolean;
}

export default class Card extends React.Component<Props, State> {
  static defaultProps = {
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      isImageLoaded: false,
    };
  }

  render() {
    return (
      <div className={`card ${this.props.className}`}>
        {this.props.title !== undefined && (
          <header className="card-header">
            <p className="card-header-title">{this.props.title}</p>
          </header>
        )}
        {this.props.image !== undefined && (
          <div className="card-image">
            <figure className="image is-4by3">
              {!this.state.isImageLoaded && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    margin: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Loader />
                </div>
              )}
              <img
                src={this.props.image}
                onLoad={() => {
                  this.setState({ isImageLoaded: true });
                }}
              />
            </figure>
          </div>
        )}
        <div className="card-content">{this.props.children}</div>
        {this.props.footer !== undefined && (
          <footer className="card-footer">{this.props.footer}</footer>
        )}
      </div>
    );
  }
}
