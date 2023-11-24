'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('Devices', 'activityId', {
      type: Sequelize.DataTypes.INTEGER,
    });
  
    queryInterface.addColumn('Activitys', 'userId', {
      type: Sequelize.DataTypes.INTEGER,
    });
    
    queryInterface.addConstraint('Devices', {
      fields: ['activityId'],
      type: 'foreign key',
      name: 'activityId',
      references: { //Required field
        table: 'Activitys',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    queryInterface.addConstraint('Activitys', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'userId',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

      
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeConstraint('Devices', 'activityId');
    queryInterface.removeConstraint('Activitys', 'userId');
    queryInterface.removeColumn('Devices', 'activityId');
    queryInterface.removeColumn('Activitys', 'userId');

  }
};
