// import { IMiddleware, Session, Response, Next, Middleware } from '@tsed/common';

// /**
//  * Check if the logged in user is an admin
//  */
// @Middleware()
// export default class UserAdminAuthenticated implements IMiddleware {
//   public use(@Session() session: ISession, @Response() res, @Next() next) {
//     if (!session.user || !session.practice || !session.isPracticeAdmin) {
//       return res.send(401);
//     }
//     next();
//   }
// }
