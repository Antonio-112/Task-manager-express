/* eslint-disable max-len */
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
  },
  tasks: [{
    type: ObjectId,
    ref: 'Task',
  }],
  createdBy: {
    type: ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Collection', collectionSchema);

