'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {

    static associate(models) {

      Answer.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: 'user_id'
      });

      Answer.belongsTo(models.Question_bank, {
        onDelete: 'CASCADE',
        foreignKey: 'question_id'
      });
    }
  };
  Answer.init({
    answer: DataTypes.STRING,
    quiz_answer: DataTypes.ARRAY(DataTypes.STRING),
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};