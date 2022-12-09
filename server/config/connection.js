const mongoose = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cookieCorner';


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

