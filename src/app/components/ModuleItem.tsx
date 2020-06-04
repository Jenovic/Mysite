import * as React from 'react';
import { Link } from 'react-router-dom';
import * as LinesEllipsis from 'react-lines-ellipsis';
import Module from '../models/Module';

import Card from './Card';
import Icon from './Icon';

interface Props {
  module: Module;
  isCompleted?: boolean;
}

export default class ModuleItem extends React.Component<Props> {
  static defaultProps = {
    isCompleted: false,
  };

  render() {
    const module = this.props.module;
    return (
      <Link to={`/modules/${module.uuid}`} title={module.title}>
        <Card
          image={module.thumbnail}
          className={`module-item ${
            this.props.isCompleted ? 'is-completed' : ''
          }`}
        >
          <div className="content">
            <LinesEllipsis
              text={module.title}
              maxLine="2"
              basedOn="letters"
              className="module-item-title"
            />
            {this.props.isCompleted ? (
              <span className="tag is-primary">
                <Icon iconName="check-circle" />
                <span>Passed</span>
              </span>
            ) : (
              module.isVerifiable && (
                <span className="tag is-dark">
                  <Icon iconName="clock" />
                  <span>{module.verifiableHoursText}</span>
                </span>
              )
            )}
          </div>
        </Card>
      </Link>
    );
  }
}
