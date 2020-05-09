import * as React from 'react';
import Icon from './Icon';

export default class AdminDashboard extends React.Component {
  render() {
    return (
      <div className="col is-12 is-9-md main">
        <div className="container">
          <h2>Dashboard</h2>
          <div className="cols">
            <div className="col is-12 is-4-md detail-card">
              <div className="content">
                <Icon className="dashboard-icon" iconName="users" />
                <h1>5</h1>
                <p>Total number of admin users</p>
              </div>
            </div>
            <div className="col is-12 is-4-md detail-card">
              <div className="content">
                <Icon className="dashboard-icon" iconName="newspaper" />
                <h1>20</h1>
                <p>Total number of published articles</p>
              </div>
            </div>
            <div className="col is-12 is-4-md detail-card">
              <div className="content">
                <Icon className="dashboard-icon" iconName="cogs" />
                <h1>Settings</h1>
                <p>System settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
