const User = require('../models/users');
// const { use } = require('../routes/auth');

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
            return res.json({
                message: "User created successfully",
                data: strippedUserDetails
            })

        }
        
    } catch (error) {
        console.log(error)
    }

}