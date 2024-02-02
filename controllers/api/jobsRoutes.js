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
  console.log('made it into post route');
  try {
    // const job_title = req.body.job_title;
    const saved_job_id = req.body.job_id;
    // const company_name = req.body.company_name;
    const user_id = req.session.user_id;
    // console.log(`res ${req.body}`);
    console.log([saved_job_id, user_id]);
    let checkJob = await Jobs.findOne({
      where: {
        saved_job_id: saved_job_id,
      },
    });

    console.log(`first check ${checkJob}`);
    if (!checkJob) {
      checkJob = await Jobs.create({
        // job_title,
        // company_name,
        saved_job_id,
      });
      console.log('did we create a job??');
    }

    let checkLink = await JobsUsers.findOne({
      where: {
        user_id: user_id,
        job_id: checkJob.id,
      },
    });

    console.log(`second check ${checkLink}`);
    if (!checkLink) {
      newJobLink = await JobsUsers.create({
        user_id,
        job_id: checkJob.id,
      });
    }
    console.log('Job linked');
    res.status(200).json(newJobLink);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
