let transferSchema = require('../schema/transfer.schema');
const { createModel } = require('./model');

/**
 * method to add transfer details to the database
 * @param {string} sender the email of the user sending the files
 * @param {[object]} recipients a list of recipients' email address in an object
 * @param {[object]} files a list of file objects
 * @param {string} link a generated tinyurl link to be sent to the recipients to download these files
 * @param {string?} message an optional message from the sender to the recipients
 * @param {string?} securePassword an optional hash for a password that is sent to the sender and the recipients
 * @returns {boolean} result form the operation
 */
let addTransfer = async (sender, recipients, files, link, message, securePassword) => {
  try {
    return await createModel('Transfer', transferSchema)
      .then(async Transfer => {
        return await new Transfer({
          sender: sender,
          recipients: recipients,
          message: message,
          link: link,
          secure: securePassword.length > 0,
          securePassword: securePassword,
          files: files
        }).save()
          .then(res => {
            return true;
          })
          .catch(err => {
            console.log(err.message);
            return false;
          })
      })
      .catch(e => {
        throw e;
      })
  } catch (error) {
    throw error;
  }

}

module.exports = { addTransfer }