const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [32, 'Name must be at most 20 characters long'],
    text: true,
  },
  slug: {
    type: String,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 2000,
    text: true,
  },
  category: {
    type: ObjectId,
    ref: 'Category',
  },
  collectionId: {
    type: ObjectId,
    ref: 'Collection',
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
  },
  inProgress: {
    type: String,
    default: 'No',
    emun: ['Yes', 'No'],
  },
  color: {
    type: String,
    default: 'white',
    emum: ['Black', 'Brown', 'Silver', 'White', 'Blue', 'Gray'],
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive'],
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('Task', taskSchema);
