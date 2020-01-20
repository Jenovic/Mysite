import Resource from './Resource';

export default class User extends Resource implements IUser {
  name: string;
  email: string;
  password?: string;

  constructor(data: Partial<User>) {
    super(data);
  }
}
