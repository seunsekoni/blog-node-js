const User = require('../models/users');

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
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