const Jobs = require('./Jobs');
const User = require('./User');
const JobsUsers = require('./JobsUser');
const Notes = require('./Notes');

User.hasMany(Notes, {
  foreignKey: 'user_id',
});

Notes.belongsTo(User, {
  foreignKey: 'user_id',
});

Jobs.belongsToMany(User, {
  through: {
    model: JobsUsers,
    unique: false,
  },
  as: 'job_belongs_to_user',
});

User.belongsToMany(Jobs, {
  through: {
    model: JobsUsers,
    unique: false,
  },
  as: 'user_saved_job',
});

module.exports = { Jobs, User, JobsUsers, Notes };
