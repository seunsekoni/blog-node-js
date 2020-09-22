const express = require('express');
const app = express();
// const app = express().json();
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const postRoutes = require('./routes/posts')
const authRoutes = require('./routes/auth')
// const expressValidator = require('express-validator');

// initialize dotenv
dotenv.config();

//  db connect
mongoose.connect(process.env.MONGO_URI,
    { useNewUrlParser: true },
                { useUnifiedTopology: true },
                )
        .then(() => {
            console.log('DB Connected')
        })

mongoose.connection.on('error', err => {
    console.log(`DB: Connection was not successful ${err.message}`)
})

const myOwnMiddleware = (req, res, next) => {
    console.log('middleware has been applied');
    next();
}

// middlewares
app.use(morgan("dev"));
app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(expressValidator());
// link various routes to their routes
app.use('/', postRoutes);
app.use('/', authRoutes);

// handle error if an unauthorized error is returned
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({
          error: "Unauthorized"
      });
    }
  });


const port = process.env.PORT || 7000;
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})