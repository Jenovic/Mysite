import * as Sequelize from 'sequelize';
import { Table, Model, Column } from 'sequelize-typescript';
import { Property } from '@tsed/common';

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

  /**
   * Hide specific fields publicly
   */
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.deletedAt;
    return values;
  }
}
