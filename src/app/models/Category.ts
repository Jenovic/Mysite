import Resource from './Resource';

export default class Category extends Resource implements ICategory {
  name: string;

  constructor(data: Partial<Category>) {
    super(data);
  }
}
