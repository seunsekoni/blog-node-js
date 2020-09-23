const jwt = require('jsonwebtoken');
const User = require('../models/users');
const expressJwt = require('express-jwt')
require('dotenv').config();

// this function handles signup
exports.signUp = async(req, res) => {
    // check if user exists in the DB
        const userExists = await User.findOne({email: req.body.email},)
        if(userExists) {
            return res.json({
                    "error": "Email has been taken",
                })

        }

    // create the new user details
    const user = await new User(req.body);
    try {
        const saveUser = await user.save();
        if(saveUser) {
            const strippedUserDetails = user.toObject()
            delete strippedUserDetails.password;
            delete strippedUserDetails.salt;
            delete strippedUserDetails.hashed_password;

             // generate a token with the user id
            const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: '24h'})

            // persist the name 'token' in the cookie and give expiry date
            res.cookie('token', {expire: new Date() + 999999  })
            // return the response and 
            const {_id, name, email} = user

            return res.json({
                message: "User created successfully",
                data: strippedUserDetails,
                user: {_id, name, email},
                token: token,
            })

        }
        
    } catch (error) {
        console.log(error)
    }

}

exports.signIn = (req, res) => {
    // check if the user exists in the db
    const {email, password} = req.body
    User.findOne({email}, (err, user) => {
        // if user is not found
        if(err || !user) {
            return res.status(401).json({
                error: "Username/Password not found"
            })
        }

        // if user is found, check if password is correct and then authenticate
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Username/Password not found"
            })
        }

        // generate a token with the user id
        const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN, {expiresIn: '24h'})

        // persist the name 'token' in the cookie and give expiry date
        res.cookie('token', {expire: new Date() + 999999  })
        // return the response and 
        const {_id, name, email} = user
        return res.json({
            message: "successfully signed in",
            data: {_id, name, email},
            token: token,
        })
    })
}

exports.signOut = (req, res) => {
    res.clearCookie('token')
    return res.json({
        message: "Logged out successfully"
    })
}


exports.authMiddleware = expressJwt({
    // if token is valid epress-jwt appends the verified user id
    // in auth key to the requset (req) objects
    secret: process.env.JWT_TOKEN, 
    algorithms: ['HS256'],

    // eg use auth.id to get the id of the current authenticated user
    requestProperty: "auth",
})

// exports.me = function(req,res){
//     if (req.headers && req.headers.authorization) {
//         var authorization = headers.authorization,
//             decoded;
//         try {
//             decoded = jwt.verify(authorization, process.env.JWT_TOKEN);
//         } catch (e) {
//             return res.status(401).send('unauthorized');
//         }
//         var userId = decoded.id;
//         // Fetch the user by id 
//         User.findOne({_id: userId}).then(function(user){
//             // Do something with the user
//             return res.send(200);
//         });
//     }
//     return res.status(500);
// }

