const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('practices', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid(),
      },
      externalRef: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      groupUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'groups',
          key: 'uuid',
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('practices');
  },
};
