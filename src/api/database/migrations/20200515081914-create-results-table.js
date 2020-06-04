const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('results', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid(),
      },
      didPass: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      actualMark: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      passMark: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      isVerifiable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      verifiableHours: {
        type: Sequelize.FLOAT(4, 2).UNSIGNED,
        allowNull: false,
      },
      moduleUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'modules',
          key: 'uuid',
        },
      },
      userUuid: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'uuid',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('results');
  },
};
