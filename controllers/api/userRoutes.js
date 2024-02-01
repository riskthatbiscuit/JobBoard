const router = require('express').Router();
const { User } = require('../../models');

router.get('/', async (req, res) => {
  console.log('Did we make it to the user routes?');
  try {
    console.log('Did we make it to the users get route?');
    res.status(200).json(res);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  console.log('we made it to the post user route');
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log('in the login route');
  console.log(req.body)
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      console.log('no user data');
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }

    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      console.log('password didnt match');
      return res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
    }
    console.log('everything confirmed');
    req.session.save(() => {
      console.log('inside save');
      console.log(userData.id);
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'User logged in' });
    });
  } catch (err) {
    if (!res.headersSent) {
      res.status(400).json(err);
    }
  }
});

router.post('/logout', async (req, res) => {
  console.log('made it to logour route');
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
