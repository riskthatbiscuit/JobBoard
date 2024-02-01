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

router.get('/profile', async (req, res) => {
  try {
    res.render('profile', { loggedIn: req.session.loggedIn });
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
