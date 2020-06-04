// import {
//   IMiddleware,
//   Session,
//   Response,
//   Next,
//   Middleware,
//   PathParams,
// } from '@tsed/common';
// import * as moment from 'moment';
// import Result from '../../models/Result';

// /**
//  * Check if a test is available for a module
//  */
// @Middleware()
// export default class TestAvailable implements IMiddleware {
//   RESULTS_PER_DAY = 3;

//   public async use(
//     @PathParams('uuid') uuid: string,
//     @Session() session: ISession,
//     @Response() res,
//     @Next() next,
//   ) {
//     const startOfDay = moment().format('YYYY-MM-DD 00:00:00');
//     const endOfDay = moment().format('YYYY-MM-DD 23:59:59');
//     const results = await Result.findAll({
//       where: {
//         userUuid: session.user.uuid,
//         moduleUuid: uuid,
//         createdAt: {
//           $between: [startOfDay, endOfDay],
//         },
//       },
//       paranoid: false, // We mark older entries as deleted
//     });

//     if (results.length >= this.RESULTS_PER_DAY) {
//       res
//         .status(403)
//         .send('You have reached the limit for attempting this test today');
//     }
//     next();
//   }
// }
