const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const origamiRoutes = require('./routes/origami');
const commentsRoutes = require('./routes/comments');
const imagesUploadRoutes = require('./routes/imagesUpload');
const assemblyRoutes = require('./routes/assembly');
const surveyRoutes = require('./routes/survey');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected'))
    .catch((error) => console.log(error));

app.use(passport.initialize());
require('./middelware/passport')(passport);

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/origami', origamiRoutes);
app.use('/api/comment', commentsRoutes);
app.use('/api/images', imagesUploadRoutes);
app.use('/api/assembly', assemblyRoutes);
app.use('/api/survey', surveyRoutes);

module.exports = app;
