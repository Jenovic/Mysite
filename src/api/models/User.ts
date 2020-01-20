import * as Sequelize from 'sequelize';
import {
  Table,
  Model,
  Column,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { Property } from '@tsed/common';
import * as bcrypt from 'bcrypt';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export default class User extends Model<User> implements IUser {
  @Property()
  @Column({
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  })
  public uuid: Sequelize.DataTypeUUID;

  @Property()
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: { msg: 'Name cannot be blank' },
    },
  })
  public name: string;

  @Property()
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: { msg: 'Email cannot be blank' },
      isEmail: { msg: 'Email must be in a valid format' },
      isUnique(email, next) {
        User.findOne({ where: { email } }).done((user) => {
          if (user && user.uuid !== this.uuid) {
            return next('Email is already in use');
          }
          next();
        });
      },
    },
  })
  public email: string;

  @Property()
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: { msg: 'Password cannot be blank' },
      isLong(password, next) {
        if (password.length < 6) {
          return next('Password must be at least 6 characters');
        }
        next();
      },
    },
  })
  public password?: string;

  /**
   * Handle user registration
   */
  @BeforeCreate
  static onRegister(user: User) {
    user.hashPassword();
  }

  /**
   * Handle user update
   */
  @BeforeUpdate
  static onUpdate(user: User) {
    if (user.changed('password')) {
      user.hashPassword();
    }
  }

  /**
   * Hide specific fields publicly
   */
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.password;
    delete values.deletedAt;
    return values;
  }

  /**
   * Hash a user's password
   */
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 2);
  }

  /**
   * Verify the user's password
   */
  verifyPassword(password: string): boolean {
    return (
      password !== undefined && bcrypt.compareSync(password, this.password)
    );
  }
}
