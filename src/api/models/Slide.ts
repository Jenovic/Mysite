import * as Sequelize from 'sequelize';
import { Table, Model, Column } from 'sequelize-typescript';
import { Property } from '@tsed/common';

@Table({
  tableName: 'slides',
  timestamps: true,
  paranoid: true,
})
export default class Slide extends Model<Slide> implements ISlide {
  @Property()
  @Column({
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
  })
  public uuid: Sequelize.DataTypeUUID;

  @Property()
  @Column({
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: '',
    validate: {
      notEmpty: { msg: 'Title cannot be blank' },
    },
  })
  public title: string;

  @Property()
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  })
  public content: string;

  /**
   * Hide specific fields publicly
   */
  toJSON() {
    const values = Object.assign({}, this.get());
    delete values.deletedAt;
    delete values.ModuleSlide;
    return values;
  }
}
