const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

const apiKey = process.env.FINDWORK_API_KEY;

router.get('/', async (req, res) => {
  try {
    console.log('Did we make it to the home get route?');
    res.render('homepage', { loggedIn: req.session.loggedIn });
    // res.status(200).json(res);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const response = await axios.get('https://findwork.dev/api/jobs/', {
      headers: {
        Authorization: `Token ${apiKey}`,
      },
    });
    console.log(response.data.results);
    const data = await response.data;

    res.render('alljobs', {
      data,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
