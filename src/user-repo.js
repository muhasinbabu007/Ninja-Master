const user = require('../models').User
const bcrypt = require('bcryptjs')

exports.createUser = async function (uObj) {
  // hash password before saving the user
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(uObj.password, salt)
  uObj.password = hash
  return user.create(uObj)
}

exports.findUser = async function (email) {
  // find the user if exists
  return user.findOne({
    where: {
      email: email
    },
    raw: true
  })
}

exports.findByPk = async (id) => {
  return user.findByPk(id, { raw: true })
}
