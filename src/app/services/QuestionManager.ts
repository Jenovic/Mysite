import Axios from 'axios';
import { observable } from 'mobx';
import { findIndex } from 'lodash';
import Module from '../models/Module';
import Question from '../models/Question';
import Answer from '../models/Answer';

class QuestionManager implements IManager<Question> {
  @observable questions: Question[] = [];

  private sync(question: Question) {
    const index = findIndex(this.questions, { uuid: question.uuid });
    if (index !== -1) {
      this.questions.splice(index, 1, question);
    } else {
      this.questions.push(question);
    }
    return question;
  }

  async findAll(module: Module): Promise<Question[]> {
    if (!module.questions) {
      const response = await Axios.get(`questions?moduleUuid=${module.uuid}`);
      this.questions = response.data.map((question) => new Question(question));
    } else {
      this.questions = module.questions.slice(0);
    }
    return this.questions;
  }

  async find(uuid: string): Promise<Question> {
    const response = await Axios.get(`questions/${uuid}`);
    if (!response.data) {
      return;
    }
    return this.sync(new Question(response.data));
  }

  async create(fields: Partial<Question>): Promise<Question> {
    const response = await Axios.post('questions', fields);
    return this.sync(new Question(response.data));
  }

  async update(uuid: string, fields: Partial<Question>): Promise<Question> {
    const response = await Axios.put(`questions/${uuid}`, fields);
    return this.sync(new Question(response.data));
  }

  async destroy(uuid: string) {
    await Axios.delete(`questions/${uuid}`);
    const index = findIndex(this.questions, { uuid });
    if (index !== -1) {
      this.questions.splice(index, 1);
    }
  }

  async addAnswer(
    question: Question,
    fields: Partial<Answer>,
  ): Promise<Question> {
    const response = await Axios.post('questions/answers', fields);
    question.answers.push(new Answer(response.data));
    return this.sync(question);
  }

  async updateAnswer(
    question: Question,
    answer: Answer,
    fields: Partial<Answer>,
  ): Promise<Question> {
    const response = await Axios.put(
      `questions/answers/${answer.uuid}`,
      fields,
    );
    const index = findIndex(question.answers, { uuid: answer.uuid });
    if (index !== -1) {
      question.answers.splice(index, 1, new Answer(response.data));
    } else {
      question.answers.push(answer);
    }
    return this.sync(question);
  }

  async removeAnswer(question: Question, answer: Answer): Promise<Question> {
    await Axios.delete(`questions/answers/${answer.uuid}`);
    const index = findIndex(question.answers, { uuid: answer.uuid });
    if (index !== -1) {
      question.answers.splice(index, 1);
    }
    return this.sync(question);
  }
}

export default new QuestionManager();
