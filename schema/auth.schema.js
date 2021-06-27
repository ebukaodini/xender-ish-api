let mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = authSchema = new Schema({
  /**
   * The id of the authenticated user
   */
  id: { type: Number, index: true, unique: true },
  /**
   * The email of the user making the transfer
   * new records would not be created for returning users
   * instead, the token is updated for them
   */
  email: { type: String, unique: true },
  /**
   * A 6 digit token to be sent to the sender's email address
   */
  token: { type: String, match: /[0-9]{6}/ },
  /**
   * A timestamp as to know when the token was created
   * tokens would expire after 5 minutes
   */
  timestamp: { type: Date, default: Date.now() }
});
