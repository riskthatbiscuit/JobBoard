const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');

// Set port & initiate express
const PORT = process.env.PORT || 3001;
const app = express();

// Set up session
const sess = {
  secret: process.env.sessSecret,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Set up handlebars
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Set middlewhere
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set routes
app.use(routes);

// Open port once database connected
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => `Listening on port ${PORT}`);
});
