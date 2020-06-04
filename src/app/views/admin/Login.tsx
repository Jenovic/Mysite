// import * as React from 'react';
// import { Helmet } from 'react-helmet';
// import { observer } from 'mobx-react';
// import { Redirect } from 'react-router';
// import AdminAuth from '../../services/AdminAuth';

// import LoginForm from '../../components/LoginForm';
// import Card from '../../components/Card';
// import Section from '../../components/Section';
// import Errors from '../../components/Errors';

// interface State {
//   didInvalidate: boolean;
// }

// @observer
// export default class View extends React.Component<{}, State> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       didInvalidate: false,
//     };
//   }

//   render() {
//     if (AdminAuth.admin) {
//       return <Redirect to="/admin" />;
//     }
//     return (
//       <>
//         <Helmet title="Login" />
//         <Section>
//           <Card>
//             <div className="columns is-centered">
//               <div className="column is-8">
//                 {this.state.didInvalidate && (
//                   <Errors errors={['Could not log you in']} />
//                 )}
//                 <LoginForm
//                   forgotPasswordLink="/admin/forgot-password"
//                   handleSubmit={async ({ email, password }, setSubmitting) => {
//                     this.setState({ didInvalidate: false });
//                     await AdminAuth.login(email, password);
//                     if (!AdminAuth.admin) {
//                       this.setState({ didInvalidate: true });
//                       setSubmitting(false);
//                       return;
//                     }
//                   }}
//                 />
//               </div>
//             </div>
//           </Card>
//         </Section>
//       </>
//     );
//   }
// }
