import * as Sequelize from 'sequelize';
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Property } from '@tsed/common';
import Module from './Module';
import Slide from './Slide';

@Table({
  tableName: 'module_slides',
  timestamps: false,
  paranoid: false,
})
export default class ModuleSlide extends Model<ModuleSlide> {
  @Property()
  @ForeignKey(() => Module)
  @Column({
    type: Sequelize.UUID,
  })
  moduleUuid: Module;

  @Property()
  @ForeignKey(() => Slide)
  @Column({
    type: Sequelize.UUID,
  })
  slideUuid: Slide;
}
