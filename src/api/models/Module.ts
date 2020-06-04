import * as Sequelize from 'sequelize';
import {
  Table,
  Model,
  Column,
  BelongsToMany,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Property } from '@tsed/common';
import Category from './Category';
import Slide from './Slide';
import ModuleSlide from './ModuleSlide';
import ModuleCategory from './ModuleCategory';
import User from './User';

@Table({
  tableName: 'modules',
  timestamps: true,
  paranoid: true,
})
export default class Module extends Model<Module> implements IModule {
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
      notEmpty: { msg: 'Title cannot be blank' },
    },
  })
  public title: string;

  @Property()
  @Column({
    type: Sequelize.ENUM('DRAFT', 'APPROVED', 'IN REVIEW'),
    defaultValue: 'DRAFT',
    allowNull: false,
  })
  public status: 'DRAFT' | 'APPROVED' | 'IN REVIEW';

  @Property()
  @Column({
    type: Sequelize.STRING,
  })
  public thumbnail: string;

  @Property()
  @Column({
    type: Sequelize.STRING,
  })
  public certificate: string;

  @Property()
  @Column({
    type: Sequelize.INTEGER.UNSIGNED,
  })
  public passMark: number;

  @Property()
  @Column({
    type: Sequelize.INTEGER.UNSIGNED,
  })
  public questionCount: number;

  @Property()
  @Column({
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  public isVerifiable: boolean;

  @Property()
  @Column({
    type: Sequelize.FLOAT(4, 2).UNSIGNED,
    defaultValue: 0,
    allowNull: false,
  })
  public verifiableHours: number;

  @Property()
  @Column({
    type: Sequelize.DATE,
  })
  public approvedAt: number;

  @Property()
  @ForeignKey(() => User)
  @Column({
    type: Sequelize.UUID,
  })
  public approvedBy: Sequelize.DataTypeUUID;

  @Property()
  @Column({
    type: Sequelize.STRING,
    defaultValue: '1.0',
    allowNull: false,
  })
  public version: string;

  @BelongsToMany(() => Category, () => ModuleCategory)
  public categories: Category[];

  public addCategory: (
    category: Category | Sequelize.DataTypeUUID,
    args?,
  ) => Promise<void>;

  public removeCategory: (
    category: Category | Sequelize.DataTypeUUID,
    args?,
  ) => Promise<void>;

  @BelongsToMany(() => Slide, () => ModuleSlide)
  public slides: Slide[];

  public getSlides: (args?) => Promise<Slide[]>;

  public addSlide: (
    slide: Slide | Sequelize.DataTypeUUID,
    args?,
  ) => Promise<void>;

  public setSlides: (
    slides: Slide[] | Sequelize.DataTypeUUID[],
    args?,
  ) => Promise<void>;

  public removeSlide: (
    slide: Slide | Sequelize.DataTypeUUID,
    args?,
  ) => Promise<void>;

  /**
   * Hide specific fields publicly
   */
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.deletedAt;
    delete values.approvedBy;
    delete values.ModuleGroup;
    delete values.ModuleCategory;
    return values;
  }
}
