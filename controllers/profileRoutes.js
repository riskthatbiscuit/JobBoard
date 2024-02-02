const router = require('express').Router();
const withAuth = require('../utils/withAuth');
const { Jobs, JobsUsers } = require('../models');

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

    const jobs = jobsData.map((job) => job.get({ plain: true }));

    res.render('profile', { jobs, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;