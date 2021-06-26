const cron = require("node-cron");

/**
 * Descriptors with their ranges:
 * 
 * Seconds (optional): 0 – 59
 * Minute: 0 – 59
 * Hour: 0 – 23
 * Day of the Month: 1 – 31
 * Month: 1 – 12
 * Day of the week: 0 – 7 (0 and 7 both represent Sunday)
 *
 * These cronjobs are to run daily at 6AM UTC
 *  * * * *
 */

/**
 * Sample cron job which runs on every 10 second
 */
// cron.schedule("*/10 * * * * *", function () {
//   console.log(`Time is ${new Date().toString()}`);
// });

const cronExpression = "0 0 6 * * *"; // 6AM daily

/**
 * Cron job to inform recipients of files for them
 * - if they have not accessed the file
 * - AND the deadline is in 2days OR 1day
 */
cron.schedule(cronExpression, function () {

});

/**
 * Cron job to remove expired uploads
 */
cron.schedule(cronExpression, function () {

});