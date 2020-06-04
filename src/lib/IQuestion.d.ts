interface IQuestion {
  uuid?: any;
  text: string;
  moduleUuid?: any;
  module?: IModule;
  answers: IAnswer[];
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}
