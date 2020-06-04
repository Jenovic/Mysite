module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('practices', 'name', {
      type: Sequelize.STRING,
      after: 'externalRef',
      allowNull: false,
    });
    await queryInterface.addColumn('practices', 'postcode', {
      type: Sequelize.STRING,
      after: 'name',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('practices', 'name');
    await queryInterface.removeColumn('practices', 'postcode');
  },
};
