// import * as React from 'react';
// import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';
// import ResultManager from '../../services/ResultManager';

// import Section from '../../components/Section';
// import Pagination from '../../components/Pagination';
// import Notification from '../../components/Notification';
// import Icon from '../../components/Icon';
// import AdminAuth from '../../services/AdminAuth';
// import CategoryManager from '../../services/CategoryManager';
// import SearchForm from '../../components/SearchForm';
// import Loader from '../../components/Loader';
// import Card from '../../components/Card';
// import Breadcrumb from '../../components/Breadcrumb';

// interface Props {
//   history: any;
// }

// interface State {
//   items: IBreakdownResult[];
//   isLoaded: boolean;
//   page: number;
//   categoryUuid: string;
//   search: string;
// }

// /**
//  * Results for a practice, visible only to practice admins
//  */
// export default class View extends React.Component<Props, State> {
//   RESULTS_PER_PAGE = 10;

//   constructor(props) {
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//       page: 1,
//       categoryUuid: '',
//       search: '',
//     };
//   }

//   async componentDidMount() {
//     if (!AdminAuth.admin) {
//       this.props.history.replace('/');
//       return;
//     }
//     await Promise.all([
//       CategoryManager.findAll(),
//       this.handleSubmit(this.state.page, null, ''),
//     ]);
//   }

//   async handleSubmit(page: number, categoryUuid: string, search: string) {
//     this.setState({ isLoaded: false });
//     const items = await ResultManager.findPassRates(
//       page,
//       this.RESULTS_PER_PAGE,
//       {
//         categoryUuid,
//         search,
//       },
//     );
//     this.setState({ items, page, search, categoryUuid, isLoaded: true });
//   }

//   render() {
//     return (
//       <>
//         <Helmet title="Pass Rates" />
//         <Breadcrumb
//           breadcrumbs={[
//             {
//               name: 'Admin Panel',
//               link: '/admin',
//             },
//             {
//               name: 'Pass Rates',
//               link: '/admin/results',
//             },
//           ]}
//         />
//         <Section>
//           <Card className="is-min-height">
//             <div className="columns is-centered">
//               <div className="column is-8-fullhd is-10-widescreen">
//                 <h1 className="title">Pass Rates</h1>
//                 <div className="field is-grouped">
//                   <div className="control is-expanded">
//                     <SearchForm
//                       handleSubmit={async ({ search }, setSubmitting) => {
//                         await this.handleSubmit(
//                           1,
//                           this.state.categoryUuid,
//                           search,
//                         );
//                         setSubmitting(false);
//                       }}
//                     />
//                   </div>
//                   <div className="control">
//                     <div className="select">
//                       <select
//                         name="categoryUuid"
//                         disabled={!this.state.isLoaded}
//                         onChange={async (event) => {
//                           await this.handleSubmit(
//                             1,
//                             event.target.value,
//                             this.state.search,
//                           );
//                         }}
//                       >
//                         <option value="">Filter by Category...</option>
//                         {CategoryManager.categories.map((category) => (
//                           <option
//                             key={category.uuid}
//                             value={category.uuid}
//                             selected={this.state.categoryUuid === category.uuid}
//                           >
//                             {category.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                   <div className="control is-hidden-touch">
//                     <a
//                       className="button is-dark"
//                       href={`/api/v1/results/admin/download?categoryUuid=${
//                         this.state.categoryUuid ? this.state.categoryUuid : ''
//                       }&search=${this.state.search}`}
//                       target="_blank"
//                     >
//                       <span>Export</span>
//                       <Icon iconName="arrow-right" />
//                     </a>
//                   </div>
//                 </div>
//                 {!this.state.isLoaded && <Loader />}
//                 {this.state.isLoaded && this.state.items.length === 0 ? (
//                   <Notification>No results could be found</Notification>
//                 ) : (
//                   this.state.isLoaded && (
//                     <>
//                       <table className="table is-fullwidth">
//                         <thead>
//                           <tr>
//                             <th>Module</th>
//                             <th className="has-text-centered">Attempted</th>
//                             <th className="has-text-centered">Passes</th>
//                             <th className="has-text-centered">Fails</th>
//                             <th className="has-text-centered">
//                               Completion Rate
//                             </th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {this.state.items
//                             .slice(0, this.RESULTS_PER_PAGE)
//                             .map((item) => (
//                               <tr key={item.module.uuid}>
//                                 <td>
//                                   <Link
//                                     to={`/admin/modules/${item.module.uuid}`}
//                                   >
//                                     {item.module.title}
//                                   </Link>
//                                 </td>
//                                 <td className="has-text-centered">
//                                   {item.passCount + item.failCount}
//                                 </td>
//                                 <td className="has-text-centered">
//                                   {item.passCount}
//                                 </td>
//                                 <td className="has-text-centered">
//                                   {item.failCount}
//                                 </td>
//                                 <td className="has-text-centered">
//                                   {Math.round(
//                                     item.passCount /
//                                       (item.passCount + item.failCount) *
//                                       100,
//                                   )}%
//                                 </td>
//                               </tr>
//                             ))}
//                         </tbody>
//                       </table>
//                       <br />
//                       <Pagination
//                         page={this.state.page}
//                         isLoading={!this.state.isLoaded}
//                         hasNextPage={
//                           this.state.items.length > this.RESULTS_PER_PAGE
//                         }
//                         handlePaginate={async (page) => {
//                           this.handleSubmit(
//                             page,
//                             this.state.categoryUuid,
//                             this.state.search,
//                           );
//                         }}
//                       />
//                     </>
//                   )
//                 )}
//               </div>
//             </div>
//           </Card>
//         </Section>
//       </>
//     );
//   }
// }
