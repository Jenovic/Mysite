// import * as React from 'react';
// import { Helmet } from 'react-helmet';
// import { observer } from 'mobx-react';
// import { Link, Redirect } from 'react-router-dom';
// import Practice from '../../models/Practice';
// import AdminAuth from '../../services/AdminAuth';
// import PracticeManager from '../../services/PracticeManager';

// import Section from '../../components/Section';
// import Card from '../../components/Card';
// import Icon from '../../components/Icon';
// import Modal from '../../components/Modal';
// import Notification from '../../components/Notification';
// import Errors from '../../components/Errors';
// import ResourceList from '../../components/ResourceList';
// import PracticeForm from '../../components/PracticeForm';
// import Loader from '../../components/Loader';
// import Pagination from '../../components/Pagination';
// import Breadcrumb from '../../components/Breadcrumb';

// interface State {
//   practice: Practice;
//   didCreate: boolean;
//   isEditing: boolean;
//   isRemoving: boolean;
//   errors: string[];
//   isLoaded: boolean;
//   page: number;
// }

// @observer
// export default class View extends React.Component<{}, State> {
//   PRACTICES_PER_PAGE = 10;

//   constructor(props) {
//     super(props);
//     this.state = {
//       practice: null,
//       didCreate: false,
//       isEditing: false,
//       isRemoving: false,
//       errors: [],
//       isLoaded: false,
//       page: 1,
//     };
//   }

//   async componentDidMount() {
//     await PracticeManager.findAll({
//       page: this.state.page,
//       limit: this.PRACTICES_PER_PAGE,
//     });
//     this.setState({ isLoaded: true });
//   }

//   render() {
//     if (!AdminAuth.admin) {
//       return <Redirect to="/admin/login" />;
//     }
//     return (
//       <>
//         <Helmet title="Suppliers" />
//         <Breadcrumb
//           breadcrumbs={[
//             {
//               name: 'Admin Panel',
//               link: '/admin',
//             },
//             {
//               name: 'Suppliers',
//               link: '/admin/practice',
//             },
//           ]}
//         />
//         <Section>
//           <div className="columns">
//             <div className="column is-8">
//               <Card className="is-fixed-height">
//                 <h1 className="title is-3">Suppliers</h1>
//                 {!this.state.isLoaded && <Loader />}
//                 {this.state.isLoaded &&
//                 PracticeManager.practices.length === 0 ? (
//                   <Notification>No suppliers mirrored</Notification>
//                 ) : (
//                   this.state.isLoaded && (
//                     <>
//                       <ResourceList
//                         items={PracticeManager.practices.slice(
//                           0,
//                           this.PRACTICES_PER_PAGE,
//                         )}
//                         iconName="clinic-medical"
//                         renderContent={(practice: Practice) => (
//                           <>
//                             <div>
//                               <strong>{practice.name}</strong>
//                               {!!practice.postcode && `, ${practice.postcode}`}
//                               &nbsp;
//                               <small className="has-text-grey">
//                                 {practice.externalRef}
//                               </small>
//                               <br />
//                               <small className="has-text-grey">
//                                 {!practice.group
//                                   ? 'No E-Learning profile'
//                                   : practice.group.name}
//                               </small>
//                             </div>
//                           </>
//                         )}
//                         renderControls={(practice: Practice) => (
//                           <div className="buttons">
//                             <button
//                               className="button"
//                               onClick={() => {
//                                 this.setState({
//                                   practice,
//                                   isEditing: true,
//                                   errors: [],
//                                 });
//                               }}
//                             >
//                               <Icon iconName="pen" />
//                               <span>Edit</span>
//                             </button>
//                             <button
//                               className="button"
//                               onClick={() => {
//                                 this.setState({
//                                   practice,
//                                   isRemoving: true,
//                                   errors: [],
//                                 });
//                               }}
//                             >
//                               <Icon iconName="times" />
//                               <span>Remove</span>
//                             </button>
//                           </div>
//                         )}
//                       />
//                       <br />
//                       <Pagination
//                         page={this.state.page}
//                         isLoading={!this.state.isLoaded}
//                         hasNextPage={
//                           PracticeManager.practices.length >
//                           this.PRACTICES_PER_PAGE
//                         }
//                         handlePaginate={async (page) => {
//                           this.setState({ isLoaded: false });
//                           await PracticeManager.findAll({
//                             page,
//                             limit: this.PRACTICES_PER_PAGE,
//                           });
//                           this.setState({ page, isLoaded: true });
//                         }}
//                       />
//                     </>
//                   )
//                 )}
//               </Card>
//             </div>
//             <div className="column is-4">
//               {this.state.didCreate ? (
//                 <Notification className="is-primary">
//                   Supplier created.{' '}
//                   <a
//                     onClick={() => {
//                       this.setState({ didCreate: false });
//                     }}
//                   >
//                     Create another?
//                   </a>
//                 </Notification>
//               ) : (
//                 <>
//                   <Card className="is-fixed-height">
//                     <h2 className="title is-4">New Supplier</h2>
//                     <Notification className="is-primary">
//                       <div className="media">
//                         <div className="media-left">
//                           <Icon iconName="exclamation-triangle" />
//                         </div>
//                         <div className="media-content">
//                           Suppliers are mirrored to entries in Retail Portal.
//                           Please <strong>do not</strong> make any changes,
//                           unless you absolutely have to.
//                         </div>
//                       </div>
//                     </Notification>
//                     <PracticeForm
//                       buttonText="Create"
//                       handleSubmit={async (fields, setSubmitting) => {
//                         try {
//                           await PracticeManager.create(fields);
//                           setSubmitting(false);
//                           this.setState({
//                             errors: [],
//                             didCreate: true,
//                           });
//                         } catch (e) {
//                           setSubmitting(false);
//                           if (e.response) {
//                             this.setState({ errors: e.response.data });
//                           }
//                         }
//                       }}
//                     />
//                     <br />
//                     {!this.state.isEditing && (
//                       <Errors errors={this.state.errors} />
//                     )}
//                   </Card>
//                 </>
//               )}
//             </div>
//           </div>
//         </Section>

