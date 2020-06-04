import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
// import AdminAuth from '../../services/AdminAuth';
import Auth from '../../services/Auth';
const pkg = require('../../../../package.json');

import Section from '../../components/Section';
import Icon from '../../components/Icon';
import Hero from '../../components/Hero';
import Modal from '../../components/Modal';
import Card from '../../components/Card';

interface Props {
  history: any;
}

interface State {
  isLoggingOut: boolean;
}

@observer
export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingOut: false,
    };
  }

  render() {
    if (!Auth.user) {
      return <Redirect to="/login" />;
    }
    return (
      <>
        <Helmet title="Admin Panel" />
        <section className="admin section">
          <div className="container">
            <Card className="is-min-height">
              <div className="columns is-centered">
                <div className="column is-8">
                  <a
                    className="button is-dark is-pulled-right"
                    onClick={() => {
                      this.setState({ isLoggingOut: true });
                    }}
                  >
                    <span>Logout</span>
                    <Icon iconName="arrow-right" />
                  </a>
                  <h1 className="title is-3">Hi, {Auth.user.name}</h1>
                  <hr />

                  <strong className="heading">Content</strong>
                  <br />
                  <Link className="media" to="/admin/modules">
                    <div className="media-left">
                      <Icon iconName="newspaper" />
                    </div>
                    <div className="media-content">
                      <strong>Articles</strong>
                      <br />
                      <small className="has-text-grey">
                        Manage articles content and their settings.
                      </small>
                    </div>
                  </Link>
                  <Link className="media" to="/admin/categories">
                    <div className="media-left">
                      <Icon iconName="tag" />
                    </div>
                    <div className="media-content">
                      <strong>Categories</strong>
                      <br />
                      <small className="has-text-grey">
                        Manage categories for articles available.
                      </small>
                    </div>
                  </Link>

                  <br />
                  <strong className="heading">Reporting</strong>
                  <br />
                  <Link className="media" to="/admin/results">
                    <div className="media-left">
                      <Icon iconName="poll" />
                    </div>
                    <div className="media-content">
                      <strong>Articles</strong>
                      <br />
                      <small className="has-text-grey">
                        View articles statistics.
                      </small>
                    </div>
                  </Link>

                  <br />
                  <strong className="heading">Access</strong>
                  <br />
                  <Link className="media" to="/admin/profile">
                    <div className="media-left">
                      <Icon iconName="user-edit" />
                    </div>
                    <div className="media-content">
                      <strong>My Details</strong>
                      <br />
                      <small className="has-text-grey">
                        Change your login details.
                      </small>
                    </div>
                  </Link>
                  <Link className="media" to="/admin/users">
                    <div className="media-left">
                      <Icon iconName="users" />
                    </div>
                    <div className="media-content">
                      <strong>Admins</strong>
                      <br />
                      <small className="has-text-grey">
                        Add or remove another admins.
                      </small>
                    </div>
                  </Link>

                  <br />
                  <div className="has-text-grey has-text-centered">
                    <Icon iconName="code-branch" />
                    <small>
                      You are running version{' '}
                      <span className="has-text-weight-bold">
                        {pkg.version}
                      </span>{' '}
                      of My site.
                    </small>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
        <Modal
          isActive={this.state.isLoggingOut}
          handleClose={async (status) => {
            if (status === 1) {
              await Auth.logout();
              this.props.history.push('/');
            }
            this.setState({ isLoggingOut: false });
          }}
        >
          <div className="content">
            <h2>Log Out?</h2>
            <p>Are you sure you want to log out of the admin panel?</p>
          </div>
        </Modal>
      </>
    );
  }
}
