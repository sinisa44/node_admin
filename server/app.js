const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const apiRouter = require('./routes/apiRouter');
const cors = require('cors');
const auth = require('./middleware/auth');
const app = express();

dotenv.config({ 'path': `${__dirname}/config.env` })

if(process.env.MODE === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}


console.log(auth);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth', authRouter);
app.use('/api', auth,  apiRouter);

module.exports = app;