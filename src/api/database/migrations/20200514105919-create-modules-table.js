const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('modules', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid(),
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      thumbnail: Sequelize.BLOB,
      passMark: Sequelize.INTEGER.UNSIGNED,
      questionCount: Sequelize.INTEGER.UNSIGNED,
      isVerifiable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      verifiableHours: {
        type: Sequelize.FLOAT(4, 2).UNSIGNED,
        defaultValue: 0,
        allowNull: false,
      },
      isApproved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      approvedAt: Sequelize.DATE,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });

    await queryInterface.createTable('module_categories', {
      moduleUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'modules',
          key: 'uuid',
        },
      },
      categoryUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'categories',
          key: 'uuid',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('module_categories');
    await queryInterface.dropTable('modules');
  },
};
