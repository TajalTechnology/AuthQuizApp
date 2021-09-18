'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_bank extends Model {

    static associate(models) {

      Question_bank.hasOne(models.Answer, {
        onDelete: 'CASCADE',
        foreignKey: 'question_id'
      });

      Question_bank.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: 'user_id'
      });

    }
  };
  Question_bank.init({
    question: DataTypes.STRING,
    question_types: {
      type: DataTypes.STRING,
      values: ['written', 'quiz'],
      defaultValue: 'quiz',
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    quizs: DataTypes.ARRAY(DataTypes.STRING),
    correct_answer: DataTypes.ARRAY(DataTypes.STRING),

  }, {
    sequelize,
    modelName: 'Question_bank',
  });
  return Question_bank;
};