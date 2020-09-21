const { check, validationResult } = require('express-validator');

// validate Post creation...
const createPostValidation = () => {
  return [
    // title
    check('title', "Title must not be blank").notEmpty(),
    check("title", "Title must be between 4 to 150 characters").isLength({
            min: 4,
            max: 150
        }),
    
    // title
    check("body", "Body must not be blank").notEmpty(),
    check("body", "Body must be between 4 to 2000 characters").isLength({
        min: 4,
        max: 2000
    }),
  ]
}

const userSignUpValidation = () => {
  return [
    check("name", 'Name must not be blank').notEmpty(),
    check('name', 'Name should not be lower than 4 and greater than 20').isLength({
      min: 4,
      max: 20
    }),

    // Email validations
    check('email', 'Email is required').notEmpty().isEmail()
          .matches(/.+\@.+\..+/)
          .withMessage("Email must contain the @ symbol"),
    
    // Password validation
    check('password', 'Password is required').notEmpty(),
    check('password', 'Name should not be lower than 6').isLength({
      min: 6,
      max: 700
    })
    // .matches(/\d/) enforce a digit to be entered from the frontend
    .withMessage("Password must contain a number"),
  ]
}

// return error message

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
    createPostValidation,
    userSignUpValidation,
    validate,
}


