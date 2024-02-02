const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Jobs, JobsUsers } = require('../models');

router.get('/', withAuth, async (req, res) => {
  try {
    console.log('in get route');
    const userId = req.session.user_id;
    console.log(userId);
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
    console.log(jobs);

    res.render('profile', { jobs, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log('error was had');
    res.status(400).json(err);
  }
});

module.exports = router;
