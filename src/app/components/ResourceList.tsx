import * as React from 'react';
import { Link } from 'react-router-dom';
import Resource from '../models/Resource';

import Card from './Card';
import Icon from './Icon';

interface Props {
  items: Resource[];
  iconName?: string;
  renderLeft?: Function;
  renderContent: Function;
  renderControls?: Function;
  renderLink?: Function;
}

export default class ResourceList extends React.Component<Props> {
  render() {
    return this.props.items.map((resource, index) => {
      const content = (
        <Card key={resource.uuid} className="resource-list">
          <div className="field is-grouped">
            {this.props.iconName !== undefined && (
              <div className="control">
                <Icon iconName={this.props.iconName} />
              </div>
            )}
            {this.props.renderLeft !== undefined && (
              <div className="control">{this.props.renderLeft(resource)}</div>
            )}
            <div className="control is-expanded">
              {this.props.renderContent(resource)}
            </div>
            {this.props.renderControls !== undefined && (
              <div className="control has-text-right">
                {this.props.renderControls(resource)}
              </div>
            )}
          </div>
        </Card>
      );
      if (this.props.renderLink !== undefined) {
        return (
          <Link
            key={resource.uuid}
            to={this.props.renderLink(resource)}
            className="resource-list-link"
          >
            {content}
          </Link>
        );
      }
      return content;
    });
  }
}
