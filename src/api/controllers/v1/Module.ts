import {
  Controller,
  Post,
  Use,
  BodyParams,
  Get,
  PathParams,
  Put,
  Delete,
  Response,
  Session,
  QueryParams,
} from '@tsed/common';
import { Description } from '@tsed/swagger';
import Module from '../../models/Module';
import Slide from '../../models/Slide';
import ModuleManager from '../../services/ModuleManager';
import UserManager from '../../services/UserManager';
import Authenticated from '../../middleware/v1/Authentication';
import UserAuthenticated from '../../middleware/v1/Authentication';
import AdminAuthenticated from '../../middleware/v1/Authentication';
// import TestAvailable from '../../middleware/v1/TestAvailable';

@Controller('/modules')
export default class ModuleController implements IController<Module> {
  constructor(
    private moduleManager: ModuleManager,
    private userManager: UserManager,
  ) {}

  /**
   * Add a new module
   */
  @Post('/')
  @Use(AdminAuthenticated)
  @Description('Add a new module')
  public async add(@BodyParams() fields: Partial<Module>) {
    return this.moduleManager.create(fields);
  }

  /**
   * Get a list of modules
   */
  @Get('/')
  @Use(AdminAuthenticated)
  @Description('Get a list of modules')
  public async getAll(
    @QueryParams('page') page?: number,
    @QueryParams('limit') limit?: number,
    @QueryParams('search') search?: string,
  ) {
    return this.moduleManager.findAll(page, limit, search);
  }

  /**
   * Search for a module
   */
  @Get('/search')
  @Use(Authenticated)
  @Description('Search for a module')
  public async search(@QueryParams('query') query: string) {
    return this.moduleManager.search(query);
  }

  /**
   * Get the user's mandatory modules
   */
  @Get('/mandatory')
  @Use(UserAuthenticated)
  @Description("Get the user's mandatory modules")
  public async getMandatory(@Session() session: ISession) {
    // if (!session.practice.group) {
    //   return [];
    // }
    // return this.groupManager.findModules(session.practice.group.uuid);
  }

  /**
   * Get the user's completed modules
   */
  @Get('/completed')
  @Use(UserAuthenticated)
  @Description("Get the user's completed modules")
  public async getCompleted(@Session() session: ISession) {
    // return this.userManager.getCompletedModules(session.user.uuid);
  }

  /**
   * Get a module
   */
  @Get('/:uuid')
  @Use(Authenticated)
  @Description('Get a module')
  public async get(@PathParams('uuid') uuid: string, @Response() res) {
    const module = await this.moduleManager.find(uuid);
    if (!module) {
      res.send(404);
    }
    return module;
  }

  /**
   * Edit a module
   */
  @Put('/:uuid')
  @Use(AdminAuthenticated)
  @Description('Edit a module')
  public async edit(
    @PathParams('uuid') uuid: string,
    @BodyParams() fields: Partial<Module>,
  ) {
    return this.moduleManager.update(uuid, fields);
  }

  /**
   * Delete a module
   */
  @Delete('/:uuid')
  @Use(AdminAuthenticated)
  @Description('Delete a module')
  public async delete(@PathParams('uuid') uuid: string, @Response() res) {
    await this.moduleManager.destroy(uuid);
    return res.send(200);
  }

  /**
   * Add a category to a module
   */
  @Post('/:uuid/categories')
  @Use(AdminAuthenticated)
  @Description('Add a category to a module')
  public async addCategory(
    @PathParams('uuid') uuid: string,
    @BodyParams('categoryUuid') categoryUuid: string,
  ) {
    return this.moduleManager.addCategory(uuid, categoryUuid);
  }

  /**
   * Remove a category from a module
   */
  @Delete('/:uuid/categories/:categoryUuid')
  @Use(AdminAuthenticated)
  @Description('Remove a category from a module')
  public async removeCategory(
    @PathParams('uuid') uuid: string,
    @PathParams('categoryUuid') categoryUuid: string,
    @Response() res,
  ) {
    await this.moduleManager.removeCategory(uuid, categoryUuid);
    res.send(200);
  }

  /**
   * Add a slide to a module
   */
  @Post('/:uuid/slides')
  @Use(AdminAuthenticated)
  @Description('Add a slide to a module')
  public async addSlide(
    @PathParams('uuid') uuid: string,
    @BodyParams('title') title: string,
    @BodyParams('content') content: string,
  ) {
    return this.moduleManager.addSlide(uuid, { title, content });
  }

  /**
   * Update a module's slides
   */
  @Put('/:uuid/slides')
  @Use(AdminAuthenticated)
  @Description("Update a module's slides")
  public async updateSlides(
    @PathParams('uuid') uuid: string,
    @BodyParams('slides') slides: Slide[],
  ) {
    return this.moduleManager.setSlides(uuid, slides);
  }

  /**
   * Remove a slide from a module
   */
  @Delete('/:uuid/slides/:slideUuid')
  @Use(AdminAuthenticated)
  @Description('Remove a slide from a module')
  public async removeSlide(
    @PathParams('uuid') uuid: string,
    @PathParams('slideUuid') slideUuid: string,
    @Response() res,
  ) {
    await this.moduleManager.removeSlide(uuid, slideUuid);
    res.send(200);
  }

  /**
   * Approve a module
   */
  @Post('/:uuid/approve')
  @Use(AdminAuthenticated)
  @Description('Approve a module')
  public async approve(
    @PathParams('uuid') uuid: string,
    @Session() session: ISession,
    @Response() res,
  ) {
    const response = await this.moduleManager.approve(uuid, session.user);
    if (Array.isArray(response)) {
      res.status(400);
    }
    return response;
  }

  /**
   * Review a module
   */
  @Post('/:uuid/review')
  @Use(AdminAuthenticated)
  @Description('Review a module')
  public async review(@PathParams('uuid') uuid: string, @Response() res) {
    return this.moduleManager.review(uuid);
  }
}
