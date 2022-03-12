/* eslint-disable max-len */
const Collection = require('../../infra/repositories/collection/schemas/collection');
const User = require('../../infra/repositories/user/schema/user');
const slugify = require('slugify');

exports.create = async (req, res) => {
  const {name, description, userId} = req.body;
  try {
    req.body.slug = slugify(req.body.name);
    const newCollection = await new Collection({
      name: name,
      description: description,
      createdBy: userId,
      slug: slugify(name),
    }).save();

    User.findByIdAndUpdate(userId, {
      $push: {
        collections: newCollection._id,
      },
    },
    {new: true},
    ).exec();

    console.log(newCollection);
    return res.json(newCollection);
  } catch (e) {
    return res.status(400).json({
      err: e.message,
      code: e.code,
    });
  }
};


exports.listAll = async (req, res) => {
  const collections = await Collection.find({createdBy: req.body.userId})
      .limit(parseInt(req.params.count))
      .exec();
  res.json(collections);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Collection.findOneAndUpdate({
      slug: req.params.slug,
    },
    {
      status: 'Inactive',
    },
    {
      new: true,
    });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Collection deleted failed');
  }
};

exports.remove2 = async (req, res) => {
  try {
    const deleted = await Collection.findOneAndRemove({
      slug: req.param.slug,
      createdBy: req.body.userId,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Collection deleted failed');
  }
};

exports.read = async (req, res) => {
  const collection = await Collection.findOne({
    slug: req.param.slug,
    status: 'Active',
    createdBy: req.body.userId,
  }).exec();
  res.json(collection);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const updated = await Collection.findOneAndUpdate({
      slug: req.param.slug,
      createdBy: req.body.userId,
    },
    req.body,
    {new: true},
    ).exec();

    return res.json(updated);
  } catch (err) {
    return res.status(400).send('Collection update failed');
  }
};
