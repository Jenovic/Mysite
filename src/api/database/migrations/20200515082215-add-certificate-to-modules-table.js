module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('modules', 'certificate', {
      type: Sequelize.STRING,
      after: 'thumbnail',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('modules', 'certificate');
  },
};
