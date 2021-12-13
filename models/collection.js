const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

collectionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [{
      type: ObjectId,
      ref: 'Task'
    }],
    createdBy: {
      type: ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('collection', collectionSchema);