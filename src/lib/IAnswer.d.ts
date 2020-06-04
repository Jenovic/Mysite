interface IAnswer {
  uuid?: any;
  text: string;
  isCorrect?: boolean;
  questionUuid?: any;
  question?: IQuestion;
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}
