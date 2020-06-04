module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('modules', 'status', {
      type: Sequelize.ENUM('DRAFT', 'APPROVED', 'IN REVIEW'),
      after: 'title',
      defaultValue: 'DRAFT',
      allowNull: false,
    });
    await queryInterface.addColumn('modules', 'approvedBy', {
      type: Sequelize.UUID,
      after: 'approvedAt',
      // references: {
      //   model: 'admins',
      //   key: 'uuid',
      // },
    });
    await queryInterface.removeColumn('modules', 'isApproved');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('modules', 'status');
    await queryInterface.removeColumn('modules', 'approvedBy');
    await queryInterface.addColumn('modules', 'isApproved', {
      type: Sequelize.BOOLEAN,
      after: 'verifiableHours',
      defaultValue: false,
      allowNull: false,
    });
  },
};
