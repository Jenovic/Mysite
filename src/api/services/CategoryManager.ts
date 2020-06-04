import { Service } from '@tsed/di';
import { pick, mergeWith } from 'lodash';
import Category from '../models/Category';
import Module from '../models/Module';

@Service()
export default class CategoryManager implements IManager<Category> {
  public async findAll(page: number, limit: number): Promise<Category[]> {
    const options: any = {
      order: [['name', 'ASC']],
    };

    if (page && limit) {
      options.limit = limit + 1;
      options.offset = limit * (page - 1);
    }

    return Category.findAll(options);
  }

  public async find(uuid: string): Promise<Category> {
    return Category.findById(uuid);
  }

  public async findModules(
    uuid: string,
    page?: number,
    limit?: number,
  ): Promise<Module[]> {
    const options: any = {
      where: {
        status: 'APPROVED',
      },
      include: [
        {
          model: Category,
          where: {
            uuid,
          },
        },
      ],
      order: [['approvedAt', 'DESC']],
    };

    if (page && limit) {
      options.limit = limit + 1;
      options.offset = limit * (page - 1);
    }

    return Module.findAll(options);
  }

  public async create(fields: Partial<Category>): Promise<Category> {
    return Category.create(fields);
  }

  public async update(
    uuid: string,
    fields: Partial<Category>,
  ): Promise<Category> {
    const category = await this.find(uuid);
    await category.update(mergeWith({}, pick(category, ['name']), fields));
    return category;
  }

  public async destroy(uuid: string) {
    const category = await this.find(uuid);
    await category.destroy();
  }
}
