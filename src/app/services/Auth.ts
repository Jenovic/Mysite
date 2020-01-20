import Axios from 'axios';
import { observable } from 'mobx';
import * as Sentry from '@sentry/browser';
import User from '../models/User';

class Auth {
  @observable user: User;
  @observable isOnline: boolean = true;

  public setUser(user: User) {
    this.user = user;
    Sentry.configureScope((scope) => {
      scope.setUser(user);
    });
  }

  public clearUser() {
    this.user = undefined;
  }

  /**
   * Verify a user's authentication session
   */
  public async check(): Promise<boolean> {
    try {
      const response = await Axios.get('auth');
      this.setUser(new User(response.data));
    } catch (e) {
      this.clearUser();

      // Should we flag the system as offline?
      const status: number = e.response.status;
      if (status.toString().slice(0, 1) === '5') {
        this.isOnline = false;
      }
    }
    return this.user !== null;
  }

  /**
   * Register a new user
   */
  public async register(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ): Promise<User> {
    const response = await Axios.post('auth/register', {
      name,
      email,
      password,
      confirmPassword,
    });
    return new User(response.data);
  }

  /**
   * Authenticate a user
   */
  public async login(email: string, password: string): Promise<boolean> {
    try {
      await Axios.post('auth/login', {
        email,
        password,
      });
      const response = await Axios.get('auth');
      this.setUser(new User(response.data));
    } catch (e) {
      this.clearUser();
    }
    return this.user !== null;
  }

  /**
   * Un-authenticate a user
   */
  public async logout() {
    try {
      await Axios.post('auth/logout');
      this.clearUser();
    } catch (e) {}
  }
}

export default new Auth();
