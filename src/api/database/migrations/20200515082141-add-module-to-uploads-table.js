module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('uploads', 'moduleUuid', {
      type: Sequelize.UUID,
      after: 'type',
      references: {
        model: 'modules',
        key: 'uuid',
      },
    });
    await queryInterface.addColumn('uploads', 'slideUuid', {
      type: Sequelize.UUID,
      after: 'moduleUuid',
      references: {
        model: 'slides',
        key: 'uuid',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('uploads', 'slideUuid');
    await queryInterface.removeColumn('uploads', 'moduleUuid');
  },
};
