import * as moment from 'moment';

export default class Resource {
  uuid: string;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;

  constructor(data: any) {
    Object.assign(this, data);
    this.createdAt = moment(data.createdAt);
    this.updatedAt = moment(data.updatedAt);
  }
}
