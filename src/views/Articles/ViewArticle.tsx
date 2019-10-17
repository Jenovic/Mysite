import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Breadcrumb from '../../components/Breadcrumb';
import Footer from '../../components/Footer';

interface Props {}

interface State {}

export default class SingleArticle extends React.Component<Props, State> {
  render() {
    <Breadcrumb
      breadcrumbs={[
        {
          name: 'Admin Panel',
          link: '/admin',
        },
        {
          name: 'Admins',
          link: '/admin/users',
        },
      ]}
    />;
    return (
      <>
        <Navbar />
        <Footer />
      </>
    );
  }
}
