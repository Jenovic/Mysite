const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('result_answers', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid(),
      },
      resultUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'results',
          key: 'uuid',
        },
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      questionText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      questionUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'uuid',
        },
      },
      answerText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answerUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'answers',
          key: 'uuid',
        },
      },
      correctAnswerText: {
        type: Sequelize.STRING,
      },
      correctAnswerUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'answers',
          key: 'uuid',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('result_answers');
  },
};
