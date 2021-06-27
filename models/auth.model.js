let authSchema = require('../schema/auth.schema');
const { createModel } = require('./model');

/**
 * method to add token for a new user or update the token of an existing user
 * @param {String} email email of the user
 * @param {String} token token to be added for the user
 */
let addOrUpdateTokenForUser = async (email, token) => {
  try {
    return await createModel('Auth', authSchema)
      .then(async Auth => {
        if (await Auth.exists({ email: email }) == true) {
          await Auth.updateOne({ email: email }, {
            token: token,
            timestamp: Date.now()
          }).catch(err => console.log(err.message));
        } else {
          await new Auth({
            email: email,
            token: token
          }).save();
        }
      })
      .catch(err => {
        throw err;
      })
  } catch (error) {
    throw error;
  }
}

/**
 * a method to verify the user's token
 * @param {string} email email of the user
 * @param {string} token token the user submitted to be verified
 */
let verifyToken = async (email, token) => {
  try {
    return await createModel('Auth', authSchema)
      .then(async Auth => {
        return await Auth.exists({ email: email, token: token })
      })
      .catch(err => {
        throw err;
      })
  } catch (error) {
    throw error;
  }
}

module.exports = { addOrUpdateTokenForUser, verifyToken }