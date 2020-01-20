module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable('session', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sid: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      data: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('session');
  },
};
