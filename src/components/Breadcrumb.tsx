import * as React from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

interface Props {
  breadcrumbs: { name: string; link: string }[];
  backText?: string;
  handleBack?: Function;
}

class Breadcrumb extends React.Component<Props> {
  render() {
    return (
      <nav className="breadcrumb">
        <div className="container">
          {this.props.backText !== undefined &&
            this.props.handleBack !== undefined && (
              <a
                className="is-pulled-right"
                onClick={() => {
                  this.props.handleBack();
                }}
              >
                <Icon iconName="arrow-left" />
                <span>{this.props.backText}</span>
              </a>
            )}
          <ul>
            {this.props.breadcrumbs.map((breadcrumb, index) => (
              <li
                key={index}
                className={
                  index + 1 === this.props.breadcrumbs.length ? 'is-active' : ''
                }
              >
                <Link to={breadcrumb.link}>{breadcrumb.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Breadcrumb;
