const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('module_groups', {
      moduleUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'modules',
          key: 'uuid',
        },
      },
      groupUuid: {
        type: Sequelize.UUID,
        references: {
          model: 'groups',
          key: 'uuid',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('module_groups');
  },
};
