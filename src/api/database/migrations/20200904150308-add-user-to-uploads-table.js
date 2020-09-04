module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('uploads', 'userUuid', {
      type: Sequelize.UUID,
      after: 'slideUuid',
      references: {
        model: 'users',
        key: 'uuid',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('uploads', 'userUuid');
  },
};
