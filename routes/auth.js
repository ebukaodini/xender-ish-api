let express = require('express');
const { success, error, generateToken } = require('../lib/utils');
const { addOrUpdateTokenForUser, verifyToken } = require('../models/auth.model');
var router = express.Router();

/**
 * Route to send verification token to an email address
 */
router.post('/token/send', async function (req, res) {
  try {
    let token = generateToken()
    await addOrUpdateTokenForUser(req.body.email.toString(), token)
      .then(_ => {
        // TODO
        // send the token to the users' email address with Sendgrid
        success(res, `Verification token sent successfully to ${req.body.email}`);
      })
      .catch(err => {
        throw err;
      })
  } catch (err) {
    console.error(err)
    error(res, err.message);
  }
});

/**
 * Route to verify verification token sent to an email address
 */
router.post('/token/verify', async function (req, res) {
  try {
    let resp = await verifyToken(req.body.email, req.body.token)
    console.log(resp);
    if (resp === true) success(res, 'Token is verified');
    else error(res, 'Invalid token');
  } catch (err) {
    console.error(err)
    error(res, err.message);
  }
});

module.exports = router;