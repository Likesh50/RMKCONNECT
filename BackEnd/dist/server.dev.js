"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var db = require('./config/db');

var app = express();
var PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

var authRoutes = require('./routes/auth');

var userRoutes = require('./routes/users');

var clubActivitiesRoutes = require('./routes/clubActivities');

var guestLecturesRoutes = require('./routes/guestlecture');

var hallBookingsRoutes = require('./routes/hallbooking');

var notificationsRoutes = require('./routes/notifications');

var emailRoutes = require('./routes/emailsender');

var tablesRoutes = require('./routes/tables');

var graphRoutes = require('./routes/graph');

var formRoutes = require('./routes/forms');

app.use('/auth', authRoutes);
app.use('/mail', emailRoutes);
app.use('/tables', tablesRoutes);
app.use('/graphs', graphRoutes);
app.use('/forms', formRoutes);
app.listen(PORT, function () {
  console.log("Server running on port ".concat(PORT));
});