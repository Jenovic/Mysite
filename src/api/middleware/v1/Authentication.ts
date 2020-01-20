import { IMiddleware, Session, Response, Next, Middleware } from '@tsed/common';

/**
 * Check if a user has logged in
 */
@Middleware()
export default class Authenticated implements IMiddleware {
  public use(@Session() session: ISession, @Response() res, @Next() next) {
    if (!session.user) {
      return res.send(401);
    }
    next();
  }
}
