import { truncate } from 'lodash';
import Resource from './Resource';
import Module from './Module';
import Answer from './Answer';

export default class Question extends Resource implements IQuestion {
  text: string;
  moduleUuid: string;
  module: Module;
  answers: Answer[];

  constructor(data: Partial<Question>) {
    super(data);
    if (data.answers) {
      this.answers = data.answers.map((answer) => new Answer(answer));
    } else {
      this.answers = [];
    }
  }

  get title(): string {
    return truncate(this.text, { length: 80 });
  }
}
