const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class JobsUsers extends Model {}

JobsUsers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Saved',
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false,
      },
    },
    job_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'jobs',
        key: 'id',
        unique: false,
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'jobsusers',
  }
);

module.exports = JobsUsers;
