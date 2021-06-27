let mongoose = require('mongoose');
const { Schema } = mongoose.Schema;

/**
 * a method that initiates connection to the database
 * @returns an instance of Mongo DB
 */
async function connectDb() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4
  })
    .then(x => {
      console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}"`,
      );
    })
    .catch(err => {
      console.error('Error connecting to mongo', err);
    });
  return mongoose;
};

/**
 * a method that creates the model for a collection
 * @param {string} name the singular name of the collection (e.g User)
 * @param {Schema} schema the schema designed for the collection
 * @returns the Model of the collection
 */
async function createModel(name, schema) {
  return await connectDb().then(async mongoose => {
    try {
      return await mongoose.model(name, schema);
    }
    catch (err) {
      console.log('Error connecting to mongo.', err);
      throw err;
    }
    finally {
      // mongoose.connection.close();
    }
  });
}

module.exports = { createModel }