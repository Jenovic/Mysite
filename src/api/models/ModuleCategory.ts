import * as Sequelize from 'sequelize';
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Property } from '@tsed/common';
import Module from './Module';
import Category from './Category';

@Table({
  tableName: 'module_categories',
  timestamps: false,
  paranoid: false,
})
export default class ModuleCategory extends Model<ModuleCategory> {
  @Property()
  @ForeignKey(() => Module)
  @Column({
    type: Sequelize.UUID,
  })
  moduleUuid: Sequelize.DataTypeUUID;

  @Property()
  @ForeignKey(() => Category)
  @Column({
    type: Sequelize.UUID,
  })
  categoryUuid: Sequelize.DataTypeUUID;
}
