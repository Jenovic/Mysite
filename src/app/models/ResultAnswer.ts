import Resource from './Resource';

export default class ResultAnswer extends Resource implements IResultAnswer {
  isCorrect: boolean;
  questionText: string;
  answerText: string;
  correctAnswerText?: string;
  didPass: boolean;

  constructor(data: Partial<ResultAnswer>) {
    super(data);
  }
}
