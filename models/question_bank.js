'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_bank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Question_bank.hasOne(models.Quiz, {
        foreignKey: 'question_id'
      });

      Question_bank.hasOne(models.Answer, {
        foreignKey: 'question_id'
      });

      Question_bank.belongsTo(models.User, {
        // onDelete: 'CASCADE',
        foreignKey: 'user_id'
    });

    }
  };
  Question_bank.init({
    question: DataTypes.STRING,
    question_types: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Question_bank',
  });
  return Question_bank;
};