import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import Icon from '../../components/Icon';
import Footer from '../../components/Footer';

declare var location: any;

interface Props {
  history: any;
}

interface State {}

/**
 * Admin
 */
export default class View extends React.Component<Props, State> {
  render() {
    return (
      <>
        <Helmet title={'admin'} />
        <section className="admin">
          <Breadcrumb
            breadcrumbs={[
              {
                name: 'Admin',
                link: '/admin',
              },
            ]}
            className="articles"
            backText="Return Home"
            handleBack={() => {
              this.props.history.push('/admin');
            }}
          />
        </section>
        <section className="is-fullheight is-primary content">
          <div className="container archive">
            <div className="cols is-centered is-multiline articles"></div>
          </div>
        </section>
        <Footer />
      </>
    );
  }
}
