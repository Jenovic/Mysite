import { Service } from '@tsed/di';
import { pick, mergeWith } from 'lodash';
import User from '../models/User';

@Service()
export default class UserManager implements IManager<User> {
  public async findAll(): Promise<User[]> {
    return User.findAll({
      order: [['name', 'ASC']],
    });
  }

  public async find(uuid: string): Promise<User> {
    return User.findById(uuid);
  }

  public async findByEmail(email: string): Promise<User> {
    return User.find({ where: { email } });
  }

  public async create(fields: Partial<User>): Promise<User> {
    const user = await User.create(fields);
    return this.find(user.uuid.toString());
  }

  public async update(uuid: string, fields: Partial<User>): Promise<User> {
    const user = await User.findById(uuid);
    await user.update(
      mergeWith({}, pick(user, ['name', 'email', 'password']), fields),
    );
    return this.find(user.uuid.toString());
  }

  public async destroy(uuid) {
    const user = await this.find(uuid);
    await user.destroy();
  }
}
