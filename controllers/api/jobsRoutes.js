const router = require('express').Router();
const { Jobs, JobsUsers } = require('../../models');

router.get('/', async (req, res) => {
  try {
    console.log('Did we make it to the jobs get route?');
    res.status(200).json(res);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log('were in the post route');
  try {
    const job_title = req.body.job_title;
    const saved_job_id = req.body.job_id;
    const company_name = req.body.company_name;
    const user_id = 3;

    const checkJob = await Jobs.findOne({
      where: {
        saved_job_id: saved_job_id,
      },
    });
    console.log(`Checked for saved job ${checkJob}`);

    if (checkJob === null) {
      const newJob = await Jobs.create({
        job_title,
        company_name,
        saved_job_id,
      });

      const newJobLink = await JobsUsers.create({
        user_id,
        saved_job_id,
      });
      console.log(json(newJobLink));
      res.status(200).json(newJob);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
