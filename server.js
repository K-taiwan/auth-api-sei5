const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');

// ------------------------------------- MiddleWare ------------------------------------- //
// CORS - Cross Origin Resource Sharing
const corsOptions = {
  origin: [`http://localhost:3000`],
  credentials: true, // allows the session cookies to be sent back and forth from server to client
  optionsSuccessStatus: 200 //some legacy browsers choke on status 200
}

app.use(cors(corsOptions));

//Body-parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Express Session - Authentication
app.use(session({
  //Store session in the DB
  store: new MongoStore({ url:process.env.MONGO_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, //only create session if a property has been added to session
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,  // Expire at 2 weeks
  }
}));


// ------------------------------------- Routes ------------------------------------- //

app.get('/', (req, res) => {
  res.send('<h1>AUTH API</h1>');
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));
