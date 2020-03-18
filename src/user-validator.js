const { body } = require('express-validator')

exports.create = [
  body('email')
    .isEmail().normalizeEmail(),
  body('password')
    .isEmpty().isLength({ max: 24, min: 6 })
]
