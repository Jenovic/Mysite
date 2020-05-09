import * as React from 'react';
import Icon from './Icon';
import Search from './SearchForm';

export default class AdminArticleIndex extends React.Component {
  render() {
    return (
      <div className="col is-12 is-9-md main">
        <div className="container">
          <h2>Articles</h2>
          <div className="meta">
            <Search />
            <span className="button">
              <span>Add new</span> <Icon iconName="plus" />
            </span>
          </div>
          <div className="article_list">
            <table className="table is-striped">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Setting up automatic failover</td>
                  <td>Published</td>
                  <td>Ahan</td>
                  <td>09/05/2020</td>
                  <td>09/05/2020</td>
                </tr>
                <tr>
                  <td>Static websites host</td>
                  <td>Draft</td>
                  <td>Pavlos</td>
                  <td>09/05/2020</td>
                  <td>09/05/2020</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
