const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const app = express();


app.use(helmet());



app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(cookieParser());


app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, 'public')));

const userRouter = require('./routes/userRoute');
const catalogRouter = require('./routes/catalogRoute');
const storeRouter = require('./routes/StoreRoute');
const productRouter = require('./routes/productRoute');

app.use('/user', userRouter);
app.use('/catalog', catalogRouter);
app.use('/store', storeRouter );
app.use('/product', productRouter );

module.exports = app;