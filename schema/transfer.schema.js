let mongoose = require('mongoose');
const { Schema } = mongoose;

// String is shorthand for {type: String}
module.exports = transferSchema = new Schema({
  /**
   * The transfer ID / upload ID
   */
  id: { type: Number, index: true, unique: true },
  /**
   * The sender's email
   */
  sender: { type: String, required: true },
  /**
   * A list of recipients
   */
  recipients: [
    {
      /**
       * The recipient email
       */
      email: { type: String, required: true },
      /**
       * A bool to indicate if the accessed the download link
       */
      accessed: { type: Boolean, default: false }
    }
  ],
  /**
   * The message form the sender to the recipients
   */
  message: String,
  /**
   * The download link
   */
  link: {type: String, required: true},
  /**
   * A bool that indicates if this upload is protected by a password
   */
  secure: { type: Boolean, default: false },
  /**
   * The user's encrypted password
   */
  securePassword: String,
  /**
   * A list of uploaded file objects
   */
  files: [
    {
      index: Number,
      filesize: Number,
      filetype: String,
      filename: String,
      filepath: String,
    }
  ],
  /**
   * Timestamp of upload
   */
  timestamp: { type: Date, default: Date.now() },
});
