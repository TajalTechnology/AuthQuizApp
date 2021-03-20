'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {

    static associate(models) {

      Answer.belongsTo(models.User, {
        foreignKey: 'user_id'
      });

      Answer.belongsTo(models.Question_bank, {
        foreignKey: 'question_id'
      });
    }
  };
  Answer.init({
    answer: DataTypes.STRING,
    quiz_answer:DataTypes.ARRAY(DataTypes.STRING),
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};