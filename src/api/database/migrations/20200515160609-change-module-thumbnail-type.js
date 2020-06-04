module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('modules', 'thumbnail');
    await queryInterface.addColumn('modules', 'thumbnail', {
      type: Sequelize.STRING,
      after: 'status',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('modules', 'thumbnail');
    await queryInterface.addColumn('modules', 'thumbnail', {
      type: Sequelize.BLOB,
      after: 'status',
    });
  },
};
