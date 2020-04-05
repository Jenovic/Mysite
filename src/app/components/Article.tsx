import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';

interface Props {
  history: any;
  location: any;
  match: any;
  category: string;
  tag: string;
  title: string;
  date: string;
  author: string;
}

class Article extends React.Component<Props> {
  render() {
    return (
      <div className="col is-12 is-6-md is-4-lg is-4-widescreen">
        <Link className="article" to="/article">
          <div className={this.props.category}>
            <div className="card-header">
              <div className="image">
                <div className="tags is-right">
                  <span className="tag">{this.props.tag}</span>
                </div>
                <img
                  src={require('../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')}
                  className="is-pulled-right"
                />
              </div>
            </div>
            <div className="card-content">
              <div className="description">
                <h1>{this.props.title}</h1>
                <p>
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
                <div className="author-meta">
                  <p>{this.props.author}</p>
                  <p>{this.props.date}</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
export default withRouter(Article);
