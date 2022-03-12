/* eslint-disable max-len */
const User = require('../../infra/repositories/user/schema/user');
const Collection = require('../../infra/repositories/collection/schemas/collection');
const Category = require('../../infra/repositories/category/schemas/category');
const Task = require('../../infra/repositories/task/schemas/task');

exports.getUserInfo = async (req, res) => {
  const user = await User.findById(req.body.userId).exec();
  return res.json({user});
};

exports.getUserCollections = async (req, res) => {
  const user = await User.findById(req.body.userId).exec();
  const collections = await Collection
      .find({_id: {$in: user.collections}})
      .exec();
  return res.json({collections});
};

exports.getUserCategories = async (req, res) => {
  const user = await User.findById(req.body.userId).exec();
  const categories = await Category
      .find({_id: {$in: user.categories}})
      .exec();
  return res.json({categories});
};

exports.getUserTasks = async (req, res) => {
  const user = await User.findById(req.body.userId).exec();
  const tasks = await Task
      .find({createdBy: {$in: user._id}})
      .exec();
  return res.json({tasks});
};

