const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types;

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required',
    maxlength: [32, 'Name must be at most 20 characters long'],
    text: true,
  },
  slug: {
    type: String,
    unique: true,
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
  inProgress: {
    type: String,
    emun: ['Yes', 'No'],
  },
  color: {
    type: String,
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
