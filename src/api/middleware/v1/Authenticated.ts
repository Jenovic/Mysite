// import { IMiddleware, Session, Response, Next, Middleware } from '@tsed/common';

// /**
//  * Check if a user or admin has logged in
//  */
// @Middleware()
// export default class Authenticated implements IMiddleware {
//   public use(@Session() session: ISession, @Response() res, @Next() next) {
//     if ((!session.user || !session.practice) && !session.admin) {
//       return res.send(401);
//     }
//     next();
//   }
// }
