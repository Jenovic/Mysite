import Resource from './Resource';
import ResultAnswer from './ResultAnswer';
import Module from './Module';
import User from './User';

export default class Result extends Resource implements IResult {
  didPass: boolean;
  actualMark: number;
  passMark: number;
  isVerifiable: boolean;
  verifiableHours: number;
  module?: Module;
  user?: User;
  answers?: ResultAnswer[];

  constructor(data: Partial<Result>) {
    super(data);
    if (data.module) {
      this.module = new Module(data.module);
    }
    if (data.user) {
      this.user = new User(data.user);
    }
    if (data.answers) {
      this.answers = data.answers.map((answer) => new ResultAnswer(answer));
    }
  }

  /**
   * Display the time verifiable in a readable string
   */
  get verifiableHoursText(): string {
    if (!this.verifiableHours) {
      return 'No time set';
    }
    if (this.verifiableHours < 1) {
      return `${this.verifiableHours * 60} minutes`;
    }
    if (this.verifiableHours === 1) {
      return '1 hour';
    }
    return `${this.verifiableHours} hours`;
  }
}
