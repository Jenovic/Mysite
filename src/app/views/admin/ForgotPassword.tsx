// import * as React from 'react';
// import { Helmet } from 'react-helmet';
// import { observer } from 'mobx-react';
// import { Redirect } from 'react-router';
// import AdminAuth from '../../services/AdminAuth';

// import Hero from '../../components/Hero';
// import Notification from '../../components/Notification';
// import EmailForm from '../../components/EmailForm';
// import Card from '../../components/Card';
// import Section from '../../components/Section';
// import Errors from '../../components/Errors';

// interface State {
//   didInvalidate: boolean;
//   didSucceed: boolean;
// }

// @observer
// export default class View extends React.Component<{}, State> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       didInvalidate: false,
//       didSucceed: false,
//     };
//   }

//   render() {
//     if (AdminAuth.admin) {
//       return <Redirect to="/admin" />;
//     }
//     return (
//       <>
//         <Helmet title="Reset Password" />
//         <Section>
//           <div className="columns is-centered">
//             <div className="column is-8">
//               {this.state.didInvalidate && (
//                 <Errors errors={['Could not reset your password']} />
//               )}
//               {this.state.didSucceed ? (
//                 <Notification className="is-primary">
//                   An email has been sent with a link to reset your password.
//                 </Notification>
//               ) : (
//                 <Card>
//                   <EmailForm
//                     buttonText="Reset Password"
//                     handleSubmit={async ({ email }, setSubmitting) => {
//                       this.setState({ didInvalidate: false });
//                       const didReset = await AdminAuth.forgotPassword(email);
//                       if (!didReset) {
//                         this.setState({
//                           didSucceed: false,
//                           didInvalidate: true,
//                         });
//                         setSubmitting(false);
//                         return;
//                       }
//                       this.setState({ didSucceed: true, didInvalidate: false });
//                     }}
//                   />
//                 </Card>
//               )}
//             </div>
//           </div>
//         </Section>
//       </>
//     );
//   }
// }
