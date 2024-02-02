const router = require('express').Router();
const { Jobs, JobsUsers, User } = require('../../models');
const withAuth = require('../../utils/withAuth');

// Get all jobs
router.get('/', async (req, res) => {
  try {
    console.log('Did we make it to the jobs get route?');
    res.status(200).json(res);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Add a new job or user link to the db
router.post('/', withAuth, async (req, res) => {
  try {
    const saved_job_id = req.body.job_id;
    const user_id = req.session.user_id;
    let checkJob = await Jobs.findOne({
      where: {
        saved_job_id: saved_job_id,
      },
    });

    if (!checkJob) {
      checkJob = await Jobs.create({
        saved_job_id,
      });
    }

    let checkLink = await JobsUsers.findOne({
      where: {
        user_id: user_id,
        job_id: checkJob.id,
      },
    });

    if (!checkLink) {
      newJobLink = await JobsUsers.create({
        user_id,
        job_id: checkJob.id,
      });
    }
    res.status(200).json(newJobLink);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deleting a user Link and possibly new job from the db
router.delete('/', withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const deleted_job_id = req.body.job_id;
    const user_id = req.session.user_id;
    console.log(deleted_job_id);

    let jobRecord = await Jobs.findOne({
      attributes: ['id'],
      where: {
        saved_job_id: deleted_job_id,
      },
    });

    console.log(jobRecord.id);
    console.log(user_id);
    let deletedJobUser = await JobsUsers.destroy({
      where: {
        job_id: jobRecord.id,
        user_id: user_id,
      },
    });

    res.status(200).json(deletedJobUser);
  } catch (err) {
    console.log('There was an error in the delete route');
    res.status(400).json(err);
  }
});

module.exports = router;
