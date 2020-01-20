import {
  Controller,
  Post,
  BodyParams,
  Response,
  Session,
  Get,
  Put,
  Use,
} from '@tsed/common';
import { Description } from '@tsed/swagger';
import User from '../../models/User';
import Authenticated from '../../middleware/v1/Authentication';
import UserManager from '../../services/UserManager';
import { Sequelize } from 'sequelize-typescript';

@Controller('/auth')
export default class AuthController {
  constructor(private userManager: UserManager) {}

  /**
   * Register a new user
   */
  @Post('/register')
  @Description('Register a new user')
  public async register(
    @BodyParams('name') name: string,
    @BodyParams('email') email: string,
    @BodyParams('password') password: string,
    @BodyParams('confirmPassword') confirmPassword: string,
  ) {
    if (password !== confirmPassword) {
      throw new Sequelize.ValidationError('Passwords do not match');
    }
    return this.userManager.create({ name, email, password });
  }

  /**
   * Authenticate a user
   */
  @Post('/login')
  @Description('Authenticate a user')
  public async login(
    @BodyParams('email') email: string,
    @BodyParams('password') password: string,
    @Session() session: ISession,
    @Response() res,
  ) {
    const user = await this.userManager.findByEmail(email);
    if (!user || !user.verifyPassword(password)) {
      return res.send(400);
    }
    session.user = user;
    res.send(200);
  }

  /**
   * Un-authenticate a user
   */
  @Post('/logout')
  @Description('Un-authenticate a user')
  public async logout(@Session() session: ISession, @Response() res) {
    session.user = undefined;
    res.send(200);
  }

  /**
   * Get current user details
   */
  @Get('/')
  @Use(Authenticated)
  @Description('Get current user details')
  public async get(@Session() session: ISession) {
    return this.userManager.find(session.user.uuid);
  }

  /**
   * Edit current user details
   */
  @Put('/')
  @Use(Authenticated)
  @Description('Edit current user details')
  public async edit(
    @BodyParams() fields: Partial<User>,
    @Session() session: ISession,
  ) {
    return this.userManager.update(session.user.uuid, fields);
  }
}
