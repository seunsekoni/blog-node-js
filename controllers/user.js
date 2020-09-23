const User = require('../models/users');
const _ = require('lodash');

exports.userById = (req, res, next, id) => {
    User.findById(id).select('_id name email createdAt').exec((err, user) => {
        if(err || !user) {
            res.status(400).json({
                error: "User not found"
            })
        }

        // append the profile property to with user object
        req.profile = user
        next()
    })
}

exports.hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id

    if(!authorized) {
        return res.status(403).json({
            error: "You are not authorized to perform this operation"
        })
    }
}

exports.allUsers = (req, res) => {
    User.find((err, users) => {
                if(err) {
                    return res.status(400).json({
                        error:  err
                    })
                }

                res.json({
                    users
                })
            })
        .select('name email createdAt updatedAt')
}

exports.getUser = (req, res) => {
    return res.json({
        user: req.profile
    })
}

exports.updateUser = (req, res) => {
    let user = req.profile
    // mutate the user object with the incoming request body
    user = _.extend(user, req.body)
    user.updatedAt = Date.now()
    user.save((err) => {
        if(err) {
            return res.status(400).json({
                error: "Profile could not be updated"
            })
        }
        
        res.json({
            message:"User updated successfully",
            data: user
        })
    })
}

exports.deleteUser = (req, res) => {
    let user = req.profile;
    user.remove((err, user) => {
        if(err) {
            return res.status(400).json({
                error: "Unable to delete user"
            })
        }

        res.json({
            deletedUser: user
        })
    })
}