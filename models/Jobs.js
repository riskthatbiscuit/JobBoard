const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.FINDWORK_API_KEY;

class Jobs extends Model {}

Jobs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    saved_job_id: { type: DataTypes.TEXT },
    job_title: { type: DataTypes.TEXT },
    company_name: { type: DataTypes.TEXT },
    remote: { type: DataTypes.BOOLEAN },
    company_num_employees: { type: DataTypes.STRING },
    employment_type: { type: DataTypes.TEXT },
    location: { type: DataTypes.TEXT },
    logo: { type: DataTypes.TEXT },
    url: { type: DataTypes.TEXT },
    text: { type: DataTypes.TEXT },
    date_posted: { type: DataTypes.TEXT },
    keywords: { type: DataTypes.TEXT },
    source: { type: DataTypes.TEXT },
  },
  {
    hooks: {
      beforeCreate: async (job) => {
        try {
          const job_id = job.saved_job_id;
          const apiResponse = await axios.get(
            `https://findwork.dev/api/jobs/${job_id}`,
            {
              headers: {
                Authorization: `Token ${apiKey}`,
              },
            }
          );

          const apiData = apiResponse.data;
          console.log('Job ID');
          console.log(job_id);
          job.job_title = apiData.role;
          job.remote = apiData.remote;
          job.company_num_employees = apiData.company_num_employees;
          job.employment_type = apiData.employment_type;
          job.location = apiData.location;
          job.logo = apiData.logo;
          job.url = apiData.url;
          job.text = apiData.text;
          job.date_posted = apiData.date_posted;
          job.keywords = apiData.keywords;
          job.source = apiData.source;

          console.log('we passed the object phase');
          console.log(job);
        } catch (err) {
          console.error('API call failed;', err);
        }
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'jobs',
  }
);

module.exports = Jobs;
