const axios = require('axios');
const router = require('express').Router();
require('dotenv').config();

const apiKey = process.env.FINDWORK_API_KEY;

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/login', async (req, res) => {
  try {
    res.render('login', { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/signup', async (req, res) => {
  try {
    res.render('signup', { loggedIn: req.session.loggedIn });
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
    const data = await response.data;
    // console.log(data);
    res.render('alljobs', {
      data,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `https://findwork.dev/api/jobs/${req.params.id}`,
      {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      }
    );
    const data = await response.data;
    // console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/jobs/location/:location', async (req, res) => {
  try {
    console.log(req.params.location);
    console.log('I AM HERE!');
    const response = await axios.get(
      `https://findwork.dev/api/jobs/?location=${req.params.location}`,
      {
        headers: {
          Authorization: `Token ${apiKey}`,
        },
      }
    );
    const data = response.data.results;
    // console.log(data);
    res.render('alljobs', {
      data,
      loggedIn: req.session.loggedIn,
    });
    console.log('did it happen?');
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
