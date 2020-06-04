import Axios from 'axios';
import { observable } from 'mobx';
import { findIndex } from 'lodash';
import * as queryString from 'query-string';
import Category from '../models/Category';

class CategoryManager implements IManager<Category> {
  @observable categories: Category[] = [];

  private sync(category: Category) {
    const index = findIndex(this.categories, { uuid: category.uuid });
    if (index !== -1) {
      this.categories.splice(index, 1, category);
    } else {
      this.categories.push(category);
    }
    return category;
  }

  async findAll(
    options: { page?: number; limit?: number } = {},
  ): Promise<Category[]> {
    const response = await Axios.get(
      `categories?${queryString.stringify(options)}`,
    );
    this.categories = response.data.map((category) => new Category(category));
    return this.categories;
  }

  async find(uuid: string): Promise<Category> {
    const response = await Axios.get(`categories/${uuid}`);
    return this.sync(new Category(response.data));
  }

  async create(fields: Partial<Category>): Promise<Category> {
    const response = await Axios.post('categories', {
      name: fields.name,
    });
    return this.sync(new Category(response.data));
  }

  async update(uuid: string, fields: Partial<Category>): Promise<Category> {
    const response = await Axios.put(`categories/${uuid}`, {
      name: fields.name,
    });
    return this.sync(new Category(response.data));
  }

  async destroy(uuid: string) {
    await Axios.delete(`categories/${uuid}`);
    const index = findIndex(this.categories, { uuid });
    if (index !== -1) {
      this.categories.splice(index, 1);
    }
  }
}

export default new CategoryManager();
