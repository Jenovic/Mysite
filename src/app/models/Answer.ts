import Resource from './Resource';

export default class Answer extends Resource implements IAnswer {
  text: string;
  isCorrect?: boolean;

  constructor(data: Partial<Answer>) {
    super(data);
  }
}
