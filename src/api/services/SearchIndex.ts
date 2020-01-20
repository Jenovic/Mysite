import * as Fuse from 'fuse.js';
import { findIndex } from 'lodash';

export default class SearchIndex<Resource> {
  items: Array<Resource>;
  index: Fuse<Resource>;
  options;

  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Set the items of the index
   */
  public set(items: Resource[]) {
    this.items = items;
    this.build();
  }

  /**
   * Add an item to the index
   */
  public add(item: Resource) {
    this.items.push(item);
    this.build();
  }

  /**
   * Remove an item from the index
   */
  public remove(where) {
    const index = findIndex(this.items, where);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.build();
  }

  /**
   * Build the index
   */
  private build() {
    this.index = new Fuse(this.items, this.options);
  }

  /**
   * Search the index
   */
  public search(query: string): Resource[] {
    return this.index.search(query);
  }
}
