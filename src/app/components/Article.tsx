import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  match: any;
  category?: string;
  title: string;
  date: string;
  author: string;
}

class Article extends React.Component<Props> {
  render() {
    return (
      <div className="col is-12 is-6-md is-3-lg">
        <Link
          className={`article-tile ${
            this.props.category ? this.props.category : ''
          }`}
          to="/article"
        >
          <div className="thumbnail">
            {this.props.category && (
              <span className="tag">{this.props.category}</span>
            )}
            <img
              src={require('../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')}
            />
          </div>
          <div className="content">
            <h1>{this.props.title}</h1>
            <div className="author-meta">
              <span>
                {this.props.date} | {this.props.author}
              </span>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
export default withRouter(Article);
