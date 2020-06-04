// import { IMiddleware, Session, Response, Next, Middleware } from '@tsed/common';

// /**
//  * Check if an admin has logged in
//  */
// @Middleware()
// export default class AdminAuthenticated implements IMiddleware {
//   public use(@Session() session: ISession, @Response() res, @Next() next) {
//     if (!session.admin) {
//       return res.send(401);
//     }
//     next();
//   }
// }
