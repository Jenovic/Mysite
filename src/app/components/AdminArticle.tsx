import * as React from 'react';
import Icon from './Icon';
import Search from './SearchForm';

export default class AdminArticle extends React.Component {
  render() {
    return (
      <div className="col is-12 is-9-md main">
        <div className="container">
          <h2>Create New Article</h2>
          <div className="building-blocks box" v-if="!link.length">
            <h5 className="title is-5">Building blocks</h5>
            <div className="buttons">
              <button type="button" className="button is-default">
                Paragraph
              </button>
              <button type="button" className="button is-default">
                Quote
              </button>
              <button type="button" className="button is-default">
                Image
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
