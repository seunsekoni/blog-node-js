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
const userRoutes = require('./routes/user')
const JWT = require('jsonwebtoken')
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
app.use('/', userRoutes);

// app.use(function(req, res, next) {
//     console.log(req.cookies['token'])
//     JWT.verify(req.cookies['token'], process.env.JWT_SECRET, function(err, decodedToken) {
//         if(err) { /* handle token err */ 
//             return res.status(401).json({
//                 message: "Could not find user id",
//                 err: err
//             })
//         }
        
//         req.userId = decodedToken.id;   // Add to req object
//         console.log(req);
//         next();
//     });
// });


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