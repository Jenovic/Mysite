import Axios from 'axios';
import { observable } from 'mobx';
import { findIndex } from 'lodash';
import User from '../models/User';

class UserManager implements IManager<User> {
  @observable users: User[] = [];

  private sync(user: User) {
    const index = findIndex(this.users, { uuid: user.uuid });
    if (index !== -1) {
      this.users.splice(index, 1, user);
    } else {
      this.users.push(user);
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    const response = await Axios.get('users');
    this.users = response.data.map((user) => new User(user));
    return this.users;
  }

  async find(uuid: string): Promise<User> {
    const response = await Axios.get(`users/${uuid}`);
    return this.sync(new User(response.data));
  }

  async create(fields: Partial<User>): Promise<User> {
    const response = await Axios.post('users', fields);
    return this.sync(new User(response.data));
  }

  async update(uuid: string, fields: Partial<User>): Promise<User> {
    const response = await Axios.put(`users/${uuid}`, fields);
    return this.sync(new User(response.data));
  }

  async destroy(uuid: string) {
    await Axios.delete(`users/${uuid}`);
    const index = findIndex(this.users, { uuid });
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}

export default new UserManager();
