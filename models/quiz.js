'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quiz extends Model {

    static associate(models) {

    }
  };
  Quiz.init({
    quiz_question:DataTypes.STRING,
    options:{
      type: DataTypes.STRING,
    },
    correct_answer: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Quiz',
  });
  return Quiz;
};