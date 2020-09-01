import * as moment from 'moment';
import { find, truncate } from 'lodash';
import Resource from './Resource';
import Category from './Category';
import Slide from './Slide';
import Question from './Question';

export default class Module extends Resource implements IModule {
  title: string;
  status: 'DRAFT' | 'APPROVED' | 'IN REVIEW';
  thumbnail?: string;
  certificate?: string;
  passMark?: number;
  questionCount?: number;
  isVerifiable?: boolean;
  verifiableHours?: number;
  approvedAt?: moment.Moment;
  version?: string;
  categories?: Category[];
  slides?: Slide[];
  questions?: Question[];
  createdBy?: string;

  constructor(data: Partial<Module>) {
    super(data);
    this.approvedAt = moment(data.approvedAt);
    if (data.categories) {
      this.categories = data.categories.map(
        (category) => new Category(category),
      );
    }
    if (data.slides) {
      this.slides = data.slides.map((slide) => new Slide(slide));
    }
    if (data.questions) {
      this.questions = data.questions.map((question) => new Question(question));
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

  /**
   * Display the categories in a readable string
   */
  get categoriesText(): string {
    if (!this.categories || this.categories.length === 0) {
      return 'Uncategorised';
    }
    return this.categories.map((category) => category.name).join(', ');
  }

  /**
   * Determines if a module has a category
   */
  hasCategory(category: Category): boolean {
    return !!find(this.categories, { uuid: category.uuid });
  }

  /**
   * Determines if a module can be edited
   */
  isEditable(): boolean {
    return this.status !== 'APPROVED';
  }

  get shortTitle(): string {
    return truncate(this.title, { length: 80 });
  }
}
