import * as Sequelize from 'sequelize';
import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript';
import { Property } from '@tsed/common';
import Module from './Module';
import ModuleCategory from './ModuleCategory';

@Table({
  tableName: 'categories',
  timestamps: true,
  paranoid: true,
})
export default class Category extends Model<Category> implements ICategory {
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

  @BelongsToMany(() => Module, () => ModuleCategory)
  public modules: Module[];

  /**
   * Hide specific fields publicly
   */
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.deletedAt;
    delete values.ModuleCategory;
    return values;
  }
}
