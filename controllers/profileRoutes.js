const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Jobs, JobsUsers } = require('../models');

// Get jobs details for all jobs saved by user
router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const jobsData = await JobsUsers.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Jobs,
        },
      ],
    });

    const jobs = jobsData.map((job) => job.job.get({ plain: true }));

    res.render('profile', { jobs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log('error was had');
    res.status(400).json(err);
  }
});

//  Get jobs_ids for all jobs saved by user
router.get('/homeprofile', async (req, res) => {
  try {
    const userId = req.session.user_id;
    const jobsData = await JobsUsers.findAll({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Jobs,
        },
      ],
    });

    const jobs = jobsData.map((job) => job.job.get({ plain: true }));
    const job_ids = jobs.map((job) => job.saved_job_id);
    res.status(200).json(job_ids);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
