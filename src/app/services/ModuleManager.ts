import Axios from 'axios';
import { observable } from 'mobx';
import { findIndex } from 'lodash';
import * as queryString from 'query-string';
import Module from '../models/Module';
import Slide from '../models/Slide';
import Category from '../models/Category';
import UploadManager from './UploadManager';
import Question from '../models/Question';
import Answer from '../models/Answer';
import Result from '../models/Result';
import Auth from './Auth';

class ModuleManager implements IManager<Module> {
  @observable modules: Module[] = [];

  private sync(module: Module) {
    const index = findIndex(this.modules, { uuid: module.uuid });
    if (index !== -1) {
      this.modules.splice(index, 1, module);
    } else {
      this.modules.push(module);
    }
    return module;
  }

  /**
   * Serialize input for database consistency
   */
  private serialize(fields) {
    const values = Object.assign({}, fields);
    if (typeof fields.questionCount !== 'number') {
      values.questionCount = null;
    }
    if (typeof fields.passMark !== 'number') {
      values.passMark = null;
    }
    if (typeof fields.verifiableHours !== 'number') {
      values.verifiableHours = Number(fields.verifiableHours);
    }
    return values;
  }

  async findAll(
    options: { page?: number; limit?: number; search?: string } = {},
  ): Promise<Module[]> {
    const response = await Axios.get(
      `modules?${queryString.stringify(options)}`,
    );
    this.modules = response.data.map((module) => new Module(module));
    return this.modules;
  }

  async findByCategory(
    category: Category,
    options: { page?: number; limit?: number } = {},
  ): Promise<Module[]> {
    const response = await Axios.get(
      `categories/${category.uuid}/modules?${queryString.stringify(options)}`,
    );
    this.modules = response.data.map((module) => new Module(module));
    return this.modules;
  }

  async search(query: string): Promise<Module[]> {
    const response = await Axios.get(`modules/search?query=${query}`);
    this.modules = response.data.map((module) => new Module(module));
    return this.modules;
  }

  async find(uuid: string): Promise<Module> {
    const response = await Axios.get(`modules/${uuid}`);
    if (!response.data) {
      return;
    }
    return this.sync(new Module(response.data));
  }

  async create(fields: Partial<Module>): Promise<Module> {
    const response = await Axios.post('modules', this.serialize(fields));
    return this.sync(new Module(response.data));
  }

  async update(uuid: string, fields: Partial<Module>): Promise<Module> {
    const response = await Axios.put(`modules/${uuid}`, this.serialize(fields));
    return this.sync(new Module(response.data));
  }

  public async uploadThumbnail(
    module: Module,
    file,
    onUploadProgress?: (progressEvent: any) => void,
  ): Promise<Module> {
    const upload = await UploadManager.uploadThumbnail(
      file,
      {
        moduleUuid: module.uuid,
      },
      onUploadProgress,
    );
    const response = await Axios.put(`modules/${module.uuid}`, {
      thumbnail: upload.data.url,
    });
    return this.sync(new Module(response.data));
  }

  public async uploadCertificate(
    module: Module,
    file,
    onUploadProgress?: (progressEvent: any) => void,
  ): Promise<Module> {
    const upload = await UploadManager.uploadDocument(
      file,
      {
        moduleUuid: module.uuid ? module.uuid : undefined,
      },
      onUploadProgress,
    );
    const response = await Axios.put(`modules/${module.uuid}`, {
      certificate: upload.data.url,
    });
    return this.sync(new Module(response.data));
  }

  async destroy(uuid: string) {
    await Axios.delete(`modules/${uuid}`);
    const index = findIndex(this.modules, { uuid });
    if (index !== -1) {
      this.modules.splice(index, 1);
    }
  }

  async addCategory(module: Module, category: Category): Promise<Module> {
    await Axios.post(`modules/${module.uuid}/categories`, {
      categoryUuid: category.uuid,
    });
    if (!module.hasCategory(category)) {
      module.categories.push(category);
    }
    return this.sync(module);
  }

  async removeCategory(module: Module, category: Category): Promise<Module> {
    await Axios.delete(`modules/${module.uuid}/categories/${category.uuid}`);
    const index = findIndex(module.categories, { uuid: category.uuid });
    if (index !== -1) {
      module.categories.splice(index, 1);
    }
    return this.sync(module);
  }

  async addSlide(module: Module, fields: Partial<Slide>): Promise<Module> {
    const response = await Axios.post(`modules/${module.uuid}/slides`, fields);
    module.slides.push(new Slide(response.data));
    return this.sync(module);
  }

  async setSlides(module: Module, slides: Slide[]): Promise<Module> {
    const response = await Axios.put(`modules/${module.uuid}/slides`, {
      slides,
    });
    module.slides = response.data.map((slide) => new Slide(slide));
    return this.sync(module);
  }

  async removeSlide(module: Module, slide: Slide): Promise<Module> {
    await Axios.delete(`modules/${module.uuid}/slides/${slide.uuid}`);
    const index = findIndex(module.slides, { uuid: slide.uuid });
    if (index !== -1) {
      module.slides.splice(index, 1);
    }
    return this.sync(module);
  }

  async approve(module: Module): Promise<Module> {
    const response = await Axios.post(`modules/${module.uuid}/approve`);
    return this.sync(new Module(response.data));
  }

  async review(module: Module): Promise<Module> {
    const response = await Axios.post(`modules/${module.uuid}/review`);
    return this.sync(new Module(response.data));
  }

  async generateTest(module: Module): Promise<Question[]> {
    const response = await Axios.get(`modules/${module.uuid}/test`);
    return response.data.map((question) => new Question(question));
  }

  async submitTest(
    module: Module,
    questions: Question[],
    answers: Answer[],
  ): Promise<Result> {
    const result = questions.map((question, index) => {
      const selectedAnswer = answers[index];
      if (!selectedAnswer) {
        throw new Error('Please answer all the questions');
      }
      return {
        questionUuid: question.uuid,
        answerUuid: selectedAnswer.uuid,
        answers: question.answers.map((answer) => answer.uuid),
      };
    });
    const response = await Axios.post(`modules/${module.uuid}/test`, {
      result,
    });

    // We might have just completed a new module, so sync across the list of completed ones
    // Auth.syncCompletedModules();

    return new Result(response.data);
  }
}

export default new ModuleManager();
