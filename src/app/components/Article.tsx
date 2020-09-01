import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Icon from './Icon';
import Module from '../models/Module';

interface Props {
  history: any;
  location: any;
  match: any;
  category?: string;
  title: string;
  date: string;
  author: string;
  module: Module;
}

class Article extends React.Component<Props> {
  render() {
    const module = this.props.module;
    return (
      <div className="col is-12 is-6-md is-3-lg">
        <Link
          className={`article-tile ${
            this.props.category ? this.props.category : ''
          }`}
          to={`/articles/${module.uuid}`}
          title={module.title}
        >
          <div className="thumbnail">
            {this.props.category && (
              <span className="tag">{this.props.category}</span>
            )}
            {this.props.module.thumbnail ? (
              <img src={this.props.module.thumbnail} />
            ) : (
              <img
                src={require('../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')}
                alt="author-avatar"
              />
            )}
          </div>
          <div className="content">
            <h1>{this.props.title}</h1>
            <div className="author-meta">
              <span>
                <Icon iconName="clock" />
                {this.props.date}
              </span>
              <span className="author-meta__name">{this.props.author}</span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
export default withRouter(Article);
