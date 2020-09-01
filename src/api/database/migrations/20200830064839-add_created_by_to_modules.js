module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('modules', 'createdBy', {
      after: 'version',
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('modules', 'createdBy');
  },
};
