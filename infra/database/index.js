const mongoose = require('mongoose');

const connectDB = async () => {
  console.log('Connecting to database');
  console.log(process.env.DATABASE);
  try {
    mongoose.connect(process.env.DATABASE,
        {
          // auth: {
          //   user: process.env.DB_USER,
          //   password: process.env.DB_PASSWORD,
          // },
          useUnifiedTopology: true,
        })
        .then(console.log('Connected to database'))
        .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = {connectDB};
