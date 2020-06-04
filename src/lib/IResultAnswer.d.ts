interface IResultAnswer {
  uuid?: any;
  resultUuid?: any;
  result?: IResult;
  isCorrect: boolean;
  questionText: string;
  questionUuid?: any;
  question?: IQuestion;
  answerText: string;
  answerUuid?: any;
  answer?: IAnswer;
  correctAnswerText?: string;
  correctAnswerUuid?: any;
  correctAnswer?: IAnswer;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}
