const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

// Connect morgan middleware for logging
app.use(morgan('dev'));

// Parse cookies and JSON bodies
app.use(cookieParser());
app.use(express.json());

// Security middleware
if (!isProduction) {
  // Enable CORS only in development
  app.use(cors());
}

// Helmet helps set security headers
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
  })
);

// Set the _csrf token and create req.csrfToken method
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
    }
  })
);

// Connect routes
const routes = require('./routes');
app.use(routes);

module.exports = app;