// let mongoose = require('mongoose');
let connectDb = require('./connect');
let authSchema = require('../schema/auth.schema');
const { generateToken } = require('../lib/utils');

async function init(callback) {
  return await connectDb().then(async mongoose => {
    try {
      return mongoose.model('Auth', authSchema);
    }
    catch (err) {
      console.log('Error connecting to mongo.', err);
    }
    finally {
      // mongoose.connection.close();
    }
  });
}

let addOrUpdateTokenForUser = async (email, token) => {
  try {
    await init()
      .then(async Auth => {
        if (await Auth.exists({ email: email }) == true) {
          let res = await Auth.updateOne({ email: email }, { token: token })
          return res;
        } else {
          let res = await new Auth({
            email: email,
            token: token
          }).save();
          return res;
        }
      })
      .catch(err => {
        throw err;
      })
  } catch (error) {
    throw error;
  }
}

module.exports = { addOrUpdateTokenForUser }