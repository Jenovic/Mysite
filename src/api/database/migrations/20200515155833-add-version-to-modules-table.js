module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('modules', 'version', {
      type: Sequelize.STRING,
      after: 'approvedBy',
      defaultValue: '1.0',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('modules', 'version');
  },
};
