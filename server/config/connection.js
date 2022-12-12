const mongoose = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://userone:passdb12345@webdata.pihvn5i.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;