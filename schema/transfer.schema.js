import mongoose from 'mongoose';
const { Schema } = mongoose;

// String is shorthand for {type: String}
const transferSchema = new Schema({
  /**
   * The transfer ID / upload ID
   */
  id: { type: Number, index: true, unique: true },
  /**
   * The sender's email
   */
  sender: { type: String, required: true, unique: true },
  /**
   * A list of recipients
   */
  recipients: [
    {
      /**
       * The recipient email
       */
      email: { type: String, required: true, unique: true },
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
  downloadLink: String,
  /**
   * A bool that indicates if this upload is protected by a password
   */
  locked: { type: Boolean, default: false },
  /**
   * The user's encrypted password
   */
  lockPassword: String,
  /**
   * A list of uploaded file objects
   */
  files: [
    {
      filesize: Schema.Types.Decimal128,
      filetype: String,
      filename: String,
      filepath: String,
    }
  ],
  /**
   * Timestamp of upload
   */
  timestamp: { type: Date, default: Date.now },
});
