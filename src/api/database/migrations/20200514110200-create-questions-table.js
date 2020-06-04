const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('questions', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid(),
      },
      text: {
        type: Sequelize.STRING,
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('questions');
  },
};
