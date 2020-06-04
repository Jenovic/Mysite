module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('uploads', 'type', {
      type: Sequelize.ENUM('IMAGE', 'DOCUMENT'),
      after: 'url',
      defaultValue: 'IMAGE',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('uploads', 'type');
  },
};
