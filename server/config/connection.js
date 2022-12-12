const mongoose = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cookieCorner';
// 'mongodb+srv://userone:passdb12345@webdata.pihvn5i.mongodb.net/?retryWrites=true&w=majority';


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;