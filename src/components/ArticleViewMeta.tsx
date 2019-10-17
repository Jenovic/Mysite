import * as React from 'react';

interface Props {
  title: string;
  authorName: string;
  imagePath?: string;
}

export default class ArticleViewMeta extends React.Component<Props> {
  render() {
    return (
      <>
        <div className="article-view-title">
          <h1>{this.props.title}</h1>
        </div>
        <div className="media">
          <div className="media-left image is-64x64">
            <img
              src={require('../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')}
              alt="author-avatar"
            />
          </div>
          <div className="media-content">
            <p className="author-name">{this.props.authorName}</p>
            <p className="publish-date">Oct 17</p>
          </div>
        </div>
        <div className="featured-image">
          <img
            src={require('../assets/ilya-pavlov-OqtafYT5kTw-unsplash.jpg')}
            alt=""
          />
        </div>
      </>
    );
  }
}
