import { Sequelize } from 'sequelize-typescript';
import { Service } from '@tsed/di';
import { pick, mergeWith, find, shuffle } from 'lodash';
import Axios from 'axios';
import SearchIndex from './SearchIndex';
import Module from '../models/Module';
import Category from '../models/Category';
import Slide from '../models/Slide';

require('dotenv').config();

// Init the module search index
const moduleIndex = new SearchIndex<Module>({
  keys: [
    {
      name: 'title',
      weight: 0.75,
    },
    {
      name: 'categories.name',
      weight: 0.25,
    },
  ],
  threshold: 0.5,
});
if (process.env.NODE_ENV !== 'test') {
  (async () => {
    console.log('Building module index...');
    const modules = await Module.findAll({
      where: {
        status: 'APPROVED',
      },
      include: [Category],
    });
    moduleIndex.set(modules);
    console.log('Module index built');
  })();
}

@Service()
export default class ModuleManager implements IManager<Module> {
  /**
   * Find every single module, ordered by status
   */
  public async findAll(
    page?: number,
    limit?: number,
    search?: string,
  ): Promise<Module[]> {
    const options: any = {
      include: [Category],
      order: [
        [
          Module.sequelize.where(Module.sequelize.col('status'), 'APPROVED'),
          'ASC',
        ],
        ['approvedAt', 'DESC'],
      ],
    };

    if (search) {
      options.where = {
        title: { $like: `%${search}%` },
      };
    }

    if (page && limit) {
      options.limit = limit + 1;
      options.offset = limit * (page - 1);
    }

    return Module.findAll(options);
  }

  /**
   * Find all approved modules with a test
   */
  public async findWithTest(): Promise<Module[]> {
    return Module.findAll({
      where: {
        status: 'APPROVED',
        $and: [
          {
            passMark: {
              $ne: null,
            },
          },
          {
            passMark: {
              $ne: 0,
            },
          },
          {
            questionCount: {
              $ne: null,
            },
          },
          {
            questionCount: {
              $ne: 0,
            },
          },
        ],
      },
      order: [['title', 'ASC']],
    });
  }

  /**
   * Find all approved modules that fuzzy match a query
   */
  public async search(query: string): Promise<Module[]> {
    return moduleIndex.search(query);
  }

  public async find(uuid: string): Promise<Module> {
    return Module.findById(uuid, {
      include: [Category, Slide],
    });
  }

  public async create(fields: Partial<Module>): Promise<Module> {
    const module = await Module.create(pick(fields, ['title']));
    return this.find(module.uuid.toString());
  }

  public async update(uuid, fields: Partial<Module>): Promise<Module> {
    const module = await this.find(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }
    await module.update(
      mergeWith(
        {},
        pick(module, [
          'title',
          'thumbnail',
          'certificate',
          'passMark',
          'questionCount',
          'isVerifiable',
          'verifiableHours',
          'version',
        ]),
        fields,
      ),
    );
    return this.find(uuid);
  }

  public async destroy(uuid) {
    const module = await this.find(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }

    await module.destroy();
  }

  /**
   * Add a category to a module
   */
  public async addCategory(uuid, categoryUuid): Promise<Category> {
    const module = await this.find(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }
    const category = await Category.findById(categoryUuid);
    if (!find(module.categories, { uuid: categoryUuid })) {
      await module.addCategory(category);
    }
    return category;
  }

  /**
   * Remove a category from a module
   */
  public async removeCategory(uuid, categoryUuid) {
    const module = await this.find(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }
    const category = await Category.findById(categoryUuid);
    await module.removeCategory(category);
  }

  /**
   * Add a new slide to a module
   */
  public async addSlide(uuid, fields: Partial<Slide>): Promise<Slide> {
    const module = await this.find(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }
    const slide = await Slide.create(fields);
    await module.addSlide(slide);
    return slide;
  }

  /**
   * Update the list of slides for a module
   */
  public async setSlides(uuid, slides: Slide[]): Promise<Slide[]> {
    const module = await Module.findById(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }
    await Promise.all([
      Slide.bulkCreate(slides, {
        updateOnDuplicate: ['title', 'content', 'updatedAt'],
      }),
      module.setSlides([]),
    ]);
    await module.setSlides(slides.map((slide) => slide.uuid));
    return (await this.find(uuid)).slides;
  }

  /**
   * Remove a slide from a module
   */
  public async removeSlide(uuid, slideUuid) {
    const module = await this.find(uuid);
    if (module.status === 'APPROVED') {
      throw new Sequelize.ValidationError(
        'An approved module cannot be edited',
      );
    }
    const slide = await Slide.findById(slideUuid);
    await module.removeSlide(slide);
    await slide.destroy();
  }

  /**
   * Determine if a module is valid for approval
   */
  public isValidForApproval(module: IModule): string[] {
    const errors = [];

    // Generic validation
    if (!module.title) {
      errors.push('Module title cannot be blank');
    }
    if (!module.thumbnail) {
      errors.push('Module thumbnail cannot be blank');
    }

    // Slide validation
    if (!module.slides || module.slides.length === 0) {
      errors.push('Module must contain at least 1 slide');
    } else {
      for (let i = 0; i < module.slides.length; i++) {
        const slide = module.slides[i];
        if (!slide.title || !slide.content) {
          errors.push('Slide content cannot be blank');
          break;
        }
      }
    }

    // Test-specific validation
    if (module.passMark && module.questionCount) {
      if (module.passMark > module.questionCount) {
        errors.push('Module pass mark must be achievable');
      }
      if (!module.questions || module.questionCount > module.questions.length) {
        errors.push('Module must have enough questions for the test');
      } else {
        for (let i = 0; i < module.questions.length; i++) {
          const question = module.questions[i];
          let correctCount = 0;
          let incorrectCount = 0;
          question.answers.forEach((answer) => {
            if (answer.isCorrect) {
              correctCount++;
            } else {
              incorrectCount++;
            }
          });
          if (correctCount < 1 || incorrectCount < 2) {
            errors.push(
              'Questions must have at least 1 correct answer and 2 incorrect answers',
            );
            break;
          }
        }
      }

      // Verifiable validation
      if (module.isVerifiable && !module.verifiableHours) {
        errors.push('Verifiable modules must have verifiable time set');
      }
      if (module.isVerifiable && !module.certificate) {
        errors.push('Module must have a CPD certificate attached');
      }
    }

    return errors;
  }

  /**
   * Approve a module
   */
  public async approve(
    uuid: string,
    approver: IUser,
  ): Promise<Module | string[]> {
    const module = await this.find(uuid);
    const errors = this.isValidForApproval(module);
    if (errors.length > 0) {
      return errors;
    }
    await module.update({
      status: 'APPROVED',
      approvedAt: new Date(),
      approvedBy: approver.uuid,
    });

    // Add this to public searches
    moduleIndex.add(module);

    return this.find(uuid);
  }

  /**
   * Review a module
   */
  public async review(uuid: string): Promise<Module | string[]> {
    const module = await this.find(uuid);
    if (module.status !== 'APPROVED') {
      throw new Sequelize.ValidationError('Module is already in review');
    }

    await module.update({
      status: 'IN REVIEW',
    });

    // Remove this from public searches
    moduleIndex.remove({ uuid });

    return this.find(uuid);
  }
}
