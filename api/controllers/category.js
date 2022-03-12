/* eslint-disable max-len */
const Category = require('../../infra/repositories/category/category-repository');
const slugify = require('slugify');


exports.create = async (req, res) => {
  const category = await Category.create(req.body);
  console.log(category);
  return res.json(category);
};

exports.deleteCategory = async (req, res) => {
  const userId = req.body.userId;
  try {
    const {id} = req.params;

    res.json( await Category.
        findByIdAndRemove(id, {createdBy: userId}).catch((err) => {
          console.log(err);
        }));
  } catch (err) {
    console.log(err);
    res.status(400).send('Delete category failed');
  }
};

exports.update = async (req, res) => {
  try {
    const {id} = req.params;
    const {name} = req.body;
    res.json( await Category.findByIdAndUpdate(id, {
      name, slug: slugify(name),
    }) );
  } catch (err) {
    console.log(err);
    res.status(400).send('Update category failed');
  }
};
