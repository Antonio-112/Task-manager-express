const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
    maxlength: 30,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 30,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  image: {
    type: String,
    default: 'default.jpg',
  },
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
  collections: [{
    type: ObjectId,
    ref: 'Collection',
  }],
  categories: [{
    type: ObjectId,
    ref: 'Category',
  }],
  tasks: [{
    type: ObjectId,
    ref: 'Task',
  }],
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
