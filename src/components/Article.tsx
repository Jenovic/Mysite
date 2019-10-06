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
      <div className="column is-4 is-3-widescreen">
        <a href="" className="article">
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
              {/* https://codepen.io/JanneLeppanen/pen/EMRrOX */}
              <svg className="card__svg" viewBox="0 0 800 500">
                <path
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400 L 800 500 L 0 500"
                  stroke="transparent"
                  fill="#333"
                />
                <path
                  className="card__line"
                  d="M 0 100 Q 50 200 100 250 Q 250 400 350 300 C 400 250 550 150 650 300 Q 750 450 800 400"
                  stroke="pink"
                  stroke-width="3"
                  fill="transparent"
                />
              </svg>
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
        </a>
      </div>
    );
  }
}
export default withRouter(Article);
