const Category = require('./schemas/category');
const slugify = require('slugify');
const User = require('../user/schema/user');

exports.create = async (data) => {
  try {
    const {name, description, priority} = data;
    const category = await new Category({
      name: name,
      slug: slugify(name),
      description: description,
      priotity: priority,
      createdBy: data.userId,
    }).save();

    User.findByIdAndUpdate(data.userId, {
      $push: {categories: category._id},
    }).exec();

    console.log(category);
    return category;
  } catch (err) {
    console.log(err);
    return {error: 'Create category failed'};
  }
};

exports.deleteCategory = async (data, params) => {
  const userId = data.userId;
  try {
    const {id} = params;
    return await Category.findByIdAndRemove(id, {createdBy: userId});
  } catch (err) {
    console.log(err);
    return {error: 'Delete category failed'};
  }
};

exports.update = async (data, params) => {
  try {
    const {id} = params;
    const {name} = data;
    return await Category.findByIdAndUpdate(id, {
      name, slug: slugify(name),
    });
  } catch (err) {
    console.log(err);
    return {error: 'Update category failed'};
  }
};
