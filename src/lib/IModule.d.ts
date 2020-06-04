interface IModule {
  uuid?: any;
  title: string;
  status?: 'DRAFT' | 'APPROVED' | 'IN REVIEW';
  thumbnail?: string;
  certificate?: string;
  passMark?: number;
  questionCount?: number;
  isVerifiable?: boolean;
  verifiableHours?: number;
  approvedAt?: any;
  approvedBy?: any;
  version?: string;
  categories?: ICategory[];
  slides?: ISlide[];
  questions?: IQuestion[];
  createdAt?: any;
  updatedAt?: any;
  deletedAt?: any;
}
