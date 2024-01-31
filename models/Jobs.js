const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Jobs extends Model {}

Jobs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    siteId: { type: DataTypes.INTEGER},
    role: { type: DataTypes.STRING },
    company_name: { type: DataTypes.STRING },
    location: { type: DataTypes.STRING },
    remove: { type: DataTypes.STRING },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'jobs',
  }
);

module.exports = Jobs;