//         {/* Edit Practice */}
//         <Modal
//           isActive={this.state.isEditing}
//           hasControls={false}
//           handleClose={async () => {
//             this.setState({
//               practice: null,
//               isEditing: false,
//               errors: [],
//             });
//           }}
//         >
//           <div className="content">
//             <h2>Edit Supplier</h2>
//             <Notification className="is-primary">
//               <div className="media">
//                 <div className="media-left">
//                   <Icon iconName="exclamation-triangle" />
//                 </div>
//                 <div className="media-content">
//                   Suppliers are mirrored to entries in Retail Portal. Please{' '}
//                   <strong>do not</strong> make any changes, unless you
//                   absolutely have to.
//                 </div>
//               </div>
//             </Notification>
//             <Errors errors={this.state.errors} />
//             {this.state.practice && (
//               <PracticeForm
//                 practice={this.state.practice}
//                 buttonText="Update"
//                 handleSubmit={async (fields, setSubmitting) => {
//                   try {
//                     await PracticeManager.update(
//                       this.state.practice.uuid,
//                       fields,
//                     );
//                     setSubmitting(false);
//                     this.setState({
//                       errors: [],
//                       isEditing: false,
//                     });
//                   } catch (e) {
//                     setSubmitting(false);
//                     if (e.response) {
//                       this.setState({ errors: e.response.data });
//                     }
//                   }
//                 }}
//               />
//             )}
//           </div>
//         </Modal>

//         {/* Delete Practice */}
//         <Modal
//           isActive={this.state.isRemoving}
//           handleClose={async (status) => {
//             try {
//               if (status === 1) {
//                 await PracticeManager.destroy(this.state.practice.uuid);
//               }
//               this.setState({
//                 practice: null,
//                 isRemoving: false,
//                 errors: [],
//               });
//             } catch (e) {
//               if (e.response) {
//                 this.setState({ errors: e.response.data });
//               }
//             }
//           }}
//           confirmText="Remove"
//         >
//           <div className="content">
//             <h2>Remove Supplier</h2>
//             {this.state.practice && (
//               <>
//                 <Notification className="is-primary">
//                   <div className="media">
//                     <div className="media-left">
//                       <Icon iconName="exclamation-triangle" />
//                     </div>
//                     <div className="media-content">
//                       Suppliers are mirrored to entries in Retail Portal. Please{' '}
//                       <strong>do not delete this</strong>, unless you absolutely
//                       have to.
//                     </div>
//                   </div>
//                 </Notification>
//                 <p>
//                   Are you still sure you want to remove{' '}
//                   <strong>{this.state.practice.name}</strong>?
//                 </p>
//               </>
//             )}
//           </div>
//         </Modal>
//       </>
//     );
//   }
// }
