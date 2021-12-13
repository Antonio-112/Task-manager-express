const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Connection Succesful')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
};

module.exports = { connectDB };