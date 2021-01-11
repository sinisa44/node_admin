const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRouter');
const apiRouter = require('./routes/apiRouter');
const cors = require('cors');

const app = express();
dotenv.config({ 'path': `${__dirname}/config.env` })

if(process.env.MODE === 'DEVELOPMENT') {
    app.use(morgan('dev'));
}


app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/api', apiRouter);

module.exports = app;