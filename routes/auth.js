let express = require('express');
const { success, error, generateToken } = require('../lib/utils');
const { addOrUpdateTokenForUser, getUniqueToken } = require('../models/auth.model');
var router = express.Router();

/**
 * Route to send verification token to an email address
 */
router.post('/token/send', async function (req, res) {
  try {
    let token = generateToken()
    await addOrUpdateTokenForUser(req.body.email.toString(), token)
      .then(_ => {
        success(res, `Verification token sent successfully to ${req.body.email}`);
      })
      .catch(err => {
        throw err;
      })
  } catch (err) {
    error(res, err.message);
  }
});

/**
 * Route to verify verification token sent to an email address
 */

module.exports = router;