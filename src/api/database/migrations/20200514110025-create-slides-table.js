const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('slides', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid(),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });

    await queryInterface.createTable('module_slides', {
      moduleUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'modules',
          key: 'uuid',
        },
      },
      slideUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'slides',
          key: 'uuid',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('module_slides');
    await queryInterface.dropTable('slides');
  },
};
