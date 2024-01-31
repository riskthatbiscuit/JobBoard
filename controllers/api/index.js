const router = require('express').Router();
const jobsRoutes = require('./jobsRoutes');
const userRoutes = require('./userRoutes');

router.use('/jobs', jobsRoutes);
router.use('./user', userRoutes);

module.exports = router;
