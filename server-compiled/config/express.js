/**
 * Express configuration
 */

'use strict';

var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var path = require('path');
var config = require('./environment');
var passport = require('passport');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var cors = require('cors');

module.exports = function (app) {
  app.use(cors());
  var env = app.get('env');

  //app.set('views', config.root + '/server/views');
  //app.engine('html', require('ejs').renderFile);
  //app.set('view engine', 'html');
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  // // Persist sessions with mongoStore
  // // We need to enable sessions for passport twitter because its an oauth 1.0 strategy
  // app.use(session({
  //   secret: config.secrets.session,
  //   resave: true,
  //   saveUninitialized: true,
  //   store: new mongoStore({
  //     mongooseConnection: mongoose.connection,
  //     db: 'test'
  //   })
  // }));

  if ('production' === env) {
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    //app.set('appPath', path.join(config.root, 'client'));
    app.use(errorHandler()); // Error handler - has to be last
  }

  if ('development' === env || 'test' === env) {
    app.use(require('connect-livereload')());
    app.use(express.static(path.join(config.root, '.tmp')));
    app.use(express.static(path.join(config.root, 'client')));
    //app.set('appPath', path.join(config.root, 'client'));
    app.use(errorHandler()); // Error handler - has to be last
  }
};
//# sourceMappingURL=express.js.map