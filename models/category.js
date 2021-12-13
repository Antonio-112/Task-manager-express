const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [32, 'Name must be at most 32 characters long']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    },
    description: {
        type: String,
        trim: true,
        maxlength: [128, 'Description must be at most 128 characters long']
    },
    priority: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', categorySchema);