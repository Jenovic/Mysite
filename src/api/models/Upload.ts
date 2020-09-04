import * as Sequelize from 'sequelize';
import { Table, Model, Column, ForeignKey } from 'sequelize-typescript';
import { Property } from '@tsed/common';
import Module from '../models/Module';
import Slide from '../models/Slide';
import User from '../models/User';

@Table({
  tableName: 'uploads',
  timestamps: true,
  paranoid: true,
})
export default class Upload extends Model<Upload> implements IUpload {
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
  })
  public url: string;

  @Property()
  @Column({
    type: Sequelize.ENUM('IMAGE', 'DOCUMENT'),
    defaultValue: 'IMAGE',
    allowNull: false,
  })
  public type: 'IMAGE' | 'DOCUMENT';

  @Property()
  @ForeignKey(() => Module)
  @Column({
    type: Sequelize.UUID,
  })
  public moduleUuid: Sequelize.DataTypeUUID;

  @Property()
  @ForeignKey(() => Slide)
  @Column({
    type: Sequelize.UUID,
  })
  public slideUuid: Sequelize.DataTypeUUID;

  @Property()
  @ForeignKey(() => User)
  @Column({
    type: Sequelize.UUID,
  })
  public userUuid: Sequelize.DataTypeUUID;

  /**
   * Hide specific fields publicly
   */
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.moduleUuid;
    delete values.slideUuid;
    delete values.userUuid;
    delete values.deletedAt;
    return values;
  }
}
