const mongoose = require('mongoose');

require('dotenv').config();

const { DB_URI } = process.env;

const connect = () => {
  mongoose
    .connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .finally(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log('Error connecting to MongoDB', err);
    });
};

const disconnect = () => {
  mongoose.disconnect().finally(() => {
    console.log('Disconnected from MongoDB');
  });
};

module.exports = {
  connect,
  disconnect,
};
