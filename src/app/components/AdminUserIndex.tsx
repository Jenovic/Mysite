import * as React from 'react';
import Icon from './Icon';
import Search from './SearchForm';

export default class AdminUserIndex extends React.Component {
  render() {
    return (
      <div className="col is-12 is-9-md main">
        <div className="container">
          <h2>Users</h2>
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
                  <th>FullName</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ahan Purryag</td>
                  <td>Active</td>
                  <td>09/05/2020</td>
                  <td>09/05/2020</td>
                </tr>
                <tr>
                  <td>Pavlos Tsiantis</td>
                  <td>Active</td>
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
