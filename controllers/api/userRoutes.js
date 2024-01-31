const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    console.log('Did we make it to the users get route?');
    res.status(200).json(res);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
