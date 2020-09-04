import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import AdminAuth from '../../services/Auth';
import AdminManager from '../../services/UserManager';

import Notification from '../../components/Notification';
import Section from '../../components/Section';
import AdminForm from '../../components/AdminForm';
import Card from '../../components/Card';
import Errors from '../../components/Errors';
import Breadcrumb from '../../components/Breadcrumb';
import Icon from '../../components/Icon';
import Modal from '../../components/Modal';
import UploadForm from '../../components/UploadForm';

interface Props {
  history: any;
}

interface State {
  errors: string[];
  didSucceed: boolean;
  isEditingThumbnail: boolean;
  uploadProgress: number;
}

@observer
export default class View extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      didSucceed: false,
      isEditingThumbnail: false,
      uploadProgress: 0,
    };
  }

  render() {
    if (!AdminAuth.user) {
      return <Redirect to="/admin/login" />;
    }
    return (
      <>
        <Helmet title="My Details" />
        <Breadcrumb
          breadcrumbs={[
            {
              name: 'Admin Panel',
              link: '/admin',
            },
            {
              name: 'My Details',
              link: '/admin/profile',
            },
          ]}
          backText="Return to Admin"
          handleBack={() => {
            this.props.history.push('/admin');
          }}
        />
        <section className="admin section">
          <div className="container">
            <Card className="is-min-height">
              <div className="columns is-centered">
                <div className="column is-8">
                  <Errors errors={this.state.errors} />
                  {this.state.didSucceed && (
                    <Notification className="is-primary">
                      <span>Your details have been updated.</span>
                    </Notification>
                  )}
                  <h1 className="title is-3">My Details</h1>

                  <div className="level-right">
                    <div className="level-item">
                      <button
                        className="button is-dark"
                        onClick={() => {
                          this.setState({
                            didSucceed: false,
                            isEditingThumbnail: true,
                            errors: [],
                          });
                        }}
                      >
                        <span>Upload</span>
                        <Icon iconName="image" />
                      </button>
                    </div>
                  </div>

                  <hr />

                  {!!AdminAuth.user.thumbnail ? (
                    <img src={AdminAuth.user.thumbnail} />
                  ) : (
                    <Notification>No thumbnail</Notification>
                  )}

                  <hr />

                  <AdminForm
                    admin={AdminAuth.user}
                    handleSubmit={async (
                      { name, email, password },
                      setSubmitting,
                    ) => {
                      this.setState({ errors: [], didSucceed: false });
                      try {
                        const admin = await AdminManager.update('me', {
                          name,
                          email,
                          password,
                        });
                        AdminAuth.setUser(admin);
                        this.setState({ didSucceed: true });
                        setSubmitting(false);
                      } catch (e) {
                        setSubmitting(false);
                        if (e.response) {
                          this.setState({ errors: e.response.data });
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>
        {/* Edit Thumbnail */}
        <Modal
          isActive={this.state.isEditingThumbnail}
          hasControls={false}
          handleClose={async () => {
            this.setState({
              isEditingThumbnail: false,
              uploadProgress: 0,
              errors: [],
            });
          }}
        >
          <div className="content">
            <h2>Upload Thumbnail</h2>
            <Errors errors={this.state.errors} />
            <UploadForm
              progress={this.state.uploadProgress}
              handleSubmit={async (values, setSubmitting) => {
                try {
                  await AdminAuth.uploadThumbnail(
                    AdminAuth.user,
                    values.file,
                    (progressEvent) => {
                      const progress = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total,
                      );
                      this.setState({
                        uploadProgress: progress,
                        errors: [],
                      });
                    },
                  );
                  this.setState({
                    isEditingThumbnail: false,
                    uploadProgress: 0,
                    errors: [],
                  });
                } catch (e) {
                  if (e.response) {
                    this.setState({
                      uploadProgress: 0,
                      errors: e.response.data,
                    });
                  }
                }
                setSubmitting(false);
              }}
            />
            <Notification>
              <Icon iconName="info-circle" />
              Images uploaded will be automatically resized to{' '}
              <strong>640x480</strong> pixels
            </Notification>
          </div>
        </Modal>
      </>
    );
  }
}
