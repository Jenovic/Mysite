interface IResult {
  uuid?: any;
  didPass: boolean;
  actualMark: number;
  passMark: number;
  isVerifiable: boolean;
  verifiableHours: number;
  module?: IModule;
  moduleUuid?: any;
  user?: IUser;
  userUuid?: any;
  answers?: IResultAnswer[];
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}
