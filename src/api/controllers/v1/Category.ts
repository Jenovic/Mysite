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
  QueryParams,
} from '@tsed/common';
import { Description } from '@tsed/swagger';
import Category from '../../models/Category';
// import Authenticated from '../../middleware/v1/Authenticated';
import AdminAuthenticated from '../../middleware/v1/Authentication';
import CategoryManager from '../../services/CategoryManager';

@Controller('/categories')
export default class CategoryController implements IController<Category> {
  constructor(private categoryManager: CategoryManager) {}

  /**
   * Add a new category
   */
  @Post('/')
  @Use(AdminAuthenticated)
  @Description('Add a new category')
  public async add(@BodyParams('name') name: string) {
    return this.categoryManager.create({ name });
  }

  /**
   * Get a list of categories
   */
  @Get('/')
  // @Use(Authenticated)
  @Description('Get a list of categories')
  public async getAll(
    @QueryParams('page') page?: number,
    @QueryParams('limit') limit?: number,
  ) {
    return this.categoryManager.findAll(page, limit);
  }

  /**
   * Get a category's modules
   */
  @Get('/:uuid/modules')
  @Use(AdminAuthenticated)
  @Description("Get a category's modules")
  public async getModules(
    @PathParams('uuid') uuid: string,
    @QueryParams('page') page?: number,
    @QueryParams('limit') limit?: number,
  ) {
    return this.categoryManager.findModules(uuid, page, limit);
  }

  // /**
  //  * Get a category
  //  */
  @Get('/:uuid')
  // @Use(Authenticated)
  @Description('Get a category')
  public async get(@PathParams('uuid') uuid: string, @Response() res) {
    const category = await this.categoryManager.find(uuid);
    if (!category) {
      res.send(404);
    }
    return category;
  }

  /**
   * Edit a category
   */
  @Put('/:uuid')
  @Use(AdminAuthenticated)
  @Description('Edit a category')
  public async edit(
    @PathParams('uuid') uuid: string,
    @BodyParams() fields: Partial<Category>,
  ) {
    return this.categoryManager.update(uuid, fields);
  }

  /**
   * Delete a category
   */
  @Delete('/:uuid')
  @Use(AdminAuthenticated)
  @Description('Delete a category')
  public async delete(@PathParams('uuid') uuid: string, @Response() res) {
    await this.categoryManager.destroy(uuid);
    return res.send(200);
  }
}
