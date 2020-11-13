import {
  Controller,
  Get,
  Post,
  BodyParams,
  Put,
  Use,
  PathParams,
  QueryParams,
  Delete,
} from '@tsed/common';
import { Description } from '@tsed/swagger';
import User from '../../models/User';
import Authenticated from '../../middleware/v1/Authentication';
import UserManager from '../../services/UserManager';

@Controller('/users')
export default class UserController implements IController<User> {
  constructor(private userManager: UserManager) {}

  /**
   * Get a list of users
   */
  @Get('/')
  @Use(Authenticated)
  @Description('Get a list of users')
  public async getAll(): Promise<User[]> {
    return this.userManager.findAll();
  }

  /**
   * Get a user by name
   */
  @Get('/:name')
  @Use(Authenticated)
  @Description('Get a user by name')
  public async getUser(@PathParams('name') name: string): Promise<User> {
    return this.userManager.findByName(name);
  }

  /**
   * Get a user
   */
  @Get('/:uuid')
  @Use(Authenticated)
  @Description('Get a user')
  public async get(@PathParams('uuid') uuid: string): Promise<User> {
    return this.userManager.find(uuid);
  }

  /**
   * Add a new user
   */
  @Post('/')
  @Use(Authenticated)
  @Description('Add a new user')
  public async add(@BodyParams() fields: Partial<User>): Promise<User> {
    return this.userManager.create(fields);
  }

  /**
   * Edit a user
   */
  @Put('/:uuid')
  @Use(Authenticated)
  @Description('Edit a user')
  public async edit(
    @PathParams('uuid') uuid: string,
    @BodyParams() fields: Partial<User>,
  ): Promise<User> {
    return this.userManager.update(uuid, fields);
  }

  /**
   * Delete a user
   */
  @Delete('/:uuid')
  @Use(Authenticated)
  @Description('Delete a user')
  public async delete(@PathParams('uuid') uuid: string) {
    return this.userManager.destroy(uuid);
  }
}
