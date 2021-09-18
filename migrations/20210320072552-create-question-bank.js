'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Question_banks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.STRING
      },
      question_types: {
        type: Sequelize.STRING,
        values: ['written', 'quiz'],
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      },
      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
        allowNull: false,
      },
      quizs: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },
      correct_answer: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Question_banks');
  }
};